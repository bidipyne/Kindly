import UserModel from '../models/user.model.js';
import VolunteerModel from "../models/volunteer.model.js";
import { ORGANIZATION, VOLUNTEER } from "../config/constants.js";
import OrganizationModel from "../models/organization.model.js";

class CommonCtrl {
  constructor() { }

  static async uploadImage(req, res, next) {
    try {
      let { userId } = req.body;
      let profileImage = req.file?.path;

      if (!userId || !profileImage) {
        return res.status(400).json({
          message: 'Missing required path - userId or file.'
        });
      }

      let user = await UserModel.findById(userId);

      if (user.userType === ORGANIZATION) {
        const organization = new OrganizationModel({
          profileImage
        });

        await organization.save({ validateBeforeSave: false });
      }

      if (user.userType === VOLUNTEER) {
        const volunteer = new VolunteerModel({
          profileImage
        });

        volunteer.save({ validateBeforeSave: false });
      }

      res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error uploading image: ' + error.message });
    }
  }
}

export default CommonCtrl;
