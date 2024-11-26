const mongoose = require('mongoose');

const teacherCourseSchema = new mongoose.Schema({
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher ID
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Course ID
    semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true }, // Semester ID
  }, { timestamps: true });
  
  module.exports = mongoose.model('TeacherCourse', teacherCourseSchema);
  