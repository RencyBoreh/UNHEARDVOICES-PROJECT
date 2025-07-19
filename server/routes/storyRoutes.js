const express = require('express');
const router = express.Router();
const {
  getStories,
  getStoryById,
  createStory,
  updateStoryStatus,
  getPendingStories,
  publishStory,
  getStoryWithDonations,
  deleteStory,
  archiveStory,
  reactivateStory,
} = require('../controllers/storyController');

const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getStories);

router.get('/:id/stats', getStoryWithDonations);

// Submit new story
router.post(
  '/',
  [
    body('childName').notEmpty().withMessage('Name required'),
    body('location').notEmpty().withMessage('Location required'),
    body('summary').isLength({ max: 280 }).withMessage('Summary too long'),
    body('story').notEmpty().withMessage('Full story required'),
  ],
  validateRequest,
  createStory
);

// Protected Routes (Admin)
router.get('/pending', protect, getPendingStories);
router.patch('/:id/publish', protect, publishStory);
router.put('/:id/status', protect, updateStoryStatus);
router.delete('/:id', protect, deleteStory); // ✅ Delete published or pending
router.patch('/:id/archive',protect,archiveStory);
router.patch('/:id/reactivate', protect, reactivateStory); // ✅ new route

router.get('/:id', getStoryById);
module.exports = router;
