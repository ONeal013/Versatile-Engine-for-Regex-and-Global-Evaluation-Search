const mongoose = require('mongoose');

const bookContentSchema = new mongoose.Schema({
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

module.exports = bookContentSchema;
