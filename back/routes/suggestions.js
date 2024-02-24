const express = require('express');
const router = express.Router();
const calculateJaccardScore = require('../managers/suggestion');
const Book = require('../config/models/book');


router.get('/', async (req, res) => {
    try {
        const allBooks = await Book.find(); // Récupère tous les livres
        let allSuggestions = [];

        for (let book of allBooks) {
            const suggestions = await calculateJaccardScore(book._id.toString());
            allSuggestions.push({bookId: book._id, suggestions});
            // Ici, vous pouvez également mettre à jour MongoDB avec les suggestions pour chaque livre
        }

        res.json(allSuggestions); // Renvoie les suggestions pour tous les livres
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get('/:bookId', async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const suggestions = await calculateJaccardScore(bookId);
        res.json(suggestions);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;