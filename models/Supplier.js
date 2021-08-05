const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  name: {type: String, unique: true},
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
