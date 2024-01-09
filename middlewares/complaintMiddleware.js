// middlewares/complaintMiddleware.js

const { body, validationResult } = require("express-validator");

// Validation middleware for creating a new complaint
exports.validateCreateComplaint = [
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation middleware for updating a complaint
exports.validateUpdateComplaint = [
  body("subject").optional().trim(),
  body("description").optional().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
