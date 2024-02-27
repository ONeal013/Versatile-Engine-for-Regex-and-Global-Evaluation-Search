const express = require('express');
const router = express.Router();
const Author = require('../config/models/author');
const stopWords = require('../stop_words_english.json') + Array.from({ length: 100 }, (_, i) => i)


router.get('/', async (req, res) => {
    try {
        const authors = await Author.find().populate();
        res.json(authors);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});



router.get('/author-search', async (req, res) => {
    let query = req.query.q;
    if (!query) {
        return res.status(400).send({ error: 'Query parameter is missing' });
    }

    const startTime = new Date();

    try {
        // Préparation de la regex pour une correspondance flexible
        const regexParts = query.split(/\s+|,/).filter(part => !stopWords.includes(part.toLowerCase()));
        const regexPattern = regexParts.join('|');
        const regexQuery = new RegExp(regexPattern, 'i');

        const authors = await Author.find({ name: { $regex: regexQuery } });

        if (authors.length > 0) {
            return res.json({ data: authors });
        } else {
            return res.status(404).send({ message: 'No authors found matching the query.' });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Error during author search: ' + error.message });
    } finally {
        const endTime = new Date();
        console.log(`Search executed in ${(endTime - startTime) / 1000} seconds`);
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