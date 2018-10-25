'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const storeRoutes = require('./api/routes/stores');

app.use('/products', productRoutes);
app.use('/stores', storeRoutes);




mongoose.Promise = global.Promise; //set mongoose promise style to es6


app.use(morgan('common'));

app.use(express.static('public/views'));
app.use(express.json());

module.exports = app;
