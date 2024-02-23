const express = require('express');
const router = express.Router();
const calculateJaccardScore = require('../managers/suggestion');


router.get('/', async (req, res) => {
    try {
        const suggestions = await calculateJaccardScore();
        res.json(suggestions);
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