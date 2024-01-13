// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateResetPasswordInput } = require("../middlewares/authMiddleware");
const { validateUser, checkIfUsersExist } = require("../middlewares/userMiddleware");

router.post("/login", authController.login);
router.post("/signup", [validateUser], authController.register);
// router.post('/reset-password', validateResetPasswordInput, authController.resetPassword);
router.put('/reset-password', authController.resetPassword);

module.exports = router;
