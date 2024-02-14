const mongoose = require('mongoose');

const indexSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    tokens: { type: Map, of: Number }
});


module.exports = indexSchema;