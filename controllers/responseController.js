const Response = require("../models/responseModel");
const Complaint = require("../models/complaintModel");


// Controller function to add a response to a complaint
const addResponse = async (req, res) => {
  try {
    const { complaintId, responder, content } = req.body;

    // Check if the complaint exists
    const existingComplaint = await Complaint.findById(complaintId);
    if (!existingComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Create a new response instance
    const newResponse = new Response({
      complaintId,
      responder,
      content,
    });

    // Save the response to the database
    await newResponse.save();

    // Update the complaint status to "Resolved"
    await Complaint.findByIdAndUpdate(complaintId, {
      $set: { status: "Resolved" },
    });

    // Respond with the added response
    res.status(201).json({
      success: true,
      message: "Response added successfully",
      response: newResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// Edit an existing response
async function editResponse(req, res) {
  try {
    const { responseId } = req.params;
    const { content } = req.body;

    const response = await Response.findByIdAndUpdate(
      responseId,
      { content },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ error: "Response not found" });
    }

    res.json(response);
  } catch (error) {
    console.error("Error editing response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a response
async function deleteResponse(req, res) {
  try {
    const { responseId } = req.params;

    const response = await Response.findByIdAndDelete(responseId);

    if (!response) {
      return res.status(404).json({ error: "Response not found" });
    }

    res.json({ message: "Response deleted successfully" });
  } catch (error) {
    console.error("Error deleting response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Fetch all responses
async function getAllResponses(req, res) {
  try {
    const responses = await Response.find();
    res.json(responses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// Fetch a response by ID
async function getResponseById(req, res) {
  try {
    const { responseId } = req.params;

    const response = await Response.findById(responseId);

    if (!response) {
      return res.status(404).json({ error: "Response not found" });
    }

    res.json(response);
  } catch (error) {
    console.error("Error fetching response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  addResponse,
  getResponseById,
  editResponse,
  deleteResponse,
  getAllResponses,
};
