const express = require('express');
const router = express.Router();
const Author = require('../config/models/author');

router.get('/', async (req, res) => {
    try {
        const authors = await Author.find().populate();
        res.json(authors);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

// Endpoint pour récupérer les informations d'un auteur spécifique par son ID
router.get('/:id', async (req, res) => {
    try {
        const authorId = req.params.id;
        const author = await Author.findById(authorId);
        if (author) {
            res.json(author);
        } else {
            res.status(404).send({ message: 'Author not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;