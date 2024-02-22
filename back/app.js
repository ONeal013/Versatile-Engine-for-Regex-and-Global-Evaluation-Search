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

app.use(cors());
app.use(compression());
app.use('/', indexRouter);
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Middleware pour activer le CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // "*" pour autoriser toutes les origines
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Vos routes ici

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
