const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const product = require('./routes/product');
const supplier = require('./routes/supplier');
const shelf = require('./routes/shelf');
const user = require('./routes/user');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/inventory-manager', {
      promiseLibrary: require('bluebird'),
      useNewUrlParser: true,
      useUnifiedTopology: true})
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

const jsonErrorHandler = async (err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(500).send({ error: err });
}

app.use(jsonErrorHandler);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})




/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err; //req.app.get('env') === 'development' ? err :  err; //{};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
  next(err);
});*/

module.exports = app;
