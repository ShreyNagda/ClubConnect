import mongoose from "mongoose";
import { clubRef, eventRef, status, userRef } from "../utils/strings.js";

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, //title + year + parts (if any) makes it unique
  club_id: [{ type: mongoose.Schema.ObjectId, ref: clubRef }],
  event_incharge: [{ type: mongoose.Schema.ObjectId, ref: userRef }],
  description: { type: String }, //use html-to-react library to parse it in frontend.
  status: { type: String, default: status, required: true },
  participants: [{ type: mongoose.Schema.ObjectId, ref: userRef }],
  poster: { type: String, required: true }, //store the url of the storage we use to upload all the files
  photos: [{ type: String, required: true, default: "" }],
  total_attendance: { type: Number, default: 0 },
  comments: [{ type: Map, of: String, default: {} }],
});

const Event = mongoose.model(eventRef, eventSchema);
export default Event;
