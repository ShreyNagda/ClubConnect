import College from "../models/college.js";

export const createCollege = async (req, res) => {
  const { name, about, banner, established_year, carousel_images, sections } =
    req.body;
  try {
    const newCollege = College({
      name,
      about,
      banner,
      established_year,
      carousel_images,
      sections,
    });
    const college = await newCollege.save();
    res.status(200).json(college);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating college", error: err.message });
  }
};

export const getCollegeById = (req, res) => {
  const id = req.params.id;
  try {
    const college = College.findById(id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.json(college);
  } catch (err) {
    // res.stat
  }
};
