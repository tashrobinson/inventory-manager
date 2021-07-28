var mongoose = require('mongoose');

var SupplierSchema = new mongoose.Schema({
  id: String,
  name: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
