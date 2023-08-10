import mongoose from "mongoose";

import UserModel from "./user.model.js";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming User model
  rating: { type: Number, min: 1, max: 5 },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  charityNumber: {
    type: Number,
    required: true,
    unique: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  profileImage: String,
  contactInfo: {
    type: String,
    required: true
  },
  website: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.*\..*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  },
  reviews: [reviewSchema]
}, { discriminatorKey: 'userType' });

export default UserModel.discriminator('organization', organizationSchema);
