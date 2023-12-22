const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    complaintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint', // Reference to the Complaint model
        required: true,
    },
    responder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
