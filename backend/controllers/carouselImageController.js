import CarouselImage from "../models/carouselImage.js";
import sharp from "sharp";

// Create a new carousel image with image file upload
export const createCarouselImage = async (req, res) => {
  const { text, url } = req.body;

  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  try {
    // Convert the uploaded image file to a Base64 string
    const imageBuffer = req.file.buffer;
    const compressedImage = await sharp(imageBuffer)
      .resize(800) // Resize to 800px width (change as needed)
      .jpeg({ quality: 70 }) // Compress to 70% quality (adjustable)
      .toBuffer();

    const base64Image = compressedImage.toString("base64");
    // Create the new CarouselImage document
    const newCarouselImage = new CarouselImage({
      image: base64Image,
      text,
      url,
    });

    // Save the image to the database
    const savedImage = await newCarouselImage.save();

    // Respond with the saved image data
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: "Error saving carousel image", error });
  }
};

// Get all carousel images
export const getAllCarouselImages = async (req, res) => {
  try {
    const images = await CarouselImage.find();
    const imagesResponse = images.map((image) => {
      return {
        id: image._id,
        text: image.text,
        url: image.url,
        image: `data:image/jpeg;base64,${image.image}`,
      };
    });
    res.status(200).json(imagesResponse);
  } catch (error) {
    res.status(500).json({ message: "Error fetching carousel images", error });
  }
};

// Get a single carousel image by ID
export const getCarouselImageById = async (req, res) => {
  try {
    const image = await CarouselImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Carousel image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: "Error fetching carousel image", error });
  }
};

// Update a carousel image by ID
export const updateCarouselImage = async (req, res) => {
  const { id } = req.params;
  const { text, url } = req.body;

  try {
    let updatedData = { text, url };
    console.log(updatedData);

    if (req.file) {
      // Convert the updated image file to a Base64 string if a new file is provided
      const imageBase64 = req.file.buffer.toString("base64");
      updatedData.image = imageBase64;
    }

    const updatedImage = await CarouselImage.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Carousel image not found" });
    }
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: "Error updating carousel image", error });
  }
};

// Delete a carousel image by ID
export const deleteCarouselImage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedImage = await CarouselImage.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: "Carousel image not found" });
    }
    res.status(200).json({ message: "Carousel image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting carousel image", error });
  }
};
