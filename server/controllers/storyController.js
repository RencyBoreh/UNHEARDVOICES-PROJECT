const Story = require('../models/Story');
const Donation = require('../models/Donation');

// Get all published stories (excluding archived, optionally filtered)
exports.getStories = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = { visibility: 'published', archived: false };

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { childName: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') },
        { story: new RegExp(search, 'i') },
      ];
    }

    const stories = await Story.find(query).sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (err) {
    console.error('Error in getStories:', err.message);
    res.status(500).json({ error: 'Failed to fetch stories.' });
  }
};

// Get all pending stories (admin only)
exports.getPendingStories = async (req, res) => {
  try {
    const stories = await Story.find({ visibility: 'pending' }).sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (err) {
    console.error('Error in getPendingStories:', err.message);
    res.status(500).json({ error: 'Failed to fetch pending stories.' });
  }
};

// Publish a story (admin only)
exports.publishStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { visibility: 'published', status: 'Awaiting Help' },
      { new: true }
    );
    if (!story) return res.status(404).json({ error: 'Story not found.' });

    res.status(200).json({ message: 'Story published successfully.', story });
  } catch (err) {
    console.error('Error in publishStory:', err.message);
    res.status(500).json({ error: 'Failed to publish story.' });
  }
};

// Archive a published story (admin only)
exports.archiveStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story || story.visibility !== 'published') {
      return res.status(404).json({ error: 'Story not found or not published.' });
    }

    story.archived = true;
    await story.save();

    res.status(200).json({ message: 'Story archived successfully.', story });
  } catch (err) {
    console.error('Error in archiveStory:', err.message);
    res.status(500).json({ error: 'Failed to archive story.' });
  }
};

// Get single published story by ID (and increment views)
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story || story.visibility !== 'published' || story.archived) {
      return res.status(404).json({ error: 'Story not found.' });
    }

    story.views++;
    await story.save();

    res.status(200).json(story);
  } catch (err) {
    console.error('Error in getStoryById:', err.message);
    res.status(500).json({ error: 'Error fetching story.' });
  }
};

// Get published story with donation stats
exports.getStoryWithDonations = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story || story.visibility !== 'published' || story.archived) {
      return res.status(404).json({ error: 'Story not found.' });
    }

    const donations = await Donation.find({ storyId: req.params.id });
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const uniqueDonors = new Set(donations.map(d => d.donorId)).size;

    res.status(200).json({
      story,
      stats: { totalDonations, uniqueDonors },
    });
  } catch (err) {
    console.error('Error in getStoryWithDonations:', err.message);
    res.status(500).json({ error: 'Failed to fetch donation stats.' });
  }
};

// Create a new story (public form submission)
exports.createStory = async (req, res) => {
  try {
    const newStory = await Story.create(req.body);
    res.status(201).json(newStory);
  } catch (err) {
    console.error('Error in createStory:', err.message);
    res.status(400).json({ error: 'Error creating story.' });
  }
};

// Update story status (admin only)
exports.updateStoryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found.' });

    story.status = status;
    await story.save();
    res.status(200).json(story);
  } catch (err) {
    console.error('Error in updateStoryStatus:', err.message);
    res.status(400).json({ error: 'Failed to update status.' });
  }
};

// Delete story (admin only)
exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found.' });

    res.status(200).json({ message: 'Story deleted successfully.' });
  } catch (err) {
    console.error('Error in deleteStory:', err.message);
    res.status(500).json({ error: 'Failed to delete story.' });
  }
};

// Re-activate an archived story (admin only)
exports.reactivateStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story || story.visibility !== 'published' || !story.archived) {
      return res.status(404).json({ error: 'Story not found or not archived.' });
    }

    story.archived = false;
    await story.save();

    res.status(200).json({ message: 'Story re-activated successfully.', story });
  } catch (err) {
    console.error('Error in reactivateStory:', err.message);
    res.status(500).json({ error: 'Failed to re-activate story.' });
  }
};
