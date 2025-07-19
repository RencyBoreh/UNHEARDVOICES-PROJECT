const express = require('express');
const router = express.Router();

const {
  loginAdmin,
  getAdminDashboard,
  seedAdmin,
  getArchivedStories, // ✅ make sure this is imported!
} = require('../controllers/adminController');

const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

// 🔐 Admin Authentication
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  validateRequest,
  loginAdmin
);

// 📊 Admin Dashboard
router.get('/dashboard', protect, getAdminDashboard);

// 🧪 Seed Initial Admin
router.post('/seed', seedAdmin);

// 📁 View Archived Stories
router.get('/archived', protect, getArchivedStories); // ✅ new route for archived stories

module.exports = router;
