const Course = require('../Models/course.model');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const userRole =  req.user.role;
    if (userRole!== 'administrator') {
      return res.status(403).json({ message: 'Only administrator can create Course records' });
    }
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('prerequisite', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('prerequisite', 'name');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const userRole =  req.user.role;
    if (userRole!== 'administrator') {
      return res.status(403).json({ message: 'Only administrator can Update Course records' });
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const userRole =  req.user.role;
    if (userRole!== 'administrator') {
      return res.status(403).json({ message: 'Only administrator can Delete Course records' });
    }
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
