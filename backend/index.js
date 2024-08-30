import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";

configDotenv();

const app = express();
const port = process.env.port || 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/users", userRouter);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
