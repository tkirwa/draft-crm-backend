const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");

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

  // Exclude phone validation for updating user details
  (req, res, next) => {
    if (req.method === "PUT") {
      return next(); // Skip phone validation for updating user details
    }

    // Validate phone (for user creation)
    check("phone")
      .not()
      .isEmpty()
      .withMessage("phone (as username) is required")
      .isLength({ min: 10 })
      .withMessage("Phone must have at least 10 digits")
      .custom(async (value) => {
        // Check if the phone number already exists in the database
        const user = await User.findOne({ phone: value });
        if (user) {
          throw new Error("Phone number is already in use");
        }
        return true;
      })(req, res, next);
  },

  // Validate password
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Validate role
  check("role").isIn(["user", "admin"]).withMessage("Role is invalid"),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

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
