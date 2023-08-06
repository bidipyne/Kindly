import { Router } from "express";

import upload from '../utils/upload.js';
import ProjectCtrl from '../controllers/project.controller.js';

export default class ProjectRoute {

  constructor() {
    this.router = Router();

    this.router.route("/")
      .get(ProjectCtrl.getProjects)
      .post(upload.single('profileImage'), ProjectCtrl.addProject);

    this.router.route("/:id")
      .get(ProjectCtrl.getProject)
      .put(upload.single('profileImage'), ProjectCtrl.updateProject)
      .delete(ProjectCtrl.deleteProject);
  }
}
