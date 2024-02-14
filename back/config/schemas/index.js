const mongoose = require('mongoose');

const indexSchema = new mongoose.Schema({
    book: {
        type: String,
        ref: 'Book',
        required: true
    },
    // tokens is a map of token to frequency of that token in the book
    tokens: {
        type: Map,
        of: Number,
        required: true
    }
});

module.exports = indexSchema;