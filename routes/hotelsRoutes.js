const express = require('express');
const router = express.Router();
const hotelsController = require('../controllers/hotelsController');

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Retrieve a list of hotels
 *     responses:
 *       200:
 *         description: A list of hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', hotelsController.getAllHotels);

/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     summary: Retrieve a single hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single hotel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', hotelsController.getHotelById);

// Add similar annotations for POST, PUT, DELETE routes

module.exports = router;
