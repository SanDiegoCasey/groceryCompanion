'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;


const { DATABASE_URL, PORT } = require('./config');
// const PORT = 8080;


const productRoutes = require('./api/routes/products');
const storeRoutes = require('./api/routes/stores');
// const { Users } = require('./api/models/users');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// });

app.use('/products', productRoutes);
app.use('/stores', storeRoutes);

app.use(express.static('public/views'));
app.use(express.json());

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});


//--------version 1 end------
//--------version 2------
// mongoose.connect('mongodb://standarduser:' + process.env.MONGO_MLAB_PASS + '@ds141613.mlab.com:41613/grocerycompanion', {
//   useNewUrlParser: true
// });
//--------version 2 end ------
//--------version 3------
// mongoose.connect('mongodb://standarduser:thinkuser1@ds141613.mlab.com:41613/grocerycompanion', {
//   useNewUrlParser: true
// });
//--------version 3 end ------



//Set CORS ACCESS


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl, { useNewUrlParser: true },
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
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
