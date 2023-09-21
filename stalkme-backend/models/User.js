const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  instagramProfiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstagramProfiles',
  }],
  linkedinProfiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LinkedinProfiles',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
