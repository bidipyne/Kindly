import express from "express";

import ServerConfig from "./src/serverConfig.js";
import { PORT, HOST } from './src/config/constants.js';

const app = express();

new ServerConfig(app);

app.listen(PORT, function (err) {
  if (err) {
    return console.error("Error connecting express server: ", err);
  }

  console.log(`Express server running on: ${HOST}:${PORT}`);
});
