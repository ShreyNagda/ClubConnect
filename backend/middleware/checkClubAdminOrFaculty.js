import Club from "../models/club.js";
import User from "../models/user.js";

export const checkClubAdminOrFaculty = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming req.user contains authenticated user details
    const { clubId } = req.params;

    // Fetch the user and the club
    const user = await User.findById(userId);
    const club = await Club.findById(clubId);

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    // Check if user is the faculty in charge
    const isFacultyInCharge =
      club.faculty_incharge && club.faculty_incharge.includes(userId);

    // Check if user is a club_admin with the correct club_id
    const isClubAdmin =
      user.client_role === "club_admin" && user.club_id.equals(clubId);

    const isAdmin = user.client_role === "admin";

    if (isFacultyInCharge || isClubAdmin || isAdmin) {
      // User is either the club admin or the faculty in charge
      return next();
    } else {
      return res.status(403).json({
        message: "Access denied. You are not authorized to modify this club.",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
