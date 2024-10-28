import { Router } from "express";
import {
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
  attendEvent,
  joinClub,
  getAllUsers,
  makeClubAdmin,
} from "../controllers/userController.js";

import {
  registerForEvent,
  markAttendance,
  getRegisteredUsers,
} from "../controllers/eventController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

// CRUD Routes
router.get("/:token", authMiddleware, getUserById);
router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, upload.single("image"), updateUser);
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
router.post("/:token/join-club", authMiddleware, joinClub);

// Admin makes a  user a club admin
router.post("/:token/make-admin", authMiddleware, checkAdmin, makeClubAdmin);

export default router;
