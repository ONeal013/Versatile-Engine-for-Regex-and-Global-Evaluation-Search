const mongoose = require('mongoose');
const authorSchema = require('../schemas/author');

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;