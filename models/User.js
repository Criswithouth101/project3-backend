const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['viewer','contributor','editor','admin'], default: 'viewer' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
