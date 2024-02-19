const axios = require('axios');
const Book = require('../config/models/book');
const Author = require('../config/models/author');
const BookContent = require('../config/models/content');
const Index = require('../config/models/index');
const tokenize = require('./indexor');

function cleanKeys(tokens) {
  const cleanedTokens = {};
  Object.keys(tokens).forEach(key => {
      if (key !== 'prototype' && !key.startsWith('__')) { // Vérifier contre les noms réservés
          cleanedTokens[key] = tokens[key];
      }
  });
  return cleanedTokens;
}


async function fetchAndStoreBooks() {
    try {
        // Récupérer les 10 premiers livres de Gutenberg
        const response = await axios.get('https://gutendex.com/books?ids=84,85,86,87,88,89,90,91,92,93');
        const books = response.data.results;

        for (const book of books) {
            // Gérer les auteurs
            const authorIds = await Promise.all(book.authors.map(async (authorData) => {
                let author = await Author.findOne({ name: authorData.name });
                if (!author) {
                    author = new Author(authorData);
                    await author.save();
                }
                return author._id;
            }));

            // Créer et sauvegarder le nouveau livre
            const newBook = new Book({
                ...book,
                authors: authorIds,
                // Supposons que les traducteurs doivent être ajoutés, ajuster ici
            });
            await newBook.save();
            console.log(`Livre "${newBook.title}" ajouté à la base de données.`);

            // Vérifier si le format de contenu textuel est disponible pour le livre
            if (newBook.formats['text/plain; charset=us-ascii']) {
                const contentResponse = await axios.get(newBook.formats['text/plain; charset=us-ascii']);
                const content = contentResponse.data;

                // Sauvegarder le contenu du livre
                const newBookContent = new BookContent({
                    book: newBook._id,
                    content: content,
                });
                await newBookContent.save();

                // Tokeniser et indexer le contenu du livre
                const tokens = tokenize(content); // Supposons que c'est votre objet original
                const cleanedTokens = cleanKeys(tokens);
                const newIndex = new Index({
                    book: newBook._id,
                    tokens: cleanedTokens,
                });
                await newIndex.save();
            } else {
                console.log(`Format de contenu texte non trouvé pour le livre "${newBook.title}".`);
            }
        }
        console.log('Opération terminée.');
    } catch (error) {
        console.error('Erreur lors de la récupération et du stockage des livres:', error);
    }
}


async function reverseIndex() {
    const indexes = await Index.find();
    const reverseIndex = [];
    indexes.forEach(index => {
        index.tokens.forEach((occurence, token) => {
            if (!reverseIndex[token]) {
                reverseIndex[token] = {};
            }
            reverseIndex[token][index.book] = occurence;
        });
    });
    return reverseIndex;
}


module.exports = { fetchAndStoreBooks, reverseIndex};

