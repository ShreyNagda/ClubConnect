import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
    });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "User created successfully", token, user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

//Login to a existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user =
      (await User.findOne({ email })) ||
      (await User.findOne({ username: email }));

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // Create JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: false,
        maxAge: 1 * 60 * 60 * 1000,
      });

      res.json({
        message: "Login successful",
        token,
        user,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
