const Graph = require('graphology');
const pagerank = require('graphology-metrics/centrality/pagerank');
const { getJaccardScores } = require('../config/helpers/dataHelper');
const { getAllBookIds} = require('../config/helpers/dataHelper');


async function getPageRankScores() {
    const graph = new Graph();
    // Supposons que vous ayez une fonction pour obtenir tous les ID des livres
    const allBookIds = await getAllBookIds(); // Implémentez cette fonction selon votre modèle
    const jaccardScores = await getJaccardScores(allBookIds);

    // Construire le graphe
    allBookIds.forEach(id => graph.addNode(id));
    jaccardScores.forEach(({ doc1, doc2, similarity }) => {
        if (!graph.hasEdge(doc1, doc2)) {
            graph.addUndirectedEdge(doc1, doc2, { weight: similarity });
        }
    });

    // Calculer le PageRank
    const scores = pagerank(graph);
    return scores;
}


module.exports = getPageRankScores;




