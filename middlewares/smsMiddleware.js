// middlewares/authMiddleware.js
const { body, validationResult } = require("express-validator");

// Validation middleware for sending a verification code
exports.validateSendCodeInput = [
  body("phone")
    .trim()
    .notEmpty()
    .isMobilePhone()
    .withMessage("Please enter a valid phone number"),
  // ... other validations
];

// Validation middleware for verifying a code
exports.validateVerifyCodeInput = [
  body("phone")
    .trim()
    .notEmpty()
    .isMobilePhone()
    .withMessage("Please enter a valid phone number"),
  body("verificationCode")
    .trim()
    .notEmpty()
    .withMessage("Please enter a verification code"),
  // ... other validations
];

// Validation middleware for resetting a password
exports.validateResetPasswordInput = [
  body("phone")
    .trim()
    .notEmpty()
    .isMobilePhone()
    .withMessage("Please enter a valid phone number"),
  body("verificationCode")
    .trim()
    .notEmpty()
    .withMessage("Please enter a verification code"),
  body("password").trim().notEmpty().withMessage("Please enter a password"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  // ... other validations
];
