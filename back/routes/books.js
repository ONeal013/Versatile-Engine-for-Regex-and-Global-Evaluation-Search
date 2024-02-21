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
    const query = req.query.q; // Assume 'q' est le paramètre de requête contenant le terme de recherche
    if (!query) {
        return res.status(400).send({ error: 'Query parameter is missing' });
    }

    try {
        const reverseIndexEntry = await ReverseIndex.findOne({ token: query });
        if (!reverseIndexEntry) {
            return res.status(404).send({ message: 'No results found' });
        }

        // Convertir la Map ou l'objet des identifiants de livres en un tableau d'identifiants
        const bookIds = Array.from(reverseIndexEntry.books.keys());

        // Rechercher tous les livres dont les identifiants correspondent à ceux trouvés
        const booksData = await Book.find({ '_id': { $in: bookIds } }).exec();

        // Optionnellement, convertir la Map en objet pour la réponse JSON si nécessaire pour d'autres utilisations
        const books = Object.fromEntries(reverseIndexEntry.books);

        // Envoyer les données récupérées
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
