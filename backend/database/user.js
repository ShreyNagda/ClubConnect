import User from "../models/user.js";
import { checkHashedPassword, generateHashPassword } from "../utils/crypt.js";
import jwt from "jsonwebtoken";

export function getAllUsers() {
  console.log("Get all users");
}

export function getUserById() {
  console.log("Get user by id");
}

export async function registerUser(data) {
  if (!data) {
    return { status: 500, message: "Data cannot be null" };
  } else {
    const { name, email, password } = data;
    try {
      //Check if email already in use
      const existingUser = User.findOne({ email });
      if (existingUser) {
      }
      var hashedPassword = await generateHashPassword(data["password"]);
      if (hashedPassword == null) {
        hashedPassword = await generateHashPassword(data["password"]);
      }
      const newUser = User({ ...data, password: hashedPassword });
      await newUser.save();

      return {
        status: 201,
        message: "User registered successfully!",
        id: newUser._id,
      };
    } catch (e) {
      if (e.code == 11000) {
        return { status: 400, message: "Email already exists" };
      } else {
        return { status: 500, message: err.message };
      }
    }
  }
}

export async function loginUser(data) {
  if (data == null) {
    return { status: 500, message: "Data cannot be null" };
  } else {
    const user = await User.findOne({ email: data["email"] });
    // console.log(user);
    if (!user) {
      return { status: 500, message: "User does not exists" };
    } else {
      var isMatch = await checkHashedPassword(data["password"], user.password);
      if (isMatch) {
        //generate jwt token and return with the message
        // const accessToken = await jwt.sign()
        return { status: 200, message: "User login successful" };
      } else {
        return { status: 401, message: "Invalid credentials" };
      }
    }
  }
}
