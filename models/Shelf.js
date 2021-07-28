var mongoose = require('mongoose');

var ShelfSchema = new mongoose.Schema({
  id: String,
  productId: String,
  location: String,
  status: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shelf', ShelfSchema);
