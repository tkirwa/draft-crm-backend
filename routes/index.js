const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const UserController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to Clarek CRM' });
});

// router.get('/protected-route', authMiddleware.authenticateToken, UserController.protectedRoute);

module.exports = router;