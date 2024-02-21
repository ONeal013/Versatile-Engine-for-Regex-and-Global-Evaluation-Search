const express = require('express');
const router = express.Router();
const Content = require('../config/models/content');

// Endpoint pour récupérer tous les contenus
router.get('/contents', async (req, res) => {
    try {
        const contents = await Content.find().populate('book');
        res.json(contents);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});


module.exports = router;