const express = require('express');
const router = express.Router();
const { fetchAndStoreBooks } = require('../managers/book');
const Book = require('../config/models/book');

// Supposons que fetchAndStoreBooks soit asynchrone et retourne une promesse
router.get('/fetch', async (req, res) => {
    try {
        await fetchAndStoreBooks();
        const books = await Book.find().exec(); // Utilisez await ici
        res.json(books); // Utilisez res.json pour envoyer les résultats
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
