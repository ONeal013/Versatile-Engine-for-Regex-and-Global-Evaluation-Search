const express = require('express');
const router = express.Router();
const Book = require('../config/models/book');
const ReverseIndex = require('../config/models/reverse_index');
const tokenize = require('../managers/indexor');
const levenshtein = require('js-levenshtein');
const { reverseIndex, fetchAndStoreBooks } = require('../managers/book');
const { getPageRankScores } = require('../managers/pageRank');
const Content = require('../config/models/content');
const Index = require('../config/models');





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



/*     // Nouvelle étape: Recherche par titre exact
    try {
        const exactMatchBook = await Book.findOne({ title: query }); // Assurez-vous que 'title' est le bon champ
        if (exactMatchBook) {
            // Si un match exact est trouvé, renvoyez-le immédiatement
            return res.json({ data: [exactMatchBook] }); // Ajustez selon le format de réponse souhaité
        }
    } catch (error) {
        return res.status(500).send({ error: 'Error during exact match search: ' + error.message });
    }
 */



router.get('/search', async (req, res) => {
    const startTime = new Date();

    let query = req.query.q;
    const page = parseInt(req.query.page) || 1; // Défaut à la page 1 si non spécifié
    const limit = parseInt(req.query.limit) || 10; // Défaut à 10 éléments par page
    const skip = (page - 1) * limit;

    if (!query) {
        return res.status(400).send({ error: 'Query parameter is missing' });
    }

    const queries = tokenize(query.toLowerCase());
    let result = {
        info: { time: 0, length: 0, page, limit }, // Enregistrez les infos de pagination
        typos: {},
        tokens: {},
        data: [],
    };

    const data = new Set();
    const weights = {};

    const exactMatchBook = await Book.aggregate([
        {
            $search: {
                text: {
                    query: query,
                    path: "title",
                    fuzzy: {},
                }
            },
        },
        { $limit: 1 }
    ]);
    console.log(exactMatchBook.length, 'Exact match found');
    exactMatchBook.forEach((book) => {
        data.add(book._id.toString());
        weights[book._id.toString()] = 10000;
    });

    try {
        for (const singleQuery of Object.keys(queries)) {
            console.log(singleQuery);

            const tokenWeight = 1 / (Object.keys(queries).indexOf(singleQuery) + 1);

            const reverseIndexEntries = await ReverseIndex.aggregate([
                {
                    $search: {
                        text: {
                            query: singleQuery,
                            path: "token",
                            fuzzy: {
                                maxEdits: 2,
                                prefixLength: 1
                            }
                        }
                    },
                },
                { $limit: 1 }
            ]);

            for (const entry of reverseIndexEntries) {
                const books = entry.books;
                const bookIds = Object.keys(books);

                // Gestion des typos
                if (singleQuery !== entry.token) {
                    result.typos[singleQuery] = entry.token; // Enregistrez la correction
                }

                Object.entries(books).forEach(([bookId, occurrence]) => {
                    if (!weights[bookId]) {
                        weights[bookId] = 0;
                    }
                    weights[bookId] += occurrence * tokenWeight;
                });

                result.tokens[entry.token] = entry.books;
                // console.log(data);
                bookIds.forEach(id => data.add(id));
            }
        }

        const books = await Book.find({ '_id': { $in: Array.from(data) } })
            // .sort({ page_rank_score: -1 })
            .populate('authors')
            .populate('translators')
            .lean()
            .skip(skip)
            .limit(limit) // Appliquez pagination
            .exec();

        books.sort((a, b) => {
            const weightA = weights[a._id.toString()] || 0;
            const weightB = weights[b._id.toString()] || 0;
            return (b.page_rank_score * weightB) - (a.page_rank_score * weightA);
        });

        result.data = books;
        result.info.length = data.size;

        const endTime = new Date();
        result.info.time = (endTime - startTime) / 1000;

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
    const startTime = new Date();

    const { regex } = req.query;

    const page = parseInt(req.query.page) || 1; // Défaut à la page 1 si non spécifié
    const limit = parseInt(req.query.limit) || 10; // Défaut à 10 éléments par page
    const skip = (page - 1) * limit;

    if (!regex) {
        return res.status(400).send({ error: 'RegEx query parameter is missing' });
    }

    let result = {
        info: { time: 0, length: 0, page, limit }, // Enregistrez les infos de pagination
        typos: {},
        tokens: {},
        data: [],
    };

    try {
        const searchPattern = new RegExp(regex, 'i');
        const contents = await Content.find({ content: { $regex: searchPattern } });
        const data = await Book.find({ '_id': { $in: contents.map(item => item.book) } })
            .sort({ page_rank_score: -1 })
            .lean()
            .skip(skip)
            .limit(limit)
            .populate('authors')
            .exec();
        if (contents.length > 0) {
            result.data = data;
            result.info.length = contents.length;
            const endTime = new Date();
            result.info.time = (endTime - startTime) / 1000;

            res.json(result);
        } else {
            res.send('No books found matching the regex.');
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




router.get('/delete', async (req, res) => {
    const ids = req.query.ids;
    if (!ids) {
        return res.status(400).send({ error: 'IDs parameter is missing' });
    }
    const idsArray = ids.split(',');
    await Book.deleteMany({ _id: { $in: idsArray } });
    await Content.deleteMany({ book: { $in: idsArray } });
    await Index.deleteMany({ book: { $in: idsArray } });

    return res.send('Books deleted');
});


router.get('/:id', (req, res) => {
    res.send('One book');
});

module.exports = router;


