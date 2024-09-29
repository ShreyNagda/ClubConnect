import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String },
  image: { type: String },
});

const collegeSchema = Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: "slug",
    },
    about: { type: String },
    banner: { type: String },
    established_year: { type: Number, required: true },
    carousel_images: [{ type: String, default: "" }],
    sections: [sectionSchema],
  },
  { timestamps: true }
);

collegeSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = "";
    const nameList = this.name.toLowerCase().split(" ");
    if (nameList.length >= 5) {
      nameList.forEach((element) => {
        this.slug += element[0];
      });
    } else {
      this.slug = nameList.join("-");
    }
    console.log(this.slug);
  }
  next();
});

const College = mongoose.model("College", collegeSchema);
export default College;
