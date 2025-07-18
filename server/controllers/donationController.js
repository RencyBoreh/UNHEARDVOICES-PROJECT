const Donation = require('../models/Donation');

exports.recordDonation = async (req, res) => {
  try {
    const { storyId, amount, mpesaCode } = req.body;
    const proofImage = req.file?.path; // 🧾 multer populates this

    const donation = await Donation.create({
      storyId,
      amount,
      mpesaCode,
      proofImage,
    });

    res.status(201).json(donation);
  } catch (err) {
    console.error('Donation error:', err);
    res.status(400).json({ error: 'Failed to record donation.' });
  }
};

exports.getDonationsByStory = async (req, res) => {
  try {
    const donations = await Donation.find({ storyId: req.params.storyId });
    res.status(200).json(donations);
  } catch (err) {
    console.error('Donation fetch error:', err);
    res.status(500).json({ error: 'Error fetching donations.' });
  }
};
