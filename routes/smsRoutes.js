// authRoutes.js
const express = require("express");
const router = express.Router();
const smsController = require("../controllers/smsController");
const {
  validateSendCodeInput,
  validateVerifyCodeInput,
  validateSendSmsInput,
} = require("../middlewares/smsMiddleware");
const sendSmsController = require("../controllers/sendSmsController");

router.post("/send-sms", validateSendSmsInput, sendSmsController.sendSMS);
router.post("/send-code", validateSendCodeInput, smsController.sendCode);
router.post("/verify-code", validateVerifyCodeInput, smsController.verifyCode);

module.exports = router;
