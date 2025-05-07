/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { apiRouter } from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

const dbConnection = async () => {
  let dbCoon = false;

  try {
    while (!dbCoon) {
      dbCoon = true;
      console.log("Connection to db...");
      await mongoose.connect(config.MONGO_URI);
      console.log("Connection is available");
    }
  } catch (e) {
    console.log("Connection is unavailable, wait 3 second");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
};
const start = async () => {
  await dbConnection();
  app.listen(config.PORT, () => {
    console.log(`Server listen on port ${config.PORT}`);
  });
};

start();
