const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
});

module.exports = model('user', UserSchema);
