const mongoose = require('mongoose');
const reverseIndexSchema = require('../schemas/reverse_index');

const ReverseIndex = mongoose.model('ReverseIndex', reverseIndexSchema);

module.exports = ReverseIndex;