var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');


/* GET ALL Users */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/usercount/', function(req, res, next) {
  User.countDocuments( function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/admincount/', function(req, res, next) {
  User.countDocuments( {isAdmin: true}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE User BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE User BY Username */
router.get('/username/:username', function(req, res, next) {
  User.findOne( {username: req.params.username}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* SAVE User */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE User */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE User */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;