const mongoose = require('mongoose');
const authorSchema = require('./author');

const bookSchema = new mongoose.Schema({
    id: Number,
    title: String,
    authors: [authorSchema],
    translators: [authorSchema],
    subjects: [String],
    bookshelves: [String],
    languages: [String],
    copyright: Boolean,
    media_type: String,
    formats: {
        type: {
            "text/html": String,
            "application/epub+zip": String,
            "application/x-mobipocket-ebook": String,
            "application/rdf+xml": String,
            "image/jpeg": String,
            "text/plain; charset=us-ascii": String,
            "application/octet-stream": String
        },
        default: {}
    },
    download_count: Number
});

module.exports = bookSchema;
