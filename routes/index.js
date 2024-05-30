const express = require('express');
const router = express.Router();

// Import individual route modules
const hotelsRouter = require('./hotels');
const staffRouter = require('./staff');
const bookingsRouter = require('./bookings');
const clientsRouter = require('./clients');

// Use the imported route modules
router.use('/hotels', hotelsRouter);
router.use('/staff', staffRouter);
router.use('/bookings', bookingsRouter);
router.use('/clients', clientsRouter);

module.exports = router;
