// controllers/authController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sendSMS } = require("./smsController");
const generateSixDigitCode = require("../services/generateCode");
const client = require("../config/redis"); // Import the Redis client

// Load environment variables from .env file
require("dotenv").config();

// Set expiration time for verification codes (in seconds)
const VERIFICATION_CODE_EXPIRATION = 300; // 5 minutes

exports.sendCode = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate 6-Digit Code
    const code = generateSixDigitCode();

    // Generate timestamp
    const timestamp = Date.now();

    // Store the code in Redis with a key (user phone number) and set expiration
    await client.connect();
    await client.set(
      phone,
      JSON.stringify({ storedCode: code, timestamp }),
      "EX",
      VERIFICATION_CODE_EXPIRATION
    );
    await client.disconnect();

    // Store the code in the user model
    // user.verificationCode = code;
    user.verified = false;
    await user.save();

    // Send SMS - verification code
    await sendSMS(
      {
        body: {
          smsPhone: phone,
          smsMessage: `Your verification code is ${code}`,
        },
      },
      res
    );
  } catch (error) {
    console.error(error);

    // Log the specific error message when sendSMS encounters an error
    console.error("Error sending SMS:", error.message);

    res
      .status(500)
      .json({ message: "An error occurred while sending the code" });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const { phone, code } = req.body;
    const user = await User.findOne({ phone });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Connect to Redis
    await client.connect();

    // Retrieve the code and timestamp from Redis
    const redisData = await client.get(phone);


    // Disconnect from Redis
    await client.disconnect();

    if (!redisData) {
      // If no data found in Redis, the code might be expired or invalid
      return res.status(400).json({ message: "Code has expired or is invalid" });
    }

    const { storedCode, timestamp } = JSON.parse(redisData);

    console.log(timestamp);

    // Check if the codes match
    if (code === storedCode) {
      const currentTime = Math.floor(new Date().getTime()); // Current time in seconds
      // const currentTime = Date.now();
      console.log(currentTime);

      // Check if the difference between the current time and stored timestamp is within the expiration period
      const difference = Math.floor((currentTime - timestamp) /1000);

      console.log(difference);
      console.log(VERIFICATION_CODE_EXPIRATION);


      if (difference <= VERIFICATION_CODE_EXPIRATION) {
        // Set the verified to true

        user.verified = true;
        // Set the verificationCode field to empty
        user.verificationCode = "";
        await user.save();

        // If the codes match and have not expired, verification is successful
        return res.status(200).json({ message: "Verification successful" });
      } else {
        // If the codes match but have expired, verification failed
        return res.status(400).json({ message: "Code has expired" });
      }
    } else {
      // If the codes do not match, verification failed
      return res.status(400).json({ message: "Invalid code" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during verification" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { phone, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ phone }, { password: hashedPassword });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting the password" });
  }
};