// middlewares/redisMiddleware.js
const redisClient = require('../utils/redisClient');

async function storeVerificationCode(req, res, next) {
  try {
    const { phone, verificationCode } = req.body;

    // Check if the client is still connected
    if (!redisClient.connected) {
      // Re-establish the connection or handle accordingly
      // Example: redisClient.connect(); (Check your Redis client library documentation)
    }

    // Your logic to store verification code in Redis
    await redisClient.set(phone, verificationCode, 'EX', 5 * 60);

    next();
  } catch (error) {
    console.error('Error in storeVerificationCode middleware:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getVerificationCode(req, res, next) {
  const { phone } = req.body;

  try {
    const storedCode = await redisClient.get(phone);
    req.storedCode = storedCode;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getVerificationTimestamp(req, res, next) {
  const { phone } = req.body;

  try {
    const storedTimestamp = await redisClient.ttl(phone);
    req.storedTimestamp = 5 * 60 - storedTimestamp;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function clearVerificationCode(req, res, next) {
  const { phone } = req.body;

  try {
    await redisClient.del(phone);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  storeVerificationCode,
  getVerificationCode,
  getVerificationTimestamp,
  clearVerificationCode,
};
