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
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const router = express.Router();

// Create a new club - only admins can create a club
router.post(
  "/",
  authMiddleware,
  checkAdmin,
  upload.single("image"),
  createClub
);

// Get all clubs (public route)
router.get("/", getAllClubs);

// Get a specific club by its ID (public route)
router.get("/:clubId", getClubById);

// Update a club - only club admin or faculty in charge can update
router.put(
  "/:clubId",
  authMiddleware,
  checkClubAdminOrFaculty,
  upload.single("image"),
  updateClub
);

// Delete a club - only club admin or faculty in charge can delete
router.delete("/:clubId", authMiddleware, checkClubAdminOrFaculty, deleteClub);

export default router;
