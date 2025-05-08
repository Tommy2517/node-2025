/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
  },
);
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});
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
