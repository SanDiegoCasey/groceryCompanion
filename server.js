'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;


const { DATABASE_URL, PORT, TEST_DATABASE_URL } = require('./config');
// const { TEST_DATABASE_URL } = require('./config');
// const PORT = 8080;


const listProductRoutes = require('./api/routes/listProducts');
const storedProductRoutes = require('./api/routes/storedProducts');
const listStoreRoutes = require('./api/routes/listStores');
const storedStoreRoutes = require('./api/routes/storedStores');

const app = express();

app.use(morgan('common'));

app.use('/listproducts', listProductRoutes);
app.use('/storedproducts', storedProductRoutes);
app.use('/liststores', listStoreRoutes);
app.use('/storedstores', storedStoreRoutes);

app.use(express.static('public/views'));
app.use(express.json());

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useNewUrlParser: true }
      , err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}


module.exports = { app, runServer, closeServer };
