import express from "express";
import { configDotenv } from "dotenv";
import userRouter from "./routes/user.js";

configDotenv();

const app = express();
const port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
