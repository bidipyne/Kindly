import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import { saltRounds, HOST, PORT } from "../config/constants.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    validate: {
      validator: function (v) {
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

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.virtual('fullProfileImageUrl').get(function () {
  if (this.profileImage) {
    return `${HOST}:${PORT}/${this.profileImage}`;
  }

  return null;
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
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('User', userSchema);
