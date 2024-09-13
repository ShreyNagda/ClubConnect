import { Router } from "express";
import User from "../models/user.js";
import { generateHashPassword } from "../utils/crypt.js";
import { transporter } from "../controller/userController.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  // getAllUsers();
  res.send("List of users");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    res.status(422).send({ message: "Missing required fields" });
  }
  try {
    const existingUser = User.findOne({ email });
    if (!existingUser) {
      res.status(409).send({ message: "Email already in use" });
    }
    var hashedPassword = await generateHashPassword(password);
    if (!hashedPassword) {
      hashedPassword = await generateHashPassword(password);
    }
    const user = User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    const verificationToken = user.generateVerificationToken();
    // console.log(transporter.options);
    const url = `http://localhost:5000/users/verify/${verificationToken}`;
    transporter.sendMail(
      {
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Verify Account",
        html: `<div>
        <h1>ClubConnect</h1>
        <h3>Verify Account</h3>
        <p>Click <a href="${url}" style="text-decoration: none">here</a> to confirm your email for ClubConnect.</p>
        </div>`,
      },
      async (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        } else {
          await user.save();
          return res.status(201).send(`Verification mail sent to ${email}`);
        }
      }
    );
  } catch (err) {
    res.status(500).send({ message: "An error occured!" });
  }
});

userRouter.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  const payload = jwt.verify(token, process.env.USER_VERIFICATION_KEY);
  try {
    const user = await User.findOne({ _id: payload.user._id });
    if (!user) {
      res.status(404).send({ message: "User does not exists" });
    }
    user.verified = true;
    await user.save();
    return res.status(200).send({ message: "Account Verified!" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default userRouter;
