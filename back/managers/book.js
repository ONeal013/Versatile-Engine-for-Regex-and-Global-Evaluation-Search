const axios = require('axios');
const Book = require('../config/models/book');
const Author = require('../config/models/author');
const BookContent = require('../config/models/content')

async function fetchAndStoreBooks() {
    try {
      // Récupérer les 10 premiers livres de Guttendex
      const response = await axios.get('https://gutendex.com/books?ids=84,85,86,87,88,89,90,91,92,93');
      const books = response.data.results;
  
        // console.log('Récupération des livres terminée.', books);

      // Parcourir les livres et les stocker dans la base de données MongoDB
      for (const book of books) {
        const authorIds = [];
        for (const authorData of book.authors) {
          let author = await Author.findOne({ name: authorData.name }); // Trouver l'auteur par son nom
          if (!author) {
            // Si l'auteur n'existe pas, le créer
            author = new Author(authorData);
            await author.save();
          }
          authorIds.push(author._id); // Ajouter l'ID de l'auteur au tableau
        }

        const translatorIds = [];
        for (const translatorData of book.authors) {
          let translator = await Author.findOne({ name: translatorData.name }); // Trouver le traducteur par son nom
          if (!translator) {
            // Si le traducteur n'existe pas, le créer
            translator = new Author(translatorData);
            await translator.save();
          }
          translatorIds.push(translator._id); // Ajouter l'ID du traducteur au tableau
        }

        // Créer un nouveau livre avec les ID des auteurs
        const newBook = new Book({
          ...book,
          authors: authorIds,
          translators: translatorIds,
        });
        await newBook.save();
        console.log(`Livre "${newBook.title}" ajouté à la base de données.`);

        const response = await axios.get(newBook.formats['text/plain; charset=us-ascii'])
        const content = response.data;
        const newBookContent = new BookContent({
            book: newBook._id, // ID du livre nouvellement créé
            content: content,
          });
          await newBookContent.save();

          
      }
      console.log('Opération terminée.');
    } catch (error) {
      console.error('Erreur lors de la récupération et du stockage des livres:', error);
    }
  }

  
module.exports = { fetchAndStoreBooks };
