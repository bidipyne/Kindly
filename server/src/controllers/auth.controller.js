import UserModel from '../models/user.model.js';
import volunteerModel from '../models/volunteer.model.js';
import organizationModel from '../models/organization.model.js';
import { ORGANIZATION, VOLUNTEER } from '../config/constants.js';

class AuthController {
  constructor() { }

  static async signup(req, res, next) {
    try {
      let { email, password, userType } = req.body;
      let { name, charityNumber, province, city, about, address, contactInfo, website, fullName } = req.body;
      let profileImage = req.file.path;

      if (userType !== ORGANIZATION || userType !== VOLUNTEER) {
        return res.status(401).send({ message: 'User Role is not valid.' });
      }

      let userData = {
        email,
        password,
        userType,
      };

      const user = new UserModel(userData);
      await user.save();

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

        await organization.save();

        return res.status(200).send({
          message: 'Organization created!',
          data: {
            userId: user._id,
            organizationId: organization._id
          }
        });
      }

      if (req.body.userMetaData === VOLUNTEER) {
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

        await volunteer.save();

        return res.status(200).send({
          message: 'Volunteer created!',
          data: {
            userId: user._id,
            volunteerId: volunteer._id
          }
        });
      }
    } catch (error) {
      res.status(400).send(error);
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
