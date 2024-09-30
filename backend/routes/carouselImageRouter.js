import express from "express";
import multer from "multer";
import {
  createCarouselImage,
  getAllCarouselImages,
  getCarouselImageById,
  updateCarouselImage,
  deleteCarouselImage,
} from "../controllers/carouselImageController.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

// Set up multer for handling file uploads (in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

const router = express.Router();

// GET all carousel images
router.get("/", getAllCarouselImages);

// GET a single carousel image by ID
router.get("/:id", getCarouselImageById);

// POST a new carousel image (with image file upload)
router.post("/", checkAdmin, upload.single("image"), createCarouselImage);

// PUT update a carousel image by ID (with optional image file upload)
router.put("/:id", upload.single("image"), updateCarouselImage);

// DELETE a carousel image by ID
router.delete("/:id", deleteCarouselImage);

export default router;
