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

// Validation middleware for sending SMS
exports.validateSendSmsInput = [
  body("smsPhone")
    .trim()
    .notEmpty()
    .isMobilePhone()
    .withMessage("Please enter a valid phone number"),
  body("smsMessage")
    .trim()
    .notEmpty()
    .withMessage("Type your message"),
  // ... other validations
];
