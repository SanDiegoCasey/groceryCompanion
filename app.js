'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const storeRoutes = require('./api/routes/stores');

app.use(morgan('common'));

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
