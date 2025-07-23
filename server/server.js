const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const logger = require('./utils/logger');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
const allowedOrigins = [
  'https://unheardvoices-project.vercel.app', // your Vercel frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());



// Logging (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(logger);

// Serve static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// --- Error Handling ---
app.use(notFound);
app.use(errorHandler);

// Triggering CI pipeline test
// Triggering test run after package.json update


// --- Server Start ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is now running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
});
