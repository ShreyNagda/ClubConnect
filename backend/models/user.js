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
  client_role: {
    type: String,
    enum: ["Student", "Faculty", "Admin", "Club Admin"],
    default: "Student",
  }, // Default set to 'student'
  profile_pic: { type: String },
  interests: [{ type: String }],
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  rewards: [rewardSchema],
  club_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: function () {
        // club_id is required if db_role is club_admin or admin, but client_role should not be 'student'
        return this.db_role === "club_admin" || this.client_role === "faculty";
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
