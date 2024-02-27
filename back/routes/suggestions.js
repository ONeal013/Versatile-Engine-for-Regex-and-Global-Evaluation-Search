const express = require('express');
const router = express.Router();
const calculateJaccardScore = require('../managers/suggestion');
const Book = require('../config/models/book');
const getPageRankScores = require('../managers/pageRank'); 
const JaccardScore = require('../config/models/jaccardScore');
const { ObjectId } = require('mongodb');


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


router.get('/ranked', async (req, res) => {
    try {
        const pageRankScores = await getPageRankScores();
        // Logique pour appliquer les scores de PageRank à vos suggestions
        // Cette partie dépend de comment vous souhaitez utiliser les scores de PageRank pour ajuster vos suggestions
        res.json(pageRankScores);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



router.get('/:bookId', async (req, res) => {
    try {
        const bookId = req.params.bookId;
    const suggestions = await JaccardScore.findOne({docId: new ObjectId(bookId)})
    .populate('docId')
    .populate({
        path: 'similarDocs', 
        populate: { 
            path: 'docId'
        }
    })
    .exec();
        res.json(suggestions);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



module.exports = router;