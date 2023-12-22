// routes/complaintRoutes.js

const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const complaintMiddleware = require('../middlewares/complaintMiddleware');

// Create a new complaint
// Create a new complaint
router.post(
    '/complaints',
    complaintMiddleware.validateCreateComplaint,
    complaintController.createComplaint
);

// Get all complaints
router.get('/complaints', complaintController.getAllComplaints);

// Get a single complaint by ID
router.get('/complaints/:id', complaintController.getComplaintById);

// Update a complaint by ID
router.put(
    '/complaints/:id',
    complaintMiddleware.validateUpdateComplaint,
    complaintController.updateComplaint
);
// Delete a complaint by ID
router.delete('/complaints/:id', complaintController.deleteComplaint);

module.exports = router;
