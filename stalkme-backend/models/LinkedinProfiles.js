const mongoose = require('mongoose');

const LinkedinProfilesSchema = new mongoose.Schema({
  profileImg: {
    type: String,
    required: true,
  },
  linkedinUrl: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LinkedinProfiles', LinkedinProfilesSchema);
