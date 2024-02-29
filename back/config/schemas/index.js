// Dans back/config/schemas/index.js
const mongoose = require('mongoose');

const indexSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    tokens: { type: Object }, // Utiliser un objet pour stocker les tokens
});

module.exports = indexSchema;
