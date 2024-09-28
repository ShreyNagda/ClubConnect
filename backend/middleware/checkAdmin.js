export const checkAdmin = (req, res, next) => {
  try {
    const { user_role, db_role } = req.user; // Assuming req.user contains authenticated user details

    // Check if user has the role of HOD or is an admin
    if (user_role === "hod" || db_role === "admin") {
      // User is authorized
      return next();
    } else {
      // User is not authorized
      return res
        .status(403)
        .json({ message: "Access denied. Admin or HOD role required." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
