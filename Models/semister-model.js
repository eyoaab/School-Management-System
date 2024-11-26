const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    coursesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // List of courses in the semester
  }, { timestamps: true });
  
  module.exports = mongoose.model('Semester', semesterSchema);
  