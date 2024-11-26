const express = require('express');
const router = express.Router();

const semisterController = require('../Controllers/semister.controller');

// Create a new semester
router.post('/create', semisterController.createSemester);

// Get all semesters
router.get('/', semisterController.getAllSemesters);

// Get a semester by ID
router.get('/:id', semisterController.getSemesterById);

// Update a semester
router.put('/:id', semisterController.updateSemester);

// Delete a semester
router.delete('/:id', semisterController.deleteSemester);

module.exports = router;
