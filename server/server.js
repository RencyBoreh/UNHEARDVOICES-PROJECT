const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Utils & Config
const logger = require('./utils/logger');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Smart CORS: allow production + Vercel preview deployments
app.use(cors({
  origin: function (origin, callback) {
    console.log('🔍 Incoming Origin:', origin);
    const allowedPattern = /^https:\/\/unheardvoices-project(-[\w\d]*)*(-[\w\d]*)*\.vercel\.app$/;
    if (!origin || allowedPattern.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed.`));
    }
  },
  credentials: true
}));

// ✅ Handle CORS Preflight OPTIONS requests
app.options('*', cors(), (req, res) => {
  console.log(`⚙️ Preflight request from ${req.headers.origin}`);
  res.sendStatus(200);
});

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(logger);

// --- Static File Serving ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes (with safe guards) ---
try {
  const storyRoutes = require('./routes/storyRoutes');
  const donationRoutes = require('./routes/donationRoutes');
  const adminRoutes = require('./routes/adminRoutes');
  const uploadRoutes = require('./routes/uploadRoutes');
  const contactRoutes = require('./routes/contactRoutes');

  app.use('/api/stories', storyRoutes);
  app.use('/stories', storyRoutes); // Duplicate endpoint for frontend flexibility
  app.use('/api/donations', donationRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/contact', contactRoutes);
} catch (err) {
  console.error('❌ Route registration failed:', err.message);
}

// --- Error Handling ---
app.use(notFound);
app.use(errorHandler);

// --- Server Start ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
});