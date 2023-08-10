import { Router } from "express";

import OrganizationCtrl from '../controllers/organization.controller.js';

export default class OrganizationRoute {

  constructor() {
    this.router = Router();

    this.router.route("/")
      .get(OrganizationCtrl.getOrganizationsWithProjects);
  }
}
