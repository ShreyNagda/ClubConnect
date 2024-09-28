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

const router = express.Router();

// Create a new club - accessible only by authorized users
router.post("/", authMiddleware, checkAdmin, createClub);

// Get all clubs (public)
router.get("/", getAllClubs);

// Get a single club by ID (public)
router.get("/:clubId", getClubById);

// Update a club - accessible only by authorized users
router.put("/:clubId", authMiddleware, checkClubAdminOrFaculty, updateClub);

// Delete a club - accessible only by authorized users
router.delete("/:clubId", authMiddleware, checkClubAdminOrFaculty, deleteClub);

export default router;
