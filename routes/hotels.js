const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const hotelsController = require('../controllers/hotels');
const { isAuthenticated } = require('../middleware/authenticate');

// Retrieve all hotels
router.get('/', hotelsController.getAllHotels);

// Retrieve a single hotel by ID
router.get('/:id', hotelsController.getSingleHotel);

// Create a new hotel (requires authentication)
router.post('/', isAuthenticated, validation.hotel, hotelsController.createHotel);

// Update an existing hotel by ID (requires authentication and validation)
router.put('/:id', isAuthenticated, validation.hotel, hotelsController.updateHotel);

// Delete a hotel by ID (requires authentication)
router.delete('/:id', isAuthenticated, hotelsController.deleteHotel);

module.exports = router;
