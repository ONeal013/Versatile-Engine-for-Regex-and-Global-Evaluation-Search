const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const tokenize = (data) => {
    const index = {};
    const tokens = tokenizer.tokenize(data);
    tokens.forEach(token => {
        if (!index[token]) {
            index[token] = 1;
        } else {
            index[token]++;
        }
    });
    return index;
}


module.exports = tokenize;


const calculateJaccardIndex = (doc1Tokens, doc2Tokens) => {
    const set1 = new Set(doc1Tokens);
    const set2 = new Set(doc2Tokens);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
};


module.exports.calculateJaccardIndex = calculateJaccardIndex;