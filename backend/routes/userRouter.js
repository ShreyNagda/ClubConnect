import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  attendEvent,
  joinClub,
  loginUser,
} from "../controllers/userController.js";

import {
  registerForEvent,
  markAttendance,
  getRegisteredUsers,
} from "../controllers/eventController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

// CRUD Routes
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

// Password change
router.put("/:id/change-password", authMiddleware, changePassword);

// Event attendance and registration
router.post("/:id/attend-event", authMiddleware, attendEvent);

// Register for an event (generates QR code)
router.post("/register-for-event", authMiddleware, registerForEvent);

// Mark attendance for event (via QR code scan)
router.post("/mark-attendance", authMiddleware, markAttendance);

// Get users registered for an event
router.get(
  "/event/:eventId/registered-users",
  authMiddleware,
  getRegisteredUsers
);

// Club joining
router.post("/:id/join-club", authMiddleware, joinClub);

export default router;
