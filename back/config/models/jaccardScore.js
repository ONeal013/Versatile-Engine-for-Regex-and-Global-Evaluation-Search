const mongoose = require('mongoose');

const jaccardScoreSchema = new mongoose.Schema({
  docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  similarDocs: [{
    docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    score: Number
  }]
});

module.exports = mongoose.model('JaccardScore', jaccardScoreSchema, 'jaccardscore');
