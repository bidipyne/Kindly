import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import { ORGANIZATION, VOLUNTEER } from '../config/constants.js';
import VolunteerModel from '../models/volunteer.model.js';
import OrganizationModel from '../models/organization.model.js';

class OrganizationController {
  constructor() { }

  static async getOrganizationsWithProjects(req, res, next) {
    try {
      const organizationsWithProjects = await OrganizationModel.aggregate([
        {
          $lookup: {
            from: 'projects', // Name of the Project collection
            localField: '_id',
            foreignField: 'organizationId',
            as: 'projects'
          }
        }
      ]);

      res.status(200).json({
        message: 'Organizations with projects fetched successfully.',
        data: organizationsWithProjects
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error: ' + error.message
      });
    }
  }

  static async getOrganizationWithProjectsByOrgId(req, res, next) {
    try {
      const orgId = req.params.organizationId;

      if (!orgId) {
        return res.status(400).json({
          message: 'Organization ID is required.'
        });
      }

      const organizationWithProjects = await OrganizationModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(orgId)
          }
        },
        {
          $lookup: {
            from: 'projects',
            localField: '_id',
            foreignField: 'organizationId',
            as: 'projects'
          }
        }
      ]);

      if (organizationWithProjects.length === 0) {
        return res.status(404).json({
          message: 'Organization not found.'
        });
      }

      res.status(200).json({
        message: 'Organization with projects fetched successfully.',
        data: organizationWithProjects[0]
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error: ' + error.message
      });
    }
  }

  //TODO: Only let review if a volunteer has volunteered with an organization.
  static async reviewOrganization(req, res, next) {
    try {
      let organizationId = req.params.orgId;
      let userId = req.headers['userid'];
      const { rating, description } = req.body

      const user = await UserModel.findById(userId);

      if (!user || user.userType !== VOLUNTEER) {
        return res.status(400).json({
          message: 'Restricted, User not found or not enough access.'
        })
      }

      const organization = await OrganizationModel.findById(organizationId);

      if (!organization) {
        return res.status(400).json({
          message: 'Organization not found'
        })
      }


      organization.reviews.push({
        userId,
        rating,
        description
      });

      await organization.save();

      return res.json({
        message: 'Review added.'
      })
    } catch (error) {
      res.status(500).json({
        message: 'Error adding review' + error.message
      })
    }
  }
}

export default OrganizationController;
