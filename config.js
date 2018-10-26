'use strict';

exports.MONGO_MLAB_PASS = 'thinkuser1';
exports.port = process.env.PORT || 8080;
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/groceryDB';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-groceryDB';
