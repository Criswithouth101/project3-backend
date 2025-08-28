const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  sourceUrl: { type: String },
  tags: [{ type: String }],
  impact: { type: String, enum: ['Low','Medium','High'], default: 'Low' },
  confidence: { type: Number, min: 1, max: 5 },
  dateObserved: { type: Date },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  sectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sector' },
}, { timestamps: true });

module.exports = mongoose.model('Insight', InsightSchema);
