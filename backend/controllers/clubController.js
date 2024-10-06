import sharp from "sharp";
import Club from "../models/club.js";
import multer from "multer";

// Multer setup for file handling
const storage = multer.memoryStorage(); // Store files in memory as buffer
export const upload = multer({ storage });

// Create a new club
export const createClub = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, established_year, type, faculty_incharge } =
      req.body;
    let file = req.file; // Retrieve the uploaded file from multer

    let base64Image;
    if (file) {
      const imageBuffer = file.buffer;
      const compressedImage = await sharp(imageBuffer)
        .resize(800) // Resize to 800px width (change as needed)
        .jpeg({ quality: 70 }) // Compress to 70% quality (adjustable)
        .toBuffer();

      base64Image = compressedImage.toString("base64"); // Convert to base64 string
    }

    const newClub = new Club({
      name,
      description,
      established_year,
      type: type || "club",
      faculty_incharge,
      logo: base64Image ? `data:image/jpeg;base64,${base64Image}` : undefined, // Save as base64
    });

    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating club", error: error.message });
  }
};

// Get all clubs
export const getAllClubs = async (req, res) => {
  try {
    if (req.query) {
      console.log(req.query);
    }
    const clubs = await Club.find(req.query)
      .populate("faculty_incharge")
      .populate("events_conducted");
    res.json(clubs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching clubs", error: error.message });
  }
};

// Get a single club by ID
export const getClubById = async (req, res) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findById(clubId)
      .populate("faculty_incharge")
      .populate("events_conducted");
    console.log(club);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.json(club);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching club", error: error.message });
  }
};

// Update a club
export const updateClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { name, description, established_year, type, faculty_incharge } =
      req.body;
    let file = req.file; // Retrieve the uploaded file from multer

    let base64Image;
    if (file) {
      const imageBuffer = file.buffer;
      const compressedImage = await sharp(imageBuffer)
        .resize(800) // Resize to 800px width (change as needed)
        .jpeg({ quality: 70 }) // Compress to 70% quality (adjustable)
        .toBuffer();

      base64Image = compressedImage.toString("base64"); // Convert to base64 string
    }

    const updatedClub = await Club.findByIdAndUpdate(
      clubId,
      {
        name,
        description,
        established_year,
        type,
        faculty_incharge,
        logo: base64Image,
      },
      { new: true }
    );

    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.json(updatedClub);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating club", error: error.message });
  }
};

// Delete a club
export const deleteClub = async (req, res) => {
  try {
    const { clubId } = req.params;

    const deletedClub = await Club.findByIdAndDelete(clubId);

    if (!deletedClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.json({ message: "Club deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting club", error: error.message });
  }
};
