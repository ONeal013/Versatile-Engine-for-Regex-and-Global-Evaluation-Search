const mongoose = require('mongoose');

const reverseIndexSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true},
    // list of books and their frequency
    books: {type: Map, of: Number, required: true}
});

module.exports = reverseIndexSchema; 