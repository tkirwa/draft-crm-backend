// controllers/ratingController.js

const Rating = require('../models/ratingModel');

// Create a new rating
exports.createRating = async (req, res) => {
    try {
        const { customer, rating, comment } = req.body;
        const newRating = new Rating({ customer, rating, comment });
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all ratings
exports.getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get ratings by customer ID
exports.getRatingsByCustomer = async (req, res) => {
    try {
        const ratings = await Rating.find({ customer: req.params.customerId });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single rating by ID
exports.getRatingById = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id);
        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a rating by ID
exports.updateRating = async (req, res) => {
    try {
        const updatedRating = await Rating.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a rating by ID
exports.deleteRating = async (req, res) => {
    try {
        const deletedRating = await Rating.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
