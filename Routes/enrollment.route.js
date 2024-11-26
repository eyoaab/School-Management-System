const express = require('express');
const router = express.Router();
const enrollmentController = require('../Controllers/enrollment.controller'); 

// Enroll a student in a course
router.post('/enroll', enrollmentController.enrollStudent);

// Get all enrollments for a student
router.get('/student/:studentId', enrollmentController.getEnrollmentsByStudent);

// Update grades for an enrollment
router.put('/enrollment/:enrollmentId/grades', enrollmentController.updateEnrollmentGrades);

module.exports = router;
