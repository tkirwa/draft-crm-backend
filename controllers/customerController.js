// controllers/customerController.js

const Customer = require('../models/customerModel');

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newCustomer = new Customer({ name, email });
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
