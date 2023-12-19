// routes/resetPasswordRoutes.js
const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');
const redisMiddleware = require('../middlewares/redisMiddleware');

router.post(
  '/reset-password',
  redisMiddleware.storeVerificationCode,  // Ensure this middleware is used correctly
  resetPasswordController.initiatePasswordReset
);

router.post(
  '/verify-reset',
  redisMiddleware.getVerificationCode,
  redisMiddleware.getVerificationTimestamp,
  resetPasswordController.verifyAndResetPassword
);

module.exports = router;
