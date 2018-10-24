'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //set mongoose promise style to es6


app.use(morgan('common'));

app.use(express.static('public/views'));
app.use(express.json());

module.exports = app;
