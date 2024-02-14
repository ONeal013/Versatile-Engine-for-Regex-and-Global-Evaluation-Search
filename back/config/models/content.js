const mongoose = require('mongoose');
const bookContentSchema = require('../schemas/content');

const BookContent = mongoose.model('BookContent', bookContentSchema);

module.exports = BookContent;
