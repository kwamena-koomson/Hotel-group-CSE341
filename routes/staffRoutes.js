const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Routes for staff
router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getSingleStaff);
router.post('/', staffController.createStaff);
router.put('/:id', staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
