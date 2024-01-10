const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        required: true,
        unique: true, // If you want each ticket number to be unique
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved', 'Closed'], // Add more statuses as needed
        default: 'Pending',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
