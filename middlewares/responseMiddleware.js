const { body, validationResult } = require('express-validator');
const Complaint = require('../models/complaintModel');


// Middleware to validate the request body when adding a response
exports.validateAddResponse = [
  body('complaintId').isMongoId().withMessage('Invalid Complaint ID'),
  body('responder').isMongoId().withMessage('Invalid Responder ID'),
  body('content').isString().notEmpty().withMessage('Content is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

// Handle updating the complaint status
exports.updateComplaintStatus = async (req, res, next) => {
  try {
    const { complaintId } = req.params;

    // Update the complaint status to "Resolved"
    await Complaint.findByIdAndUpdate(complaintId, { $set: { status: 'Resolved' } });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
