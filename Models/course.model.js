const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  credits: { type: Number, required: true },
  prerequisite: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
  },
  teachers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  }],
  students: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
  }],
  semesters: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Semester', 
  }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
