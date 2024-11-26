const Enrollment = require('../models/entolment-model');
const User = require('../models/User');
const Course = require('../models/Course');

// Enroll a student in a course
exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId, semesterId } = req.body;

    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Student not found or invalid role' });

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if student is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existingEnrollment) return res.status(400).json({ message: 'Student is already enrolled in this course' });

    // Create and save new enrollment
    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
      semester: semesterId,
    });

    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get enrollments for a student
exports.getEnrollmentsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verify student exists
    const student = await User.findOne({ _id: studentId, role: 'student' });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Get enrollments for the student and populate course and semester details
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
    if (!grades) return res.status(400).json({ message: 'Grades are required' });

    // Update enrollment with new grades
    const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, { grades }, { new: true });
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
