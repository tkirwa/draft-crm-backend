// utils/redisClient.js
const redis = require('redis');
const client = redis.createClient();

// Export the client
module.exports = client;
