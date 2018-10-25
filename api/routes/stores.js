'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'stores will show here'
  });
});

router.post('/', (req, res, next) => {
  const store = {
    prodId: req.body.prodId,
    name: req.body.name,
    location: req.body.location,
  };
  res.status(201).json({
    message: 'new store will be created',
    store: store
  });
});

router.get('/:storeID', (req, res, next) => {
  res.status(201).json({
    message: 'store details will got and shown here',
    storeID: req.params.storeID
  });
});

router.patch('/:storeID', (req, res, next) => {
  res.status(200).json({
    message: 'store details have been changed'
  });
});

router.delete('/:storeID', (req, res, next) => {
  res.status(200).json({
    message: `The store ${req.params.storeID} has been removed.`
  });
});





module.exports = router;
