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

const validateResetPasswordInput = async (req, res, next) => {

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Please enter a valid phone number'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Please enter a password'),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  // Custom middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // next();
  }
};

module.exports = { authenticateToken, checkAdminRole, validateResetPasswordInput };
