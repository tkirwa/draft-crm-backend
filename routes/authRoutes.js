const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUser } = require('../middlewares/userMiddleware');

router.post('/auth/login', authController.login);
router.post('/auth/signup', validateUser, authController.register);

module.exports = router;
