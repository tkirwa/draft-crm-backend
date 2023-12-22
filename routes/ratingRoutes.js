// routes/ratingRoutes.js

const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Create a new rating
router.post('/ratings', ratingController.createRating);

// Get all ratings
router.get('/ratings', ratingController.getAllRatings);

// Get ratings by customer ID
router.get('/ratings/customer/:customerId', ratingController.getRatingsByCustomer);

// Get a single rating by ID
router.get('/ratings/:id', ratingController.getRatingById);

// Update a rating by ID
router.put('/ratings/:id', ratingController.updateRating);

// Delete a rating by ID
router.delete('/ratings/:id', ratingController.deleteRating);

module.exports = router;
