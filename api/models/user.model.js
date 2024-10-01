// idr jp column row bnae gay wo db mein create ho ga

import mongoose from "mongoose";

const defaultAvatarPath = '../../codemelding/src/assets/default_avatar.png';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: defaultAvatarPath, 
  },
  isAdmin: {
    type:Boolean,
    default:false,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
