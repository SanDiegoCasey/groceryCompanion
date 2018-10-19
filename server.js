"use strict";

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise; //set mongoose promise style to es6
// 
// const { DATABASE_URL, PORT } = require("./config");
// const { ModelLink1, ModelLink2 } = require("./models");

const app = express();

app.use(express.static("public"));
app.use(morgan("common"));
app.use(express.json());

if (require.main === module) {
  app.listen(process.env.PORT || 8080, function(){
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;
