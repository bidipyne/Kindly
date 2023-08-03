import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import { saltRounds } from "../config/constants";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
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
  role: {
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
