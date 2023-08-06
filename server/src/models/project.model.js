import mongoose, { mongo } from "mongoose";

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
    enum: ["Volunteering", "Donations"],
    default: "Donations"
  },
  profileImage: String,
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Project', projectSchema);
