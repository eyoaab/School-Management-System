const express = require('express');
const router = express.Router();
const attendanceController = require('../Controllers/attendance.controller'); 

// Create an attendance record
router.post('/create', attendanceController.createAttendance);

// Get all attendance records for a specific student
router.get('/student/:studentId', attendanceController.getAttendanceByStudent);

// Get all attendance records for a specific course
router.get('/course/:courseId', attendanceController.getAttendanceByCourse);

// Update attendance status
router.put('/status', attendanceController.updateAttendanceStatus);

// Delete an attendance record
router.delete('/:attendanceId', attendanceController.deleteAttendance);

module.exports = router;
