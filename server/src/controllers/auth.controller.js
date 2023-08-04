import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import volunteerModel from '../models/volunteer.model.js';
import organizationModel from '../models/organization.model.js';
import { ORGANIZATION, VOLUNTEER } from '../config/constants.js';

class AuthController {
  constructor() { }

  static async signup(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
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

      const validUserTypes = [ORGANIZATION, VOLUNTEER];
      if (!validUserTypes.includes(userType)) {
        return res.status(400).send({ message: 'Please provide a valid user type.' });
      }

      const user = new UserModel({
        email,
        password,
        userType,
      });
      await user.save({ session });

      if (req.body.userType === ORGANIZATION) {
        let organizationData = {
          name,
          charityNumber,
          province,
          city,
          about,
          address,
          contactInfo,
          website,
          profileImage
        };

        const organization = new organizationModel({
          userId: user._id,
          ...organizationData
        });

        await organization.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).send({
          message: 'Organization created!',
          data: {
            userId: user._id,
            organizationId: organization._id
          }
        });
      }

      if (req.body.userType === VOLUNTEER) {
        let volunteerData = {
          fullName,
          province,
          city,
          address,
          profileImage
        };

        const volunteer = new volunteerModel({
          userId: user._id,
          ...volunteerData
        });

        await volunteer.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).send({
          message: 'Volunteer created!',
          data: {
            userId: user._id,
            volunteerId: volunteer._id
          }
        });
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error.code === 11000) {
        return res.status(400).send({ message: 'Email already exists.' });
      }

      if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return res.status(400).send(errors);
      } else {
        res.status(400).send(error);
      }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: 'The email address is not associated with any account.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }

      res.send({ message: 'Successfully logged in!', data: user });

    } catch (error) {
      res.status(500).send({ message: 'Server error.', error });
    }
  }

}

export default AuthController;
