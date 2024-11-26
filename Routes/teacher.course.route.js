const express = require('express');
const router = express.Router()

const teacherCourseController = require('../Controllers/teacher.course.controller');

// Assugn a teacher to a course
router.post('/create',teacherCourseController.assignTeacherToCourse);

// Get all courses tought by a specific teacher
router.get('/getCourseByTeacher/:teacherId',teacherCourseController.getCoursesByTeacher);

// Get all teachers for a specific course
router.get('/getTeacherByCourse/:courseId',teacherCourseController.getTeachersByCourse);

// Remove a teacher from a course
router.delete('/removeTeacherFromCourse', teacherCourseController.removeTeacherFromCourse);

module.exports = router;