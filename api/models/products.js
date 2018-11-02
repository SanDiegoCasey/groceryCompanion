const mongoose = require('mongoose');


const PriceSchema = mongoose.Schema({
  price: String,
  storeLogo: String,
});


const ProductSchema = mongoose.Schema({
  name: String,
  unit: String,
  prices: [PriceSchema]
});


module.exports = mongoose.model('Product', productSchema);
