import { Router } from "express";
import {
  createCollege,
  getCollegeById,
} from "../controllers/collegeController.js";

const router = Router();

router.post("/", createCollege);
router.get("/:id", getCollegeById); //get college data

export default router;
