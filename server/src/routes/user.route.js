import { Router } from "express";

import UserCtrl from '../controllers/user.controller.js';

export default class UserRoute {

  constructor() {
    this.router = Router();

    this.router.route("/")
      .get(UserCtrl.getUsers)
      .post(UserCtrl.addUser);

    this.router.route("/:id")
      .get(UserCtrl.getUser)
      .put(UserCtrl.updateUser)
      .delete(UserCtrl.deleteUser);
  }
}
