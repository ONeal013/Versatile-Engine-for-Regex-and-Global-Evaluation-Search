const express = require('express');
const router = express.Router();
const Author = require('../config/models/author');
const stopWords = require('../stop_words_english.json') + Array.from({ length: 100 }, (_, i) => i)
const Book = require('../config/models/book');
const FuzzySet = require('fuzzyset.js');
const { getAllAuthorNames } = require('../config/helpers/dataHelper');





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

    try {
        const authors = await Author.aggregate([
            {
                $search: {
                    index: 'default', // Assurez-vous que ceci correspond au nom de votre indice Atlas Search
                    text: {
                        query: query,
                        path: 'name', // Le champ à rechercher
                        fuzzy: {}
                    }
                }
            },
            {
                $limit: 1 // Limitez les résultats si nécessaire
            }
        ]);

        if (authors.length > 0) {
            return res.json({ data: authors });
        } else {
            return res.status(404).send({ message: 'No authors found matching the query.' });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Error during author search: ' + error.message });
    }
});


router.get('/books-by-author', async (req, res) => {
    let query = req.query.name;
    if (!query) {
        return res.status(400).send({ error: 'Author name is missing' });
    }

    try {
        // Recherche d'auteurs avec Atlas Search
        const matchingAuthors = await Author.aggregate([
            {
                $search: {
                    index: 'default', // Assurez-vous que ceci correspond au nom de votre indice Atlas Search
                    text: {
                        query: query,
                        path: 'name', // Le champ à rechercher
                        fuzzy: {}
                    }
                }
            },
            {
                $limit: 30 // Limitez les résultats si nécessaire
            }
        ]);

        if (matchingAuthors.length > 0) {
            // Trouvez tous les livres écrits par les auteurs trouvés
            const authorIds = matchingAuthors.map(author => author._id);
            const books = await Book.find({ authors: { $in: authorIds } }).populate('authors');

            res.json(books);
        } else {
            res.status(404).send({ message: 'No books found for the given author name.' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Error during books search by author: ' + error.message });
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