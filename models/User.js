const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  passwordHash: String,
  isAdmin: Boolean,
  updated_date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', UserSchema);
