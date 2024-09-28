import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import clubRouter from "./routes/clubRouter.js";
import eventRouter from "./routes/eventRouter.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();
const PORT = process.env.port || 3000;

await mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database Connected!");
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter); // For user-related routes
app.use("/api/users", userRouter); // For user-related routes
app.use("/api/clubs", clubRouter); // For club-related routes
app.use("/api/events", eventRouter); // For event-related routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
