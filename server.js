'use strict';

const http = require('http');
const port = require('./config');
const app = require('./app');

const server = http.createServer(app);


server.listen(port);
console.log(`Grocery-Server is listening on port ${port.port}`);
