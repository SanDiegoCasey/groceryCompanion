'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'this is get to /products'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'new product was created'
  });
});

router.get('/:prodId', (req, res, next) => {
  const id = req.params.prodId;
  if (id === 'casey'){
    res.json({
      message: 'You found ... wait for it.',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'you passed an id'
    });
  }
});

router.patch('/:prodId', (req, res, next) => {
  res.status(200).json({
    message: 'updated product'
  });
});

router.delete('/:prodId', (req, res, next) => {
  res.status(200).json({
    message: 'product deleted'
  });
});


module.exports = router;
