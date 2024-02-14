const mongoose = require('mongoose');
const indexSchema = require('../schemas/index');

const Index = mongoose.model('Index', indexSchema);

module.exports = Index;