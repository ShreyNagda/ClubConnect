import express from "express";
import {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/clubController.js";
import { checkClubAdminOrFaculty } from "../middleware/checkClubAdminOrFaculty.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from "multer";

// Multer configuration for handling image uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store images in memory as buffer
  limits: { fileSize: 50 * 1024 * 1024 }, // Max file size limit (50MB)
});

const router = express.Router();

// Create a new club - only admins can create a club
router.post(
  "/",
  authMiddleware, // User must be logged in
  checkAdmin, // User must be an admin
  upload.single("image"), // Handling image upload (for the club logo)
  createClub // Controller function to create a club
);

// Get all clubs (public route)
router.get("/", getAllClubs);

// Get a specific club by its ID (public route)
router.get("/:clubId", getClubById);

// Update a club - only club admin or faculty in charge can update
router.put(
  "/:clubId",
  authMiddleware, // User must be logged in
  checkClubAdminOrFaculty, // Only club admin or faculty in charge can update
  upload.single("image"), // Handling image upload (for updating club logo)
  updateClub // Controller function to update a club
);

// Delete a club - only club admin or faculty in charge can delete
router.delete(
  "/:clubId",
  authMiddleware, // User must be logged in
  checkClubAdminOrFaculty, // Only club admin or faculty in charge can delete
  deleteClub // Controller function to delete a club
);

export default router;
