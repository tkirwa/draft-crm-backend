// config/redis.js
const { createClient } = require("redis");

// Load environment variables from .env file
require('dotenv').config();

const client = createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = client;
