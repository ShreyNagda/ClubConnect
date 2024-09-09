import { Router } from "express";
import { createNewUser, getAllUsers, getUserById } from "../database/user";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  getAllUsers();
  res.send("List of users");
});

userRouter.post("/", (req, res) => {
  // Handle user creation
  createNewUser();
  res.send("Register new user");
});

userRouter.get("/:id", (req, res) => {
  // Handle fetching a specific user
  getUserById();
  res.send("Get user by id");
});

export default userRouter;
