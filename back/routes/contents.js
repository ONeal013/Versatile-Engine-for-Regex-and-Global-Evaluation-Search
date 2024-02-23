const express = require('express');
const router = express.Router();

const Content = require('../config/models/content');
const Book = require('../config/models/book');


router.get('', async (req, res) => {
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
  
  
  
  
  router.get('/:bookId', async (req, res) => {
      try {
          const bookId = req.params.bookId;
          const content = await Content.findOne({ book: bookId })
              .populate({
                  path: 'book',
                  populate: {
                      path: 'authors'
                  }
              });
          if (content) { 
              res.json(content);
          } else {
              res.status(404).send({ message: 'No content found for this book' });
          }
      } catch (error) {
          res.status(500).send({ error: error.message });
      }
  });

module.exports = router;