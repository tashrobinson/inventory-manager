const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  supplierId: String,
  name: String,
  part: String,
  price: Number,
  qty: Number,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
