var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Shelf = require('../models/Shelf.js');


/* GET ALL Shelves */
router.get('/', function(req, res, next) {
  Shelf.find(function (err, shelves) {
    if (err) return next(err);
    res.json(shelves);
  });
});

/* GET SINGLE Shelf BY ID */
router.get('/:id', function(req, res, next) {
  Shelf.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE Shelf BY ProductID */
router.get('/product/:id', function(req, res, next) {
  Shelf.findOne( {productId: req.body.productId }, function (err, post) {
    if (err) return next(err);

    if (!post || post.length < 1) {
      console.log("No shelves found!")
      return next(new Error("No Shelf!"));
    }

    res.json(post[0]);
  });
});


/* SAVE Shelf */
router.post('/', function(req, res, next) {
  Shelf.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Shelf */
router.put('/:id', function(req, res, next) {
  Shelf.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Shelf */
router.delete('/:id', function(req, res, next) {
  Shelf.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
