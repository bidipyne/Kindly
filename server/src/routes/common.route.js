import { Router } from "express";

import upload from '../utils/upload.js';
import CommonCtrl from '../controllers/common.controller.js';

export default class CommonRoute {

  constructor() {
    this.router = Router();

    this.router.route("/upload").patch(upload.single("profileImage"), CommonCtrl.uploadImage)
  }
}
