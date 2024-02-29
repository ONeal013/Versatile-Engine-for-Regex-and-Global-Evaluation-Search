const mongoose = require('mongoose');
const Content = require('../config/models/content'); // Assurez-vous que ce chemin est correct
const JaccardScore = require('../config/models/jaccardScore');
const { calculateJaccardIndex } = require('./indexor');

async function calculateAndStoreJaccardScores() {
    // Connexion à MongoDB
    mongoose.connect('mongodb+srv://verge:azerty@cluster0.q5y2zkn.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

    const documents = await Content.find().exec();

    for (let i = 0; i < documents.length; i++) {
        for (let j = i + 1; j < documents.length; j++) {
            const doc1 = documents[i];
            const doc2 = documents[j];

            // Assumer que vous avez une fonction pour extraire les tokens des documents
            const doc1Tokens = tokenizeDocument(doc1.content);
            const doc2Tokens = tokenizeDocument(doc2.content);

            const score = calculateJaccardIndex(doc1Tokens, doc2Tokens);

            // Créer ou mettre à jour le score de Jaccard dans la base de données
            const existingScore = await JaccardScore.findOne({ docId: doc1._id, "similarDocs.docId": doc2._id }).exec();
            if (existingScore) {
                await JaccardScore.updateOne({ _id: existingScore._id, "similarDocs.docId": doc2._id }, { $set: { "similarDocs.$.score": score } });
            } else {
                await JaccardScore.updateOne({ docId: doc1._id }, { $push: { similarDocs: { docId: doc2._id, score: score } } }, { upsert: true });
            }
        }
    }

    console.log('Les scores de Jaccard ont été calculés et stockés avec succès.');
}

// Exemple de fonction pour tokeniser le contenu d'un document
function tokenizeDocument(content) {
    // Utilisez votre logique de tokenisation ici, par exemple:
    return content.split(/\s+/); // Divise le contenu en mots basés sur les espaces
}

// Lancer le calcul et le stockage des scores
calculateAndStoreJaccardScores().then(() => mongoose.disconnect());
