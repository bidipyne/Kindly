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
            data = await OrganizationModel.find().populate('userId').exec();
            break;
          case 'volunteer':
            data = await VolunteerModel.find().populate('userId').exec();
            break;
          default:
            return res.status(400).json({ message: "Invalid userType provided. Valid types are 'organization' or 'volunteer'." });
        }

        return res.json({
          message: 'User list',
          data
        });

      } else {
        const organizations = await OrganizationModel.find().populate('userId').exec();
        const volunteers = await VolunteerModel.find().populate('userId').exec();

        return res.json({
          message: 'User list',
          data: {
            organizations,
            volunteers
          }
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
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let deleteResult = await OrganizationModel.deleteOne({ user_id: mongoose.Types.ObjectId(userId) }).session(session);

      if (deleteResult.deletedCount === 0) {
        await VolunteerModel.deleteOne({ user_id: mongoose.Types.ObjectId(userId) }).session(session);
      }

      await UserModel.deleteOne({ _id: mongoose.Types.ObjectId(userId) }).session(session);

      await session.commitTransaction();

      return res.json({
        message: 'User deleted.'
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
