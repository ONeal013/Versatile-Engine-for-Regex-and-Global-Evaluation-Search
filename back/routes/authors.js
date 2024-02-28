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

    const startTime = new Date();

    try {
        // Récupérez les noms d'auteurs pour le FuzzySet
        const authorNames = await getAllAuthorNames(); // Assurez-vous que cette fonction est correctement implémentée
        let a = FuzzySet(authorNames);

        // Auto-correction de la requête
        let correctedQuery = a.get(query);
        if (correctedQuery) {
            query = correctedQuery[0][1]; // Utilisez la correction pour la recherche
        }

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


router.get('/books-by-author', async (req, res) => {
    let query = req.query.name;
    if (!query) {
        return res.status(400).send({ error: 'Author name is missing' });
    }

    const authorNames = await getAllAuthorNames(); // Récupère les noms d'auteurs
    let a = FuzzySet(authorNames); // Crée FuzzySet avec les noms d'auteurs

    let correctedQuery = a.get(query);
    if (correctedQuery) {
        query = correctedQuery[0][1];
    }


    const startTime = new Date();

    try {
        console.log('Requête initiale:', query); // Affiche la requête initiale

        // Tokenisez la requête en séparant les mots et convertissez en minuscules
        let tokens = query.split(/\s+|,/).map(token => token.toLowerCase());

        console.log('Tokens initiaux:', tokens); // Affiche les tokens initiaux

        // Filtrez les tokens en éliminant les stop words
        tokens = tokens.filter(token => !stopWords.includes(token));

        console.log('Tokens après filtrage des stop words:', tokens); // Affiche les tokens après filtrage

        // Préparation de la regex pour une correspondance flexible avec les noms d'auteurs
        const regexPattern = tokens.join('|');
        const regexQuery = new RegExp(regexPattern, 'i');

        // Trouvez les auteurs correspondants à la requête
        const matchingAuthors = await Author.find({ name: { $regex: regexQuery } });

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