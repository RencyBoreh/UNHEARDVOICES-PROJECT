const Story = require('../models/Story');
const Donation = require('../models/Donation');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get dashboard metrics for admin
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalStories = await Story.countDocuments();
    const publishedStories = await Story.countDocuments({ visibility: 'published', archived: false });
    const awaitingHelp = await Story.countDocuments({
      visibility: 'published',
      status: 'Awaiting Help',
      archived: false,
    });

    const donations = await Donation.find({});
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const uniqueDonors = new Set(donations.map(d => d.donorId)).size;

    res.status(200).json({
      totalStories,
      publishedStories,
      awaitingHelp,
      totalDonations,
      uniqueDonors,
    });
  } catch (err) {
    console.error('Error in admin dashboard:', err.message);
    res.status(500).json({ error: 'Failed to load dashboard metrics.' });
  }
};

// Create default admin user if none exists
exports.seedAdmin = async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      return res.status(200).json({ message: 'Admin user already exists.' });
    }

    const hashedPassword = await bcrypt.hash('defaultPassword123', 12);
    const newAdmin = await Admin.create({
      username: 'admin',
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Admin user created successfully.', adminId: newAdmin._id });
  } catch (err) {
    console.error('Error seeding admin:', err.message);
    res.status(500).json({ error: 'Failed to seed admin user.' });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // ✅ Generate valid JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login successful.', token });
  } catch (err) {
    console.error('Error logging admin:', err.message);
    res.status(500).json({ error: 'Login failed.' });
  }
};
exports.getArchivedStories = async (req, res) => {
  try {
    const stories = await Story.find({ archived: true }).sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch archived stories.' });
  }
};
