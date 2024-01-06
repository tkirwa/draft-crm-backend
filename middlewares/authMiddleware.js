// middlewares/authMiddleware.js
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  console.log("Received token:", token);

  if (!token) {
    console.error("Unauthorized: Missing token");
    return res.status(403).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    // Attach the decoded user information to the request for further use
    req.user = user;
    console.log("Token verified. User:", user);
    next();
  });
};

const checkAdminRole = (req, res, next) => {
  const user = req.user;

  console.log("User role:", user.role);

  if (user.role !== "admin") {
    console.log("Insufficient privileges");
    return res
      .status(403)
      .json({ error: "Forbidden: Insufficient privileges" });
  }

  console.log("Admin privileges granted");
  next();
};

module.exports = { authenticateToken, checkAdminRole };
