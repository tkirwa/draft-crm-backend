// authRoutes.js
const express = require("express");
const router = express.Router();
const smsController = require("../controllers/smsController");
const {
  validateSendCodeInput,
  validateVerifyCodeInput,
  validateResetPasswordInput,
} = require("../middlewares/smsMiddleware");

router.post("/send-code", validateSendCodeInput, smsController.sendCode);
router.post("/verify-code", validateVerifyCodeInput, smsController.verifyCode);
router.post(
  "/reset-password",
  validateResetPasswordInput,
  smsController.resetPassword
);

module.exports = router;
