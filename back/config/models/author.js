const mongoose = require('mongoose');

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;