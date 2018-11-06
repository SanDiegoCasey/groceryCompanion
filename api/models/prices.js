const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
  price: String,
  storeLogo: String,
});

module.exports = mongoose.model('Price', PriceSchema);
