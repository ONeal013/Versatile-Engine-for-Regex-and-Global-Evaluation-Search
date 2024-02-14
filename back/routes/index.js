const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ msg: 'Welcome to The Versatile Engine for Regex and Global Evaluation Search !' });
});

module.exports = router;