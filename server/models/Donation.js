const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  donorInfo: {
    type: String,
    required: false,
    default: 'Anonymous', // ✅ now optional
  },
  mpesaCode: {
    type: String,
    required: true,
    unique: true,
  },
  proofImage: {
    type: String, // Could be Cloudinary or local path
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);
