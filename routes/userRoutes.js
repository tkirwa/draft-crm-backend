// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, checkIfUsersExist } = require('../middlewares/userMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/', [checkIfUsersExist, authMiddleware.authenticateToken], userController.listAllUsers);
router.get('/', [checkIfUsersExist, authMiddleware.authenticateToken, authMiddleware.checkAdminRole], userController.listAllUsers);


router.post('/create', validateUser, userController.createUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId/edit', userController.editUser);

// user settings - routes
router.get("/:userId/settings", userController.getUserSettingsById);
router.put("/:userId/settings", userController.updateUserSettingsById);

module.exports = router;