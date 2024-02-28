// helpers/dataHelpers.js
const JaccardScore = require('../models/jaccardScore'); // Assurez-vous que ce chemin correspond à votre structure de projet
const Index = require('../models/index'); // Assurez-vous que ce chemin correspond à votre structure de projet
const Book = require('../models/book');



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

async function getAllBookIds() {
    try {
        const books = await Book.find({}, '_id'); // Sélectionne uniquement le champ _id
        return books.map(book => book._id.toString()); // Convertit les ObjectId en chaînes de caractères
    } catch (error) {
        console.error("Erreur lors de la récupération des identifiants des livres:", error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
}



async function getAllAuthorNames() {
    try {
        const authors = await Author.find({}, 'name'); // Récupère tous les auteurs avec seulement le champ 'name'
        const authorNames = authors.map(author => author.name); // Transforme en un tableau de noms
        return authorNames;
    } catch (error) {
        console.error('Error fetching author names:', error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
}



module.exports = { getJaccardScores, getTokenOccurrences, getAllBookIds, getAllAuthorNames};



