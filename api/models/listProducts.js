const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
  price: String
});

const ListProductSchema = mongoose.Schema({
  name: String,
  unit: String,
  prices: [PriceSchema]
});

module.exports = mongoose.model('ListProduct', ListProductSchema, 'listproducts');
