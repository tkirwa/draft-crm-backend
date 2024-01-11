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
        to: [formattedPhone],
        message: smsMessage,
        enqueue: true,
      });
  
      console.log(response);
      // res.json({ sent: 1, message: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ sent: 0, message: error.message });
    }
  };
  
