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

// ✅ Smart CORS: allows production & all Vercel preview URLs
app.use(cors({
  origin: function (origin, callback) {
    const allowedPattern = /^https:\/\/unheardvoices-project(-[\w\d]+)?\.vercel\.app$/;
    console.log('🔍 Incoming Origin:', origin); // Optional: log origin for debugging
    if (!origin || allowedPattern.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} not allowed.`));
    }
  },
  credentials: true
}));

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(logger);

// --- Static File Serving ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
const storyRoutes = require('./routes/storyRoutes');
app.use('/api/stories', storyRoutes);
app.use('/stories', storyRoutes); // ✅ Added route to support /stories path

app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// --- Error Handling ---
app.use(notFound);
app.use(errorHandler);

// --- Server Start ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
});