'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('index page', function() {
  it('should exist', function() {
    return chai
      .request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

describe('about page', function() {
  it('should exist', function() {
    return chai
      .request(app)
      .get('/about.html')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});
