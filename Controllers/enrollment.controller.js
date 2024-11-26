const Enrollment = require('../models/enrollment-model');
const User = require('../Models/user.model');
const Course = require('../Models/course.model');

// Enroll a student in a course
exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId, semesterId } = req.body;

    // Check if all required fields are provided
    if (!studentId || !courseId || !semesterId) {
      return res.status(400).json({ message: 'Missing required fields: studentId, courseId, semesterId' });
    }

    // Validate student existence and role
    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found or invalid role' });
    }

    // Verify if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the student is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Student is already enrolled in this course' });
    }

    // Create new enrollment record
    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
      semester: semesterId,
    });

    // Save enrollment to the database
    await enrollment.save();
    res.status(201).json({
      message: 'Student enrolled successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get enrollments for a student
exports.getEnrollmentsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verify student exists and is a student
    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get enrollments for the student with populated course and semester details
    const enrollments = await Enrollment.find({ student: studentId })
      .populate('course', 'name description credits')
      .populate('semester', 'name startDate endDate');
    
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update enrollment grades
exports.updateEnrollmentGrades = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { grades } = req.body;

    // Ensure grades are provided
    if (!grades) {
      return res.status(400).json({ message: 'Grades are required' });
    }

    // Find and update the enrollment with new grades
    const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, { grades }, { new: true });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json({
      message: 'Enrollment updated successfully',
      enrollment,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
