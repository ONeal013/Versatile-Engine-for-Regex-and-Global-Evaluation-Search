const express = require('express');
const router = express.Router();
const Book = require('../config/models/book');
const ReverseIndex = require('../config/models/reverse_index');
const tokenize = require('../managers/indexor');
const levenshtein = require('js-levenshtein');
const { reverseIndex, fetchAndStoreBooks } = require('../managers/book');
const { getPageRankScores } = require('../managers/pageRank');



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
        // console.log(typeof (reversedIndexes)); // Doit afficher 'object' si c'est un objet
        await Promise.all(Object.entries(reversedIndexes).map(async ([token, books]) => {
            // console.log(token, ' : ', books);
            const reverseIndex = new ReverseIndex({ token, books });
            await reverseIndex.save();
        }));
        res.json(reversedIndexes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const correctQueries = async (queries) => {
    const corrections = [];
    const _indexes = await ReverseIndex.find().exec();
    for (const query in queries) {
        let correction = query;
        let score = -1;
        for (const index in _indexes) {
            const newScore = levenshtein(index.token, query);
            if (score > newScore) {
                correction = index.token;
                score = newScore;
            }
            corrections.push(correction);
        }
    }
    return corrections;
}


router.get('/search', async (req, res) => {
    let query = req.query.q;
    // Paramètres de pagination avec des valeurs par défaut
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;

    if (!query) {
        return res.status(400).send({ error: 'Query parameter is missing' });
    }

    const queries = tokenize(query.toLowerCase());
    let result = {
        typos: {},
        tokens: {},
        data: [],
    };

    const data = new Set();
    const weights = {};

    try {
        for (const singleQuery of Object.keys(queries)) {
            console.log(singleQuery);
             
            const tokenWeight = 1 / (Object.keys(queries).indexOf(singleQuery) + 1);
            
            const reverseIndexEntries = await ReverseIndex.aggregate([
                {
                    $search: {
                        text: {
                            query: singleQuery,
                            path: "token", // Assurez-vous que cela correspond à votre modèle de données
                            fuzzy: {}
                        }
                    },
                },
                { $limit: 1 }
            ]);

            for (const entry of reverseIndexEntries) {
                const books = entry.books
                const bookIds = Object.keys(books)

                Object.entries(books).forEach(([bookId, occurrence]) => {
                    if (!weights[bookId]) {
                        weights[bookId] = 0;
                    }
                    weights[bookId] += occurrence * tokenWeight;
                });

                result.tokens[entry.token] = entry.books
                console.log(data);
                bookIds.forEach(id => data.add(id));
            }
        }

        // Récupérez les livres par _id et triez-les par page_rank_score en ordre décroissant
        // Appliquez la pagination ici
        const books = Book.find({ '_id': { $in: Array.from(data) } })
                               .sort({ page_rank_score: -1 }) // Tri par page_rank_score
                               .populate('authors')
                               .populate('translators')
                               .lean();

        // Calcul de l'offset basé sur la page et la limite
        const offset = (page - 1) * limit;
        const paginatedBooks = await books.skip(offset).limit(limit);

        // Triez les livres paginés en fonction des poids calculés
        paginatedBooks.sort((a, b) => {
            const weightA = weights[a._id.toString()] || 0;
            const weightB = weights[b._id.toString()] || 0;
            return (b.page_rank_score * weightB) - (a.page_rank_score * weightA);
        });

        result.data = paginatedBooks;
        res.json(result);
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


