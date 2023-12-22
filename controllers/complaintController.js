// controllers/complaintController.js

const Complaint = require('../models/complaintModel');

// Create a new complaint
exports.createComplaint = async (req, res) => {
    try {
        const { subject, description, createdBy } = req.body;

        // Get the user ID from the request (assuming it's included in the token)
        // const createdBy = req.user._id;

        const newComplaint = new Complaint({ subject, description, createdBy });
        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single complaint by ID
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a complaint by ID
exports.updateComplaint = async (req, res) => {
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a complaint by ID
exports.deleteComplaint = async (req, res) => {
    try {
        const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedComplaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
