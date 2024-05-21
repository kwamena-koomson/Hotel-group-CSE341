const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const clientsController = require('../controllers/clients.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', clientsController.getAllClients);
router.get('/:id', clientsController.getSingleClients);
router.post('/', isAuthenticated, clientsController.createClients);
router.put('/:id',isAuthenticated, validation.clients, clientsController.updateClients);
router.delete('/:id', isAuthenticated, clientsController.deleteClients);

module.exports = router;