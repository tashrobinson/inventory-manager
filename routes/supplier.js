var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Supplier = require('../models/Supplier.js');


/* GET ALL Suppliers */
router.get('/', function(req, res, next) {
  Supplier.find(function (err, suppliers) {
    if (err) return next(err);
    res.json(suppliers);
  });
});

/* GET SINGLE Supplier BY ID */
router.get('/:id', function(req, res, next) {
  Supplier.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Supplier */
router.post('/', function(req, res, next) {
  Supplier.create(req.body, function (err, post) {
    if (err) {
      console.log(`supplier create error: ${JSON.stringify(err)} `)
      return next(err);
    }
    res.json(post);
  });
});

/* UPDATE Supplier */
router.put('/:id', function(req, res, next) {
  Supplier.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Supplier */
router.delete('/:id', function(req, res, next) {
  Supplier.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
