const express = require('express');
const router = express.Router();
const Book = require('../config/models/book');
const ReverseIndex = require('../config/models/reverse_index');
const JaccardScore = require('../config/models/jaccardScore');
const Content = require('../config/models/content');

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
        console.log(typeof(reversedIndexes)); // Doit afficher 'object' si c'est un objet
        await Promise.all(Object.entries(reversedIndexes).map(async ([token, books]) => {
            console.log(token, ' : ', books);
            const reverseIndex = new ReverseIndex({ token, books });
            await reverseIndex.save();
        }));
        res.json(reversedIndexes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get('/search', async (req, res) => {
    let query = req.query.q; 
    if (!query) {
        return res.status(400).send({ error: 'Query parameter is missing' });
    }

    const queries = query.toLowerCase().split(" ");
    let booksMap = new Map();

    try {
        for (const singleQuery of queries) {
            const reverseIndexEntry = await ReverseIndex.findOne({ token: singleQuery });
            if (reverseIndexEntry) {
                // Fusionner les résultats pour chaque mot-clé
                for (let [bookId, occurrences] of reverseIndexEntry.books) {
                    if (!booksMap.has(bookId)) {
                        booksMap.set(bookId, occurrences);
                    } else {
                        booksMap.set(bookId, booksMap.get(bookId) + occurrences);
                    }
                }
            }
        }

        if (booksMap.size === 0) {
            return res.status(404).send({ message: 'No results found' });
        }

        const bookIds = Array.from(booksMap.keys());
        const booksData = await Book.find({ '_id': { $in: bookIds } }).exec();
        const books = Object.fromEntries(booksMap);

        res.json({ token: query, books, data: booksData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




router.get('/suggestions', async (req, res) => {
    const docId = req.query.docId; // L'ID du document pour lequel obtenir des suggestions
    try {
        const suggestions = await JaccardScore.findOne({ docId }).exec();
        const sortedSimilarDocs = suggestions.similarDocs.sort((a, b) => b.score - a.score);
        const topSimilarDocs = sortedSimilarDocs.slice(1, 6);
        
        if (!suggestions) {
            return res.status(404).send({ message: 'No suggestions found for this document.' });
        }
        res.json(topSimilarDocs);
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



router.get('/advanced-search', async (req, res) => {
    const { regex } = req.query;

    if (!regex) {
        return res.status(400).send({ error: 'RegEx query parameter is missing' });
    }

    try {
        const searchPattern = new RegExp(regex, 'i'); 
        const results = await Content.find({ content: { $regex: searchPattern } }).exec();
        const data = await Promise.all(results.map((item) => {
            return Book.findById(item.book).populate({
                path: 'authors'
            })
        }))
        if (results.length > 0) {
            res.json(data);
        } else {
            res.send('No books found matching the regex.');
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get('/:id', (req, res) => {
    res.send('One book');
});

module.exports = router;


