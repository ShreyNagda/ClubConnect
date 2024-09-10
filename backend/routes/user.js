import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
} from "../database/user.js";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  getAllUsers();
  res.send("List of users");
});

userRouter.post("/register", async (req, res) => {
  const result = await registerUser(req.body);
  res.send(result);
});

userRouter.post("/login", async (req, res) => {
  const result = await loginUser(req.body);
  res.send(result);
});

userRouter.get("/:id", (req, res) => {
  getUserById();
  res.send("Get user by id");
});

export default userRouter;
