require('dotenv').config()

const compression = require('compression')

const express = require('express')
const app = express()
const port = 3000

const connectDB = require('./config/db');
connectDB(); 

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) 
})