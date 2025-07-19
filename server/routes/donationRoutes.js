const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // 🗂 Customize storage if needed

const {
  recordDonation,
  getDonationsByStory,
} = require('../controllers/donationController');

const { validateRequest } = require('../middleware/validationMiddleware');

// POST /api/donations
router.post(
  '/',
  upload.single('proofImage'),
  recordDonation
);

// GET /api/donations/:storyId
router.get('/:storyId', getDonationsByStory);

module.exports = router;
