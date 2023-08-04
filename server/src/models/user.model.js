import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import { saltRounds } from "../config/constants.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,  // minimum length validation
    validate: {
      validator: function(v) {
        // Regular expression to check for at least one number and one uppercase letter
        return /(?=.*\d)(?=.*[A-Z])/.test(v);
      },
      message: props => 'Password should contain at least one number and one uppercase letter!'
    }
  },
  userType: {
    type: String,
    enum: ['organization', 'volunteer'],
    required: true,
  }
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('User', userSchema);
