'use strict';
exports.PORT = process.env.PORT || 8080;
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://standarduser:thinkful74@ds141613.mlab.com:41613/grocerycompanion';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://standarduser:thinkuser2@ds249583.mlab.com:49583/grocerycompanion-test';
