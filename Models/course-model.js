const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    credits: { type: Number, required: true },
    prerequisite: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Reference to another course
  }, { timestamps: true });
  
  module.exports = mongoose.model('Course', courseSchema);
  