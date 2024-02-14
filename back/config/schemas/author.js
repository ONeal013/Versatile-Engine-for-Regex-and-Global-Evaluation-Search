const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    id: Number,
    name: String,
    birth_year: Number,
    death_year: Number
});

module.exports = authorSchema;