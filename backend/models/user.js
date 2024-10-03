import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  points: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  phone: { type: String, unique: true },
  client_role: {
    type: String,
    enum: ["student", "faculty", "hod"],
    default: "student",
  }, // Default set to 'student'
  db_role: {
    type: String,
    enum: ["user", "club_admin", "admin"],
    default: "user",
  }, // Default set to 'user'
  profile: { type: String },
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
  events_attended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  rewards: [rewardSchema],
  club_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: function () {
      // club_id is required if db_role is club_admin or admin, but client_role should not be 'student'
      return this.db_role === "club_admin" || this.client_role === "faculty";
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
