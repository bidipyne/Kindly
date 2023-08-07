import UserModel from '../models/user.model.js';
import { ORGANIZATION } from '../config/constants.js';
import VolunteerModel from '../models/volunteer.model.js';
import OrganizationModel from '../models/organization.model.js';

class UserController {
  constructor() { }

  static async getUsers(req, res, next) {
    try {
      const userType = req.query["user-type"]?.toLowerCase();
      let data;

      if (userType) {
        switch (userType) {
          case 'organization':
            data = await OrganizationModel.find();
            break;
          case 'volunteer':
            data = await VolunteerModel.find();
            break;
          default:
            return res.status(400).json({ message: "Invalid userType provided. Valid types are 'organization' or 'volunteer'." });
        }

        return res.json({
          message: 'User list',
          data
        });

      } else {
        const data = await UserModel.find();

        return res.json({
          message: 'User list',
          data
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
  }

  static async getUser(req, res, next) {
    try {
      let userId = req.params.id;

      let user = await UserModel.findById(userId);

      if (!user) {
        return res.json({
          message: 'No user found'
        });
      }

      return res.json({
        message: 'User found.',
        data: user
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      let {
        email,
        password,
        userType,
        name,
        charityNumber,
        province,
        city,
        about,
        address,
        contactInfo,
        website,
        fullName
      } = req.body;

      let profileImage = req.file?.path;

      const user = await UserModel.findById(id);

      if (!user) {
        res.status(400).json({
          message: 'User not found.'
        });
      }

      let userData;

      if (user.userType === ORGANIZATION) {
        let organizationData = {
          name,
          charityNumber,
          province,
          city,
          about,
          address,
          contactInfo,
          website,
          profileImage,
        };

        const organization = new OrganizationModel({
          ...organizationData,
        });

        userData = organization;

        await organization.save();
      }

      if (userType === VOLUNTEER) {
        let volunteerData = {
          fullName,
          province,
          city,
          address,
          profileImage,
        };

        const volunteer = new VolunteerModel({
          ...volunteerData
        });

        userData = volunteer;

        await volunteer.save();
      }

      return res.status(200).send({
        message: userType === "organization" ? "Organization updated!" : "Volunteer updated!",
        data: userData,
      });

    } catch (error) {
      return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
  }

  static async deleteUser(req, res, next) {
    const userId = req.params.id;

    try {
      const user = await UserModel.findByIdAndDelete(userId);

      if (!user) {
        throw new Error("User not found.");
      }

      return res.status(200).send({
        message: "Deleted successfully.",
      });

    } catch (error) {
      res.status(500).json({
        message: "An error occurred.", error: error.message
      });
    }
  }
}

export default UserController;
