import mongoose from "mongoose";

import { HOST, PORT } from '../config/constants.js';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["Ongoing", "Closed"],
    default: "Ongoing"
  },
  location: {
    type: String
  },
  contactInfo: {
    type: String
  },
  lookingFor: { // We need.
    type: String,
    enum: ["Volunteers", "Donations"],
    default: "Donations"
  },
  profileImage: String,
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

projectSchema.set('toObject', { virtuals: true });
projectSchema.set('toJSON', { virtuals: true });

projectSchema.virtual('fullProfileImageUrl').get(function () {
  if (this.profileImage) {
    return `${HOST}:${PORT}/${this.profileImage}`;
  }

  return null;
});

export default mongoose.model('Project', projectSchema);
