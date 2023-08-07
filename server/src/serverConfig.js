import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";

import Route from './routes/index.js';

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;

export default class ServerConfig {
  constructor(app) {

    this.configureMiddleware(app);
    this.initializeDatabase();

  }

  configureMiddleware(app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/uploads', express.static('uploads'))
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
