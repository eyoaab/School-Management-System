const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent', 'excused'], required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Attendance', attendanceSchema);
  