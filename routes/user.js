const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');


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

/* Authenticate User */
router.post('/authenticate', function(req, res, next) {
  console.log("Authenticate " + JSON.stringify(req.body));
  User.find({ $and: [{username: req.body.username}, {passwordHash: req.body.password}] },
    function (err, post) {
    if (err) {
      console.log("Authenticate error " + err.message)
      return next(err);
    }
    //res.json(post);
    if (!post || post.length < 1) {
      console.log("Authenticate error post is empty!")
      return next(new Error("Authenticate error post is empty!"));
    }
    console.log("Authenticate OK! Returning " + JSON.stringify(post));
    res.json(post[0]);
  });
});

/* SAVE User */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) {
      console.log(`user create error: ${JSON.stringify(err)} `)
      return next(err);
    }
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
