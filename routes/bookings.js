const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

// Route to get all bookings
router.get('/', isAuthenticated, bookingsController.getAllBookings);

// Route to get a single booking by ID
router.get('/:id', isAuthenticated, bookingsController.getSingleBooking);

// Route to create a new booking
router.post('/', isAuthenticated, validation.bookings, bookingsController.createBooking);

// Route to update a booking by ID
router.put('/:id', isAuthenticated, validation.bookings, bookingsController.updateBooking);

// Route to delete a booking by ID
router.delete('/:id', isAuthenticated, bookingsController.deleteBooking);

module.exports = router;
