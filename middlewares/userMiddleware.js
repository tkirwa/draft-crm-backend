const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");

// Validate user details
exports.validateUser = [
  // Validate first name
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),

  // Validate last name
  check("lastName")
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),

  // Validate email
  check("email").isEmail().withMessage("Email is invalid"),

  // Validate phone
  check("phone")
    .not()
    .isEmpty()
    .withMessage("Phone (as username) is required")
    .isLength({ min: 10 })
    .withMessage("Phone must have at least 10 digits")
    .custom(async (value, { req }) => {
      // Check if the phone number already exists in the database
      const user = await User.findOne({ phone: value });
      if (user) {
        throw new Error("Phone number is already in use");
      }
    }),

  // Validate password
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Middleware to check if users exist
exports.checkIfUsersExist = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Attach the users to the request object for further processing in the controller
    req.users = users;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
