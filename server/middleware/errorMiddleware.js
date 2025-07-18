// server/middleware/errorMiddleware.js
exports.notFound = (req, res, next) => {
  res.status(404).json({ error: 'Route not found.' });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Server error occurred.' });
};
