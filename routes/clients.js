const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const clientsController = require('../controllers/clients.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// Retrieve all clients
router.get('/', clientsController.getAllClients);

// Retrieve a single client by ID
router.get('/:id', clientsController.getSingleClient);

// Create a new client (requires authentication)
router.post('/', isAuthenticated, validation.client, clientsController.createClient);

// Update an existing client by ID (requires authentication and validation)
router.put('/:id', isAuthenticated, validation.client, clientsController.updateClient);

// Delete a client by ID (requires authentication)
router.delete('/:id', isAuthenticated, clientsController.deleteClient);

module.exports = router;
