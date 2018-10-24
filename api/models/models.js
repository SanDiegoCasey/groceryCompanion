"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    unique: true
  }
});

const productSchema = mongoose.Schema
