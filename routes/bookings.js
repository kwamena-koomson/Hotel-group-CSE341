const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const bookingsController = require('../controllers/bookings.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', bookingsController.getAllBookings);
router.get('/:id', bookingsController.getSingleBookings);
router.post('/', isAuthenticated, bookingsController.createBookings);
router.put('/:id',isAuthenticated, validation.bookings, bookingsController.updateBookings);
router.delete('/:id', isAuthenticated, bookingsController.deleteBookings);

module.exports = router;