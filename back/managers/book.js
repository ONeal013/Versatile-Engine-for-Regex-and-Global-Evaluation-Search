const axios = require('axios');
const Book = require('../config/models/book');

async function fetchAndStoreBooks() {
    try {
      // Récupérer les 10 premiers livres de Guttendex
      const response = await axios.get('https://gutendex.com/books?limit=10');
      const books = response.data.results;
  
        // console.log('Récupération des livres terminée.', books);

      // Parcourir les livres et les stocker dans la base de données MongoDB
      for (const book of books) {
        const newBook = new Book(book);
        await newBook.save();
        console.log(`Livre "${newBook.title}" ajouté à la base de données.`);
      }
      console.log('Opération terminée.');
    } catch (error) {
      console.error('Erreur lors de la récupération et du stockage des livres:', error);
    }
  }

  
module.exports = { fetchAndStoreBooks };