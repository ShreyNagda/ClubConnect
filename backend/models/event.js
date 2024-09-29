import mongoose from "mongoose";

// Define the Event schema
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      get: function (value) {
        // Format the date to dd/mm/yyyy - hh:mm
        if (value) {
          const day = String(value.getDate()).padStart(2, "0");
          const month = String(value.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
          const year = value.getFullYear();
          const hours = String(value.getHours()).padStart(2, "0");
          const minutes = String(value.getMinutes()).padStart(2, "0");
          return `${day}/${month}/${year} - ${hours}:${minutes}`;
        }
        return null;
      },
      set: function (value) {
        // Parse the date from dd/mm/yyyy - hh:mm format
        const [datePart, timePart] = value.split(" - ");
        const [day, month, year] = datePart.split("/").map(Number);
        const [hours, minutes] = timePart.split(":").map(Number);
        return new Date(year, month - 1, day, hours, minutes); // Month is zero-indexed
      },
    },
    media: {
      // Field for storing media (photos and videos)
      type: [String], // Array of URLs or file paths
      required: false,
    },
    attendance: {
      // Field to track attendance
      type: Number,
      default: 0,
    },
    status: {
      // Field for event status
      type: String,
      enum: ["upcoming", "ended"],
      default: "upcoming",
    },
    club: {
      // Reference to the club conducting the event
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    description: {
      type: String,
    },
  },
  { toJSON: { getters: true }, toObject: { getters: true }, timestamps: true }
); // Enable getters for toJSON and toObject
eventSchema.pre("save", function (next) {
  const currentDate = new Date();
  if (this.date < currentDate) {
    this.status = "ended";
  } else {
    this.status = "upcoming";
  }
  next();
});

// Create the Event model
const Event = mongoose.model("Event", eventSchema);

export default Event;
