const Insight = require('../models/Insight');
const { validationResult } = require('express-validator');

exports.getInsights = async (req, res, next) => {
  try {
    const { search, tags, impact, from, to, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' }},
      { summary: { $regex: search, $options: 'i' }}
    ];
    if (tags) filter.tags = { $all: tags.split(',').map(t => t.trim()) };
    if (impact) filter.impact = impact;
    if (from || to) filter.dateObserved = {};
    if (from) filter.dateObserved.$gte = new Date(from);
    if (to) filter.dateObserved.$lte = new Date(to);

    const docs = await Insight.find(filter)
      .sort({ dateObserved: -1, createdAt: -1 })
      .skip((page-1)*limit)
      .limit(parseInt(limit));

    const total = await Insight.countDocuments(filter);
    res.json({ data: docs, total });
  } catch (err) {
    next(err);
  }
};

exports.createInsight = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const doc = new Insight(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) { next(err); }
};

exports.getInsightById = async (req, res, next) => {
  try {
    const doc = await Insight.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
};

exports.updateInsight = async (req, res, next) => {
  try {
    const updated = await Insight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteInsight = async (req, res, next) => {
  try {
    await Insight.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
};
