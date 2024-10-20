export const checkAdmin = (req, res, next) => {
  try {
    const { client_role, db_role } = req.user;

    // Check if user has the role of HOD or is an admin
    if (client_role === "hod" || db_role === "admin") {
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
