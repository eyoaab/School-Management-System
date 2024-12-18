const Semester = require('../Models/semister.model');

// Create a new semester
exports.createSemester = async (req, res) => {
  try {
    const userRole =  req.user.role;
    if (userRole!== 'administrator') {
      return res.status(403).json({ message: 'Only administrator can create semester records' });
    }
    const semester = new Semester(req.body);
    await semester.save();
    res.status(201).json(semester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all semesters
exports.getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a semester by ID
exports.getSemesterById = async (req, res) => {
  try {
    const semisterId = req.params.id;
    if(!semisterId) return res.status(400).json({message: "Please select a right semisrt"});
    const semester = await Semester.findById(req.params.id).populate('coursesOffered', 'name credits');
    if (!semester) return res.status(404).json({ message: 'Semester not found' });
    res.status(200).json(semester);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a semester
exports.updateSemester = async (req, res) => {
  try {
    const userRole =  req.user.role;
    if (userRole!== 'administrator') {
      return res.status(403).json({ message: 'Only administrator can Update semester records' });
    }
    const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!semester) return res.status(404).json({ message: 'Semester not found' });
    res.status(200).json(semester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a semester
exports.deleteSemester = async (req, res) => {
  try {
    const userRole =  req.user.role;
    if (userRole!== 'administrator') {
      return res.status(403).json({ message: 'Only administrator can Delete semester records' });
    }
    const semester = await Semester.findByIdAndDelete(req.params.id);
    if (!semester) return res.status(404).json({ message: 'Semester not found' });
    res.status(200).json({ message: 'Semester deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
