const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePic:{
    type : String,
    default: ""
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;