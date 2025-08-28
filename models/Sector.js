const mongoose = require('mongoose');

const SectorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Sector', SectorSchema);
