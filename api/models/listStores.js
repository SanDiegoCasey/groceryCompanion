const mongoose = require('mongoose');

const listStoreSchema = mongoose.Schema({
  name: String,
  storeLogo: String,
});

const ListStore = mongoose.model('liststores', listStoreSchema);

module.exports = { ListStore };
