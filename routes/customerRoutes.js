// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Create a new customer
router.post('/customers', customerController.createCustomer);

// Get all customers
router.get('/customers', customerController.getAllCustomers);

// Get a single customer by ID
router.get('/customers/:id', customerController.getCustomerById);

// Update a customer by ID
router.put('/customers/:id', customerController.updateCustomer);

// Delete a customer by ID
router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;
