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