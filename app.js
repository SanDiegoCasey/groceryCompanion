'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const storeRoutes = require('./api/routes/stores');

app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set CORS ACCESS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productRoutes);
app.use('/stores', storeRoutes);

app.use(express.static('public/views'));
app.use(express.json());

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


mongoose.Promise = global.Promise; //set mongoose promise style to es6






module.exports = app;
