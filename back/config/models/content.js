const mongoose = require('mongoose');
const contentSchema = require('../schemas/content');

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
