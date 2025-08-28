const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/insightsController');
const { requireAuth, requireRole } = require('../middleware/auth'); 

router.get('/', ctrl.getInsights);
router.post('/',
  requireAuth, 
  [
    body('title').notEmpty().withMessage('Title required'),
    body('sourceUrl').optional().isURL().withMessage('Invalid URL')
  ],
  ctrl.createInsight
);
router.get('/:id', ctrl.getInsightById);
router.put('/:id', requireAuth, ctrl.updateInsight);
router.delete('/:id', requireAuth, requireRole('admin'), ctrl.deleteInsight);

module.exports = router;
