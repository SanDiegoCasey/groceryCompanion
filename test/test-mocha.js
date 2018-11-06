'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const mocha = require('mocha');
const assert = require('assert');
const {
  Store
} = require('../api/models/stores');
const {
  app,
  runServer,
  closeServer
} = require('../server.js');
const {
  TEST_DATABASE_URL
} = require('../config.js');



const productRoutes = require('../api/routes/products');
const storeRoutes = require('../api/routes/stores');

const expect = chai.expect;

chai.use(chaiHttp);


function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedStoreData() {
  console.info('seeding store data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      name: faker.company.companyName(),
      storeLogo: faker.image.imageUrl()
    });
  }
  return Store.insertMany(seedData);
}


describe('Store API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedStoreData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('saving records', function() {
    it('saves record to the database', function(done) {

      var shop = new Store({
        name: 'Vons',
        storeLogo: 'imgvonslogo.jpg',
      });
      shop.save().then(function() {
        assert(!shop.isNew);
        done();
      }).catch(done);
    });
  });

  describe('GET endpoint', function() {
    it('should return all existing stores', function() {
      let res;
      return chai.request(app)
        .get('/stores')
        .then(_res => {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body).to.have.lengthOf.at.least(1);
          return Store.count();
        }).then(function(count) {
          expect(res.body).to.have.lengthOf(count);
        });
    });

    it('should return posts with right fields', function() {
      let resStore;
      return chai.request(app)
        .get('/stores')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          res.body.forEach(function(store) {
            expect(store).to.be.a('object');
            expect(store).to.include.keys('_id', 'name', 'storeLogo');
          });
          resStore = res.body[0];
          console.log(Store.findById(resStore.id));
          return Store.findById(resStore.id);
        })
        .then(doc => {
          console.log(`Casey ${doc}`);
          resStore.name.should.equal(doc.name);
          resStore.name.should.equal(doc.storeLogo);
        });
    });
  });

  // simple database test to see if the server is connected.



});





// simple database test to see if the server is connected.

// describe('saving records', function() {
//   it('saves record to the database', function(done) {
//
//     var shop = new Store({
//       name: 'Vons',
//       storeLogo: 'imgvonslogo.jpg',
//     });
//     shop.save().then(function() {
//       assert(!shop.isNew);
//       done();
//     }).catch(done);
//   });
// });





// testing html pages

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
