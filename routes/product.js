var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product.js');


/* GET ALL Products */
router.get('/', function(req, res, next) {
  Product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Product BY ID */
router.get('/:id', function(req, res, next) {
  Product.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE Product BY product*/
router.get('/shelf/:id', function(req, res, next) {
  Product.findOne( {id: req.params.id}, function (err, post) {

  if (err){
   console.log(`product find by product id error ${err.message}`)
   return next(err);
  }

  if (!post || post.length < 1) {
   console.log("No product found!")
   return next(new Error("No Shelf!"));
  }

  console.log(`product found product ${JSON.stringify(post)}`)
  res.json(post);
  });
});


/* SAVE Product */
router.post('/', function(req, res, next) {
  Product.create(req.body, function (err, post) {
    if (err) {
      console.log(`product create error: ${JSON.stringify(err)} `)
      return next(err);
    }
    res.json(post);
  });
});

/* UPDATE Product */
router.put('/:id', function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Product */
router.delete('/:id', function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
