var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var product = require('./routes/product');
var supplier = require('./routes/supplier');
var shelf = require('./routes/shelf');
var user = require('./routes/user');
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/inventory-manager', {
      promiseLibrary: require('bluebird'),
      useNewUrlParser: true  })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/products', express.static(path.join(__dirname, 'dist')));
app.use('/suppliers', express.static(path.join(__dirname, 'dist')));
app.use('/shelves', express.static(path.join(__dirname, 'dist')));
app.use('/users', express.static(path.join(__dirname, 'dist')));
app.use('/product', product);
app.use('/supplier', supplier);
app.use('/shelf', shelf);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
