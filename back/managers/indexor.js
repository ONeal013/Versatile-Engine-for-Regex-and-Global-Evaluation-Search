const natural = require('natural');
const tokenizer = new natural.AggressiveTokenizer();

const stopWords = require('../stop_words_english.json') + Array.from({ length: 100 }, (_, i) => i)


const tokenize = (data) => {
    const index = {};
    const tokens = tokenizer.tokenize(data.toLowerCase());
    tokens.forEach(token => {
        if (!stopWords.includes(token.toLowerCase())) { // Filtrer les stop words
            if (!index[token]) {
                index[token] = 1;
            } else {
                index[token]++;
            }
        }
    });
    return index;
}

module.exports = tokenize;
