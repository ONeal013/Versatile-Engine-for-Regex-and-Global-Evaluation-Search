const Graph = require('graphology');
const pagerank = require('graphology-metrics/centrality/pagerank');
const { getJaccardScores } = require('../config/helpers/dataHelper');
const { getAllBookIds} = require('../config/helpers/dataHelper');
const Book = require('../config/models/book'); // Assurez-vous que ce chemin est correct


async function getPageRankScores() {
    const graph = new Graph();
    const allBookIds = await getAllBookIds();
    const jaccardScores = await getJaccardScores(allBookIds);

    allBookIds.forEach(id => graph.addNode(id));
    jaccardScores.forEach(({ doc1, doc2, similarity }) => {
        if (!graph.hasEdge(doc1, doc2)) {
            graph.addUndirectedEdge(doc1, doc2, { weight: similarity });
        }
    });

    const scores = pagerank(graph);

    // Mise à jour des documents de livre avec leurs scores de PageRank
    for (const bookId in scores) {
        await Book.findByIdAndUpdate(bookId, { $set: { page_rank_score: scores[bookId] } });
    }

    console.log('PageRank scores updated in the database.');
}

module.exports = getPageRankScores;






