const Course = require('../Models/course.model');
const User = require('../Models/user.model');

// Assign a teacher to a course
exports.assignTeacherToCourse = async (req, res) => {
  try {
    const { teacherId, courseId } = req.body;

    // Verify teacher exists and is of type 'teacher'
    const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found or invalid role' });

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Assign the teacher to the course
    course.teachers.push(teacherId);
    await course.save();

    res.status(200).json({ message: 'Teacher assigned to course', course });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all courses taught by a specific teacher
exports.getCoursesByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Verify teacher exists
    const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    // Find courses where this teacher is assigned
    const courses = await Course.find({ teachers: teacherId });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all teachers for a specific course
exports.getTeachersByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Verify course exists
    const course = await Course.findById(courseId).populate('teachers', '-password');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(course.teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a teacher from a course
exports.removeTeacherFromCourse = async (req, res) => {
  try {
    const { teacherId, courseId } = req.body;

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Remove the teacher from the course's teacher list
    course.teachers = course.teachers.filter((id) => id.toString() !== teacherId);
    await course.save();

    res.status(200).json({ message: 'Teacher removed from course', course });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
