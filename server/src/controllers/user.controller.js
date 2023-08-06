import mongoose from 'mongoose';

import UserModel from '../models/user.model.js';
import VolunteerModel from '../models/volunteer.model.js';
import OrganizationModel from '../models/organization.model.js';

class UserController {
  constructor() { }

  static async getUsers(req, res, next) {
    try {
      const userType = req.params.userType?.toLowerCase();
      let data;

      if (userType) {
        switch (userType) {
          case 'organization':
            data = await UserModel.find({ userType: 'organization' }).exec();
            break;
          case 'volunteer':
            data = await UserModel.find({ userType: 'volunteer' }).exec();
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


  static async addUser(req, res, next) {

  }

  static async getUser(req, res, next) {
    try {
      let userId = req.params.id;



    } catch (error) {

    }
  }

  static async updateUser(req, res, next) {

  }

  static async deleteUser(req, res, next) {
    const userId = req.params.userId;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const user = await UserModel.findById(userId).session(session);

      if (!user) {
        throw new Error("User not found.");
      }

      const discriminatorModel = UserModel.discriminators[user.userType];

      if (!discriminatorModel) {
        throw new Error("Invalid userType.");
      }

      const associatedDocument = await discriminatorModel.findById(userId).session(session);

      await associatedDocument.deleteOne().session(session);

      await user.deleteOne().session(session);

      await session.commitTransaction();

      return res.json({
        message: 'User and associated data deleted successfully.'
      });
    } catch (error) {
      await session.abortTransaction();

      res.status(500).json({
        message: "An error occurred.", error: error.message
      });
    } finally {
      session.endSession();
    }
  }
}

export default UserController;
