// helpers/dataHelpers.js
const JaccardScore = require('../models/jaccardScore'); // Assurez-vous que ce chemin correspond à votre structure de projet
const Index = require('../models/index'); // Assurez-vous que ce chemin correspond à votre structure de projet





async function getJaccardScores(documentIds) {
    const scores = [];

    // Récupérer les scores de similarité Jaccard pour chaque document
    for (let docId of documentIds) {
        const docScores = await JaccardScore.findOne({ docId: docId });
        if (docScores && docScores.similarDocs.length > 0) {
            docScores.similarDocs.forEach(similarDoc => {
                if (documentIds.includes(similarDoc.docId.toString())) {
                    scores.push({
                        doc1: docId.toString(),
                        doc2: similarDoc.docId.toString(),
                        similarity: similarDoc.score
                    });
                }
            });
        }
    }

    // Ajoutez le console.log ici pour vérifier les scores récupérés
    console.log("Jaccard Scores récupérés :", scores);

    return scores;
}



/**
 * Récupère les occurrences de tokens pour un livre spécifique.
 * @param {String} bookId - L'identifiant du livre pour lequel récupérer les occurrences de tokens.
 * @returns {Promise<Object>} Un objet contenant les tokens et leurs occurrences pour le livre donné.
 */
async function getTokenOccurrences(bookId) {
    try {
        const indexEntry = await Index.findOne({ book: bookId });
        if (indexEntry && indexEntry.tokens) {
            console.log("Tokens récupérés pour le livre", bookId, ":", indexEntry.tokens);
            return indexEntry.tokens;
        } else {
            console.log("Aucun token trouvé pour le livre", bookId);
            return {}; // Retourne un objet vide si aucun token n'est trouvé
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des occurrences de tokens:", error);
        return {}; // Gestion des erreurs avec un objet vide pour éviter les interruptions
    }
}

module.exports = { getJaccardScores, getTokenOccurrences };
