const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const clientsController = require('../controllers/clients.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', clientsController.getAllClient);
router.get('/:id', clientsController.getSingleClient);
router.post('/', isAuthenticated, clientsController.createClient);
router.put('/:id',isAuthenticated, validation.clients, clientsController.updateClient);
router.delete('/:id', isAuthenticated, clientsController.deleteClient);

module.exports = router;