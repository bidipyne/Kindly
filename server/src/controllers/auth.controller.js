import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import VolunteerModel from '../models/volunteer.model.js';
import OrganizationModel from '../models/organization.model.js';
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

      let userData;

      if (userType === ORGANIZATION) {
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
          email,
          password,
          userType,
          ...organizationData,
        });

        userData = organization;

        await organization.save({ session });
      }

      if (userType === "volunteer") {
        let volunteerData = {
          fullName,
          province,
          city,
          address,
          profileImage,
        };

        const volunteer = new VolunteerModel({
          email,
          password,
          userType,
          ...volunteerData,
        });

        userData = volunteer;

        await volunteer.save({ session });
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(200).send({
        message: userType === "organization" ? "Organization created!" : "Volunteer created!",
        data: userData,
      });
    } catch (error) {
      await session.abortTransaction();

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
    } finally {
      session.endSession();
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
