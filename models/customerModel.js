// models/customer.js

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Add additional email validation if needed
    },
    // Add any other relevant fields here
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
