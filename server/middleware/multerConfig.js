const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage location and naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${Date.now()}-${name}${ext}`);
  },
});

// Accept only common image types
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  const allowedExts = ['.jpg', '.jpeg', '.png'];
  const allowedMime = ['image/jpeg', 'image/png'];

  if (!allowedExts.includes(ext) || !allowedMime.includes(mime)) {
    console.warn(`Rejected file type: ${ext}, ${mime}`);
    return cb(new Error('Only JPG, JPEG, and PNG image files are allowed.'));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: limit to 5MB
});

module.exports = upload;
