const Book = require('../config/models/book');
const Index = require('../config/models/index');
const JaccardScore = require('../config/models/jaccardScore');


// Fonction pour calculer le score de Jaccard
async function calculateJaccardScore(bookId) {
    const targetBook = await Book.findById(bookId);
    const allBooks = await Book.find({ _id: { $ne: bookId } });
    const targetIndex = await Index.findOne({ book: bookId });

    if (!targetIndex) return [];

    let suggestions = [];

    for (let book of allBooks) {
        const bookIndex = await Index.findOne({ book: book._id });
        if (!bookIndex) continue;
        const intersection = new Set([...targetIndex.tokens.keys()].filter(x => bookIndex.tokens.has(x)));
        const union = new Set([...targetIndex.tokens.keys(), ...bookIndex.tokens.keys()]);

        const jaccardScore = intersection.size / union.size;
        suggestions.push({ bookId: book._id, score: jaccardScore });
    }

    // Trier les suggestions par score de Jaccard décroissant
    suggestions.sort((a, b) => b.score - a.score);


    const jaccardScoreDocument = new JaccardScore({
        docId: bookId,
        similarDocs: suggestions.map(s => ({ docId: s.bookId, score: s.score }))
    });


    await jaccardScoreDocument.save();



    return suggestions;
}

module.exports = calculateJaccardScore;