const express = require('express');
const router = express.Router();
const { fetchAndStoreBooks, reverseIndex } = require('../managers/book');
const Book = require('../config/models/book');
const ReverseIndex = require('../config/models/reverse_index');

router.get('/fetch', async (req, res) => {
    try {
        await fetchAndStoreBooks();
        const books = await Book.find().exec(); // Utilisez await ici
        res.json(books); // Utilisez res.json pour envoyer les résultats
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/reverse', async (req, res) => {
    try {
        const reversedIndexes = await reverseIndex();
        await reversedIndexes.forEach(async (books, token) => {
            console.log(token,' : ',books)
            const reverseIndex = new ReverseIndex({ token, books });
            await reverseIndex.save();
        });
        res.json(reversedIndexes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}); 



router.get('/', async (req, res) => {
    try {
        const books = await Book.find().exec(); // Utilisez await ici
        res.json(books); // Utilisez res.json pour envoyer les résultats
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



router.get('/:id', (req, res) => {
    res.send('One book');
});

module.exports = router;
