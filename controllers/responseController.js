const Response = require('../models/responseModel');

// Create a new response
async function addResponse(req, res) {
    try {
        const { complaintId, content } = req.body;
        const responder = req.user.id; // Assuming you have authentication middleware to get user information

        const response = new Response({
            complaintId,
            responder,
            content,
        });

        await response.save();

        res.json(response);
    } catch (error) {
        console.error('Error adding response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Edit an existing response
async function editResponse(req, res) {
    try {
        const { responseId } = req.params;
        const { content } = req.body;

        const response = await Response.findByIdAndUpdate(responseId, { content }, { new: true });

        if (!response) {
            return res.status(404).json({ error: 'Response not found' });
        }

        res.json(response);
    } catch (error) {
        console.error('Error editing response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a response
async function deleteResponse(req, res) {
    try {
        const { responseId } = req.params;

        const response = await Response.findByIdAndDelete(responseId);

        if (!response) {
            return res.status(404).json({ error: 'Response not found' });
        }

        res.json({ message: 'Response deleted successfully' });
    } catch (error) {
        console.error('Error deleting response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Fetch all responses
async function getAllResponses(req, res) {
    try {
        const responses = await Response.find();
        res.json(responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    addResponse,
    editResponse,
    deleteResponse,
    getAllResponses,
};
