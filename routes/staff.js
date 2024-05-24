const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

// Route to get all staff members
router.get('/', isAuthenticated, staffController.getAllStaff);

// Route to get a single staff member by ID
router.get('/:id', isAuthenticated, staffController.getSingleStaff);

// Route to create a new staff member
router.post('/', isAuthenticated, validation.staff, staffController.createStaff);

// Route to update a staff member by ID
router.put('/:id', isAuthenticated, validation.staff, staffController.updateStaff);

// Route to delete a staff member by ID
router.delete('/:id', isAuthenticated, staffController.deleteStaff);

module.exports = router;
