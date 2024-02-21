const express = require('express');
const router = express.Router();
const Author = require('../config/models/author');
const Content = require('../config/models/content');
const Book = require('../config/models/book');


router.get('/', (req, res) => {
  res.send({ msg: 'Welcome to The Versatile Engine for Regex and Global Evaluation Search !' });
});

module.exports = router;



router.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find().populate();
        res.json(authors);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

// Endpoint pour récupérer les auteurs d'un livre spécifique par l'ID du livre
router.get('/authors/:bookId', async (req, res) => {
  try {
      const bookId = req.params.bookId;
      const book = await Book.findById(bookId).populate('authors');
      if (book) {
          res.json(book.authors);
      } else {
          res.status(404).send({ message: 'Book not found' });
      }
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

module.exports = router;




router.get('/contents', async (req, res) => {
  try {
      const contents = await Content.find()
          .populate({
              path: 'book', 
              populate: { 
                  path: 'authors'
              }
          });
      res.json(contents);
  } catch (error) {
      res.status(500).send({error: error.message});
  }
});

router.get('/contents/:bookId', async (req, res) => {
  try {
      const bookId = req.params.bookId;
      const contents = await Content.find({ book: bookId })
          .populate({
              path: 'book',
              populate: {
                  path: 'authors' 
              }
          });
      if (contents.length) {
          res.json(contents);
      } else {
          res.status(404).send({ message: 'No content found for this book' });
      }
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});







module.exports = router;
