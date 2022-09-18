const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  teller: {
    type: Boolean,
  },
  tellerfund: {
    type: Number,
  },
  location:{
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
