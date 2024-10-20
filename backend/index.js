import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import clubRouter from "./routes/clubRouter.js";
import eventRouter from "./routes/eventRouter.js";
import authRouter from "./routes/authRouter.js";
import carouselImageRouter from "./routes/carouselImageRouter.js";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();
const PORT = process.env.port || 3000;

await mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.json("Server Running");
});

app.use(
  cors(
    // {
    //   origin: process.env.FRONTEND_URL,
    //   credentials: true,
    // },
    {
      origin: "http://localhost:5173",
      credentials: true,
    }
  )
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/auth", authRouter); // For user-related routes
app.use("/api/users", userRouter); // For user-related routes
app.use("/api/clubs", clubRouter); // For club-related routes
app.use("/api/events", eventRouter); // For event-related routes
app.use("/api/carousel", carouselImageRouter); // For event-related routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
