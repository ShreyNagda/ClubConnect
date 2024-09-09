import mongoose from "mongoose";
import { category, clubRef, eventRef, userRef } from "../utils/strings";

const clubSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true, default: category },
  established_in: { type: Date, default: new Date().getFullYear() },
  faculty_incharge: { type: mongoose.Schema.ObjectId, ref: userRef },
  core_team: [
    {
      position: String,
      user_id: { type: mongoose.Schema.ObjectId, ref: userRef },
    },
  ],
  events_organized: [{ type: mongoose.Schema.ObjectId, ref: eventRef }],
  end_date: {
    type: Date,
    default: new Date().setFullYear(new Date().getFullYear + 1),
  },
  past_core_teams: [{ type: Map, of: Object, default: {} }],
});

const Club = mongoose.model(clubRef, clubSchema);
export default Club;
