const mongoose = require('mongoose');

const InstagramProfilesSchema = new mongoose.Schema({
  profileImg: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  followings: {
    type: Number,
    required: true,
  },
  posts: {
    type: Number,
    required: true,
  },
  profileImg: {
    type: String,
    required: true,
  },
  isHidden: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('InstagramProfiles', InstagramProfilesSchema);