const cloudinary = require('../config/cloudinary');

exports.uploadImage = async (req, res) => {
  try {
    console.log('Received file:', req.file);

    if (!req.file) {
      console.error('❌ No file received in request.');
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'voicesunheard',
    });

    console.log('✅ Uploaded to Cloudinary:', result.secure_url);
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error('❌ Upload failed:', err);
    res.status(500).json({ error: 'Upload failed due to server error.' });
  }
};
