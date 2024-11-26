const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['student', 'teacher', 'administrator'],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  contact: String,
  address: String,
  additionalInfo: {
    gradeLevel: String, 
    department: String,
    position: String, 
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
