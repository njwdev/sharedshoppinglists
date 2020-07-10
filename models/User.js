const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  prevLogin: {
    type: Date,
  },
  profile: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
      //add default no image
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    initialProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = User = mongoose.model('user', UserSchema);
