const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  content: {
    type: String,
    required: true
  },

});

module.exports = contentSchema;
