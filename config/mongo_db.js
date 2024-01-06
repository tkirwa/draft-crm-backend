// config/mongo_db.js
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("MongoDB connected now...");
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectMongoDB;
