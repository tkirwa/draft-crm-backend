// controllers/resetPasswordController.js

const { storeVerificationCode, getVerificationCode, getVerificationTimestamp, clearVerificationCode } = require('../middlewares/redisMiddleware.js');

const redisClient = require('../utils/redisClient');
const africastalking = require('africastalking')({
  apiKey: process.env.AFRICAN_TALKING_API_KEY,
  username: process.env.AFRICAN_TALKING_USERNAME,
});

async function initiatePasswordReset(req, res) {
  const { phone } = req.body;

  const verificationCode = generateVerificationCode();
  await storeVerificationCode(phone, verificationCode);
  sendVerificationCode(phone, verificationCode);

  res.json({ message: 'Verification code sent successfully' });
}

async function verifyAndResetPassword(req, res) {
  const { phone, code, newPassword } = req.body;

  const storedCode = await getVerificationCode(phone);

  if (!storedCode || storedCode !== code) {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  const expirationTime = 5 * 60 * 1000; // 5 minutes
  const storedTimestamp = await getVerificationTimestamp(phone);

  if (!storedTimestamp || Date.now() - storedTimestamp > expirationTime) {
    return res.status(400).json({ error: 'Verification code has expired' });
  }

  resetPassword(phone, newPassword);
  await clearVerificationCode(phone);

  res.json({ message: 'Password reset successfully' });
}

function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function sendVerificationCode(phone, code) {
  const sms = africastalking.SMS;
  const options = {
    // to: [`+${phone}`],  // Add the '+' sign before the phone number
    to: phone,
    message: `Your verification code is: ${code}`,
  };

  sms.send(options)
    .then(response => console.log(response))
    .catch(error => console.error(error));
}

module.exports = {
  initiatePasswordReset,
  verifyAndResetPassword,
};
