// models/rating.js

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    response: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Response',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        // Add any other relevant fields here
    },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
