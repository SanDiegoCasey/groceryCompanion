const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
  price: String
});

const StoredProductSchema = mongoose.Schema({
  name: String,
  unit: String,
  prices: [PriceSchema]
});

module.exports = mongoose.model('StoredProduct', StoredProductSchema, 'storedproducts');
