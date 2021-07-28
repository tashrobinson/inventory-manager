var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  id: String,
  supplierId: String,
  name: String,
  part: String,
  price: Number,
  qty: Number,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
