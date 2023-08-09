import mongoose from "mongoose";

import UserModel from "./user.model.js";

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
    // required: true
  },
  profileImage: String,
  contactInfo: {
    type: String,
    // required: true
  },
  website: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.*\..*$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    },
  }
}, { discriminatorKey: 'userType' });

export default UserModel.discriminator('organization', organizationSchema);
