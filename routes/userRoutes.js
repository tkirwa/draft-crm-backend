// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, checkIfUsersExist } = require('../middlewares/userMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/', [checkIfUsersExist, authMiddleware.authenticateToken], userController.listAllUsers);
router.get('/users', [checkIfUsersExist, authMiddleware.authenticateToken, authMiddleware.checkAdminRole], userController.listAllUsers);


router.post('/users', validateUser, userController.createUser);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId/edit', userController.editUser);

// user settings - routes
router.get("/users/:userId/settings", userController.getUserSettingsById);
router.put("/:userId/settings", userController.updateUserSettingsById);

module.exports = router;
