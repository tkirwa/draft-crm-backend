const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUser } = require('../middlewares/userMiddleware');

router.post('/login', authController.login);
router.post('/signup', validateUser, authController.register);

module.exports = router;
