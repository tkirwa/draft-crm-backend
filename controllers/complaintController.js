// controllers/complaintController.js
const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");
const generateTicketNumber = require("../services/generateTicket");
const { sendSMS } = require("./sendSmsController");

// Controller function to create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { subject, description, createdBy } = req.body;

    // Generate a unique ticket number
    const ticketNumber = generateTicketNumber();

    // Create a new complaint instance
    const newComplaint = new Complaint({
      ticketNumber,
      subject,
      description,
      createdBy,
    });

    // Save the complaint to the database
    await newComplaint.save();

    // Retrieve complaint creator using createdBy (User ID)
    const creator = await User.findById(createdBy);

    // Send SMS - verification code
    await sendSMS(
      {
        body: {
          smsPhone: creator.phone,
          smsMessage: `Dear customer, we've received your complaint under ${ticketNumber}. We shall get back to you in a moment. Thank you!`,
        },
      },
    );

    // Log SMS result
    // console.log("SMS Result:", smsResult);

    // Respond with the created complaint
    return res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      complaint: newComplaint,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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
