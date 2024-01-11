// Load environment variables from .env file
require("dotenv").config();

const credentials = {
  apiKey: process.env.AFRICAN_TALKING_API_KEY,
  username: process.env.AFRICAN_TALKING_USERNAME,
};

const Africastalking = require("africastalking")(credentials);

// Initialize a service e.g. SMS
const sms = Africastalking.SMS;

exports.sendSMS = async (req, res) => {
  try {
    const { smsPhone, smsMessage } = req.body;

    const formattedPhone = `+${smsPhone}`;

    // Send SMS using Africa's Talking
    const response = await sms.send({
      to: [formattedPhone], // Ensure that smsPhone is a string in the format '+2547XXXXXXXX'
      message: smsMessage,
      enqueue: true, // Set to true to enable queuing (optional)
    });

    console.log(response);
    res.json({ sent: 1, message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sent: 0, message: error.message });
  }
};
