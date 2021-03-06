'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
  Product.find()

    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    size: req.body.size
  });
  product
    .save()
    .then( result => {
      console.log(result);
      res.status(201).json({
        message: 'new product was created',
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:prodId', (req, res, next) => {
  const id = req.params.prodId;
  Product.findById(id)

    .then(doc => {
      console.log('from db', doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'nothing if found here'
        });
      }

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.patch('/:prodId', (req, res, next) => {
  const id = req.params.prodId;
  const updateOps = {};
  //--------version 1------
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
  //--------version 2------
  // for (const key of Object.keys(req.body)) {
  //   updateOps[key] = req.body[key];
  // }
  //--------version 3------
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }
  Product.findByIdAndUpdate( id, { $set: updateOps })

    .then( result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch( err=> {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:prodId', (req, res, next) => {
  const id = req.params.prodId;
  Product.remove({ _id: id })

    .then( result => {
      res.status(200).json(result);
    })
    .catch( err => {
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
