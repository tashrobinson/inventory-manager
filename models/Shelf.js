const mongoose = require('mongoose');

const ShelfSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  productId: String,
  location: String,
  status: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shelf', ShelfSchema);
