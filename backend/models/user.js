import mongoose from "mongoose";
import { clubRef, db_role, user_role, userRef } from "../utils/strings.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  db_role: { type: String, required: true, default: db_role },
  user_role: { type: String, required: true, default: user_role },
  clubs: [{ type: mongoose.Schema.ObjectId, ref: clubRef }],
  tokens: { type: Number, default: 0 },
  is_active: { type: Boolean, required: true, default: false },
  is_subscribed: { type: Boolean, required: true, default: false },
});

const User = mongoose.model(userRef, userSchema);
export default User;
