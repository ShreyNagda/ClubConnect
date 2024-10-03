import mongoose from "mongoose";

// Define schema for past core teams
const pastCoreTeamSchema = new mongoose.Schema({
  core_team: {
    type: Map,
    of: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  year: Number,
});

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    established_year: { type: Number, required: true }, // Year the club was established
    type: { type: String, enum: ["club", "society"], default: "club" }, // Club or Society
    events_conducted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    logo: { type: String },
    // Core team as a map of position titles and user references
    core_team: {
      type: Map,
      of: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    // Past core teams with year
    past_core_teams: [pastCoreTeamSchema],
    // Faculty In-charge, only allowed if client_role is 'faculty'
    faculty_incharge: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
          validator: async function (userId) {
            const User = mongoose.model("User");
            const user = await User.findById(userId);
            return user && user.client_role === "faculty"; // Ensure client_role is 'faculty'
          },
          message: 'faculty_incharge must have client_role as "faculty".',
        },
      },
    ],
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Club = mongoose.model("Club", clubSchema);

export default Club;
