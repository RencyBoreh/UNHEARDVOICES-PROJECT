const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
    maxlength: 280,
  },
  story: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Awaiting Help', 'Supported', 'Under Review'],
    default: 'Under Review',
  },
  visibility: {
    type: String,
    enum: ['pending', 'published', 'rejected'],
    default: 'pending',
  },
  submittedBy: {
    type: String,
    default: 'Anonymous',
  },
  archived: {
  type: Boolean,
  default: false,
},
  volunteerContact: {
    type: String,
    default: '',
  },
  views: {
    type: Number,
    default: 0,
  },
  donations: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });


module.exports = mongoose.model('Story', StorySchema);
