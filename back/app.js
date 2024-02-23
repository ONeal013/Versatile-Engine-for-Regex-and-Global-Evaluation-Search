require('dotenv').config()

const compression = require('compression')
const cors = require('cors')

const express = require('express')
const app = express()
const port = 3000

const connectDB = require('./config/db');
connectDB();

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const contentsRouter = require('./routes/contents');
const authorsRouter = require('./routes/authors');
const suggestionsRouter = require('./routes/suggestions');

app.use(cors());
app.use(compression());
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/contents', contentsRouter);
app.use('/authors', authorsRouter);
app.use('/suggestions', suggestionsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})