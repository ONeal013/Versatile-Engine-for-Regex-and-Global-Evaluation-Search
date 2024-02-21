const express = require('express');
const router = express.Router();
const Author = require('../config/models/author');
const Content = require('../config/models/content');
const Book = require('../config/models/book');


router.get('/', (req, res) => {
  res.send({ msg: 'Welcome to The Versatile Engine for Regex and Global Evaluation Search !' });
});

module.exports = router;



router.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find().populate();
        res.json(authors);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});
module.exports = router;




// Endpoint pour récupérer tous les contenus
router.get('/contents', async (req, res) => {
  try {
      const contents = await Content.find()
          .populate({
              path: 'book', 
              populate: { 
                  path: 'authors'
              }
          });
      res.json(contents);
  } catch (error) {
      res.status(500).send({error: error.message});
  }
});



module.exports = router;
