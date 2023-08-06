import mongoose from "mongoose";

import UserModel from './user.model.js';

const volunteerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profileImage: String
});

export default UserModel.discriminator('Volunteer', volunteerSchema);
