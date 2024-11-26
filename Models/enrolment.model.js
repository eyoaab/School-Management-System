const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, 
    semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true }, 
    status: {
      type: String,
      enum: ['enrolled', 'completed', 'dropped'],
      default: 'enrolled',
    },
    grades: {
      midterm: String,
      final: String,
      overall: String,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Enrollment', enrollmentSchema);
  