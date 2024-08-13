import { Router } from "express";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("List of users");
});

userRouter.post("/", (req, res) => {
  // Handle user creation
  res.send("Register new user");
});

userRouter.get("/:id", (req, res) => {
  // Handle fetching a specific user
});
export default userRouter;
