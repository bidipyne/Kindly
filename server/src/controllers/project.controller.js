import mongoose from 'mongoose';

import UserModel from '../models/user.model.js';
import ProjectModel from '../models/project.model.js';
import { ORGANIZATION } from '../config/constants.js';

class ProjectController {
  constructor() { }

  static async getProjects(req, res, next) {
    try {
      const projects = await ProjectModel.find();

      return res.json({
        message: 'Project list.',
        data: projects
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error: ' + error.message
      });
    }
  }

  static async addProject(req, res, next) {
    try {

      const userId = req.headers['userid']; // let it act as JWT.
      const profileImage = req.file?.path;
      const { title, details, startDate, endDate, status, location, contactInfo, lookingFor } = req.body;

      if (!userId) {
        return res.status(400).json({
          message: 'Authentication failed. No token in headers.'
        });
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(400).json({
          message: 'User not found.'
        });
      }

      if (user.userType !== ORGANIZATION) {
        return res.status(400).json({
          message: 'Access Restricted. User is not an organization.'
        });
      }

      const project = new ProjectModel({
        title,
        details,
        startDate,
        endDate,
        status,
        location,
        contactInfo,
        lookingFor,
        profileImage,
        organizationId: userId
      });

      await project.save();

      res.status(201).send({
        message: 'Project added.',
        data: project
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error: ' + error
      });
    }
  }

  static async getProject(req, res, next) {
    try {
      let projectId = req.params.id;

      const project = await ProjectModel.findById(projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.json({
        message: 'Project found.',
        data: project
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error: ' + error.message
      });
    }
  }

  static async updateFields(item, fieldsToUpdate) {
    for (const key in fieldsToUpdate) {
      if (fieldsToUpdate[key] !== undefined) {
        item[key] = fieldsToUpdate[key];
      }
    }
    await item.save({ validateBeforeSave: false });
  }

  static async updateProject(req, res, next) {
    try {
      const projectId = req.params.id;
      const { title, details, startDate, endDate, status, location, contactInfo, lookingFor } = req.body;
      const profileImage = req.file?.path;

      const project = await ProjectModel.findById(projectId);

      if (!project) {
        return res.status(404).json({
          message: 'Project not found.'
        });
      }

      const fieldsToUpdate = {
        title, details, startDate, endDate, status, location, contactInfo, lookingFor, profileImage
      };

      await ProjectController.updateFields(project, fieldsToUpdate);

      res.status(200).json({
        message: 'Project updated.',
        data: project
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server Error: ' + error.message
      });
    }
  }



  static async deleteProject(req, res, next) {
    try {
      const { id } = req.params;

      const deletedProject = await ProjectModel.findByIdAndDelete(id);

      if (deletedProject) {
        return res.json({
          message: 'Project deleted successfully.'
        });
      } else {
        return res.status(400).json({
          message: 'Project not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Server Error: ' + error.message
      });
    }
  }
}

export default ProjectController;
