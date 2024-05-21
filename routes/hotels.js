const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const hotelsController = require('../controllers/hotels');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', hotelsController.getAllHotels);
router.get('/:id', hotelsController.getSingleHotels);
router.post('/',isAuthenticated, hotelsController.createHotels);
router.put('/:id',isAuthenticated, hotelsController.updateHotels);
router.delete('/:id',isAuthenticated, hotelsController.deleteHotels);

module.exports = router;