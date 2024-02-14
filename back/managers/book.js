const axios = require('axios');
const Book = require('../config/models/book');
const Author = require('../config/models/author');

async function fetchAndStoreBooks() {
    try {
      // Récupérer les 10 premiers livres de Guttendex
      const response = await axios.get('https://gutendex.com/books?limit=10');
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

        // Créer un nouveau livre avec les ID des auteurs
        const newBook = new Book({
          ...book,
          authors: authorIds // Assurez-vous que le schéma de Book peut gérer ce champ
        });
        await newBook.save();
        console.log(`Livre "${newBook.title}" ajouté à la base de données.`);
      }
      console.log('Opération terminée.');
    } catch (error) {
      console.error('Erreur lors de la récupération et du stockage des livres:', error);
    }
  }

  
module.exports = { fetchAndStoreBooks };