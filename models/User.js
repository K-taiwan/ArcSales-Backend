const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  }, 
  description: {
    type: String,
    required: [false],
  }, 
  joinDate: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;