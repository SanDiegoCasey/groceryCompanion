const mongoose = require('mongoose');

const storedStoreSchema = mongoose.Schema({
  name: String,
  storeLogo: String,
});

const StoredStore = mongoose.model('storedstores', storedStoreSchema);

module.exports = { StoredStore };
