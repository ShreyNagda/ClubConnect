import mongoose, { Schema } from "mongoose";

const carouselImageSchema = new Schema({
  image: { type: String, required: true },
  text: { type: String, required: true },
  url: { type: String },
});

const CarouselImage = mongoose.model("CarouselImage", carouselImageSchema);
export default CarouselImage;
