const Attendance = require('../models/attendance.model');
const User = require('../Models/user.model');
const Course = require('../Models/course.model');
const Semester = require('../Models/semister.model');

// Create an attendance record
exports.createAttendance = async (req, res) => {
  try {
    const { studentId, courseId, semesterId, date, status } = req.body;

    // Validate that the student exists
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Validate that the course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Validate that the semester exists
    const semester = await Semester.findById(semesterId);
    if (!semester) return res.status(404).json({ message: 'Semester not found' });

    // Create and save the attendance record
    const attendance = new Attendance({ student: studentId, course: courseId, semester: semesterId, date, status });
    await attendance.save();

    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all attendance records for a specific student
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find attendance records for the student
    const attendances = await Attendance.find({ student: studentId })
      .populate('course', 'name')
      .populate('semester', 'name')
      .populate('student', 'name email');

    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all attendance records for a specific course
exports.getAttendanceByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find attendance records for the course
    const attendances = await Attendance.find({ course: courseId })
      .populate('student', 'name email')
      .populate('semester', 'name');

    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update attendance status
exports.updateAttendanceStatus = async (req, res) => {
  try {
    const { attendanceId, status } = req.body;

    // Validate the attendance record exists
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });

    // Update the attendance status
    attendance.status = status;
    await attendance.save();

    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    // Validate the attendance record exists
    const attendance = await Attendance.findByIdAndDelete(attendanceId);
    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });

    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
