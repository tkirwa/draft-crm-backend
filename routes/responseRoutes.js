const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');
const authMiddleware = require('../middlewares/authMiddleware'); // Add your authentication middleware

// Add a new response
router.post('/responses', authMiddleware.authenticateToken, responseController.addResponse);

// Edit an existing response
router.put('/responses/:responseId', authMiddleware.authenticateToken, responseController.editResponse);

// Delete a response
router.delete('/responses/:responseId', authMiddleware.authenticateToken, responseController.deleteResponse);

// Fetch all responses
router.get('/responses', responseController.getAllResponses);

module.exports = router;
