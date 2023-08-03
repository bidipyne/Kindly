import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";

import Route from './routes/index.js';
import { MONGO_DB_URL } from './config/constants.js';

export default class ServerConfig {
  constructor(app) {

    this.configureMiddleware(app);
    this.initializeDatabase();

  }

  configureMiddleware(app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    new Route(app);
  }

  async initializeDatabase() {
    try {
      await mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true });

      console.info('Connected to mongo database ✅');
    } catch (error) {
      console.error("Error connecting database: ", error);
    }
  }
}