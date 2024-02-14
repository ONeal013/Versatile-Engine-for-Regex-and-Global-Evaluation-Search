const express = require('express');
const router = express.Router();
const {fetchAndStoreBooks} = require('../managers/book');
const Book = require('../config/models/book');

router.get('/fetch', (req, res) => {
    fetchAndStoreBooks();
    const books = Book.find();
    res.send(books);
});

router.get('/', (req, res) => {
    const books = Book.find();
    res.send(books);
});

router.get('/:id', (req, res) => {
    res.send('One book');
}); 
 
module.exports = router;