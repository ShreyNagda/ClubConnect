import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  postponeEvent, // Import the new postponeEvent function
} from "../controllers/eventController.js";
import { checkAdmin } from "../middleware/checkAdmin.js"; // Admin middleware
import { checkClubAdminOrFaculty } from "../middleware/checkClubAdminOrFaculty.js"; // Club admin or faculty middleware
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new event - accessible by Admin or Club Admin
router.post("/", authMiddleware, checkAdmin, createEvent);

// Get all events (public)
router.get("/", getAllEvents);

// Get a single event by ID (public)
router.get("/:eventId", getEventById);

// Update an event - accessible by Admin or Club Admin
router.put("/:eventId", authMiddleware, checkClubAdminOrFaculty, updateEvent);

// Delete an event - accessible by Admin or Club Admin
router.delete(
  "/:eventId",
  authMiddleware,
  checkClubAdminOrFaculty,
  deleteEvent
);

// Postpone an event - accessible by Club Admins or Faculty Incharges
router.put(
  "/postpone/:eventId",
  authMiddleware,
  checkClubAdminOrFaculty,
  postponeEvent
);

export default router;
