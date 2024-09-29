import jwt from "jsonwebtoken";

const verifyTokenForPost = (req, res, next) => {
  // Only verify token for POST requests
  if (req.method !== "GET") {
    const token = req.cookies.token; // Get token from cookies

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded; // Attach the decoded token (user data) to the req object
      next(); // Continue with the request if token is valid
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    // If it's not a POST request, just move on to the next middleware
    next();
  }
};

export default verifyTokenForPost;
