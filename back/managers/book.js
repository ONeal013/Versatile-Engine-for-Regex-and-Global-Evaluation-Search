const axios = require('axios');
const Book = require('../config/models/book');
const Author = require('../config/models/author');
const BookContent = require('../config/models/content');
const Index = require('../config/models/index');
const tokenize = require('./indexor');
const fs = require('fs');
const path = require('path'); 


function cleanKeys(tokens) {
  const cleanedTokens = {};
  Object.keys(tokens).forEach(key => {
      if (key !== 'prototype' && !key.startsWith('__')) { // Vérifier contre les noms réservés
          cleanedTokens[key] = tokens[key];
      }
  });
  return cleanedTokens;
}


async function fetchAndStoreBooks(totalBooks = 1000) {
    try {
        const booksPerPage = 100; // Assurez-vous que ce nombre est correct selon l'API
        const totalPages = Math.ceil(totalBooks / booksPerPage); // Calculer le nombre total de pages nécessaires

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            const response = await axios.get(`https://gutendex.com/books/?page=${currentPage}`);
            const books = response.data.results;

            for (const book of books) {
                const authors = await Promise.all(book.authors.map(async (authorData) => {
                    let author = await Author.findOne({ name: authorData.name });
                    if (!author) {
                        author = new Author(authorData);
                        await author.save();
                    }
                    return author;
                }));

                const translators = await Promise.all(book.translators.map(async (translatorData) => {
                    let translator = await Author.findOne({ name: translatorData.name });
                    if (!translator) {
                        translator = new Author(translatorData);
                        await translator.save();
                    }
                    return translator;
                }));

                const newBook = new Book({
                    ...book,
                    authors,
                    translators,
                });
                await newBook.save();
                console.log(`Livre "${newBook.title}" ajouté à la base de données.`);

                const text = newBook.formats['text/plain; charset=us-ascii'] ?? newBook.formats['text/plain; charset=utf-8'];
                if (text) {
                    const tempFilePath = path.join(__dirname, '..', 'temp', `${newBook._id}.txt`);
                    fs.mkdirSync(path.dirname(tempFilePath), { recursive: true });

                    const writer = fs.createWriteStream(tempFilePath);

                    try {
                        const response = await axios({
                            method: 'get',
                            url: text,
                            responseType: 'stream'
                        });

                        response.data.pipe(writer);

                        await new Promise((resolve, reject) => {
                            writer.on('finish', resolve);
                            writer.on('error', reject);
                        });

                        const content = fs.readFileSync(tempFilePath, 'utf-8');

                        if (Buffer.byteLength(content, 'utf-8') > (16 * 1024 * 1024)) {
                            console.log(`Le livre "${newBook.title}" est trop volumineux et sera ignoré.`);
                            continue;
                        }

                        const newBookContent = new BookContent({
                            book: newBook._id,
                            content: content,
                        });
                        await newBookContent.save();

                        const tokens = tokenize(content);
                        const cleanedTokens = cleanKeys(tokens);

                        const newIndex = new Index({
                            book: newBook._id,
                            tokens: cleanedTokens,
                        });
                        await newIndex.save();
                    } catch (error) {
                        console.error(`Erreur lors du téléchargement du contenu pour le livre "${newBook.title}":`, error);
                    } finally {
                        fs.unlinkSync(tempFilePath);
                    }
                } else {
                    console.log(`Format de contenu texte non trouvé pour le livre "${newBook.title}".`);
                }
            }
        }
        console.log('Opération terminée avec succès pour 1000 livres.');
    } catch (error) {
        console.error('Erreur lors de la récupération et du stockage des livres:', error);
    }
}

async function reverseIndex() {
    const indexes = await Index.find();
    const reverseIndex = new Map();
    indexes.forEach(index => {
        index.tokens.forEach((occurence, token) => {
            if (!reverseIndex[token]) {
                reverseIndex[token] = {};
            }
            reverseIndex[token][index.book] = occurence;
            // console.log(token, ' : ', reverseIndex[token])
        });
    });
    return reverseIndex;
}

module.exports = { fetchAndStoreBooks, reverseIndex};


