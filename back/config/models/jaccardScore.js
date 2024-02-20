// Dans config/models/jaccardScore.js (nouveau fichier)

const mongoose = require('mongoose');

const jaccardScoreSchema = new mongoose.Schema({
    docId: mongoose.Schema.Types.ObjectId,
    similarDocs: [{
        docId: mongoose.Schema.Types.ObjectId,
        score: Number,
    }],
});

const JaccardScore = mongoose.model('JaccardScore', jaccardScoreSchema);

module.exports = JaccardScore;
