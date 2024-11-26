const User = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

exports.createUser = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole!== 'administrator') {
      return res.status(403).json({ message: 'Only administrators can create users.' });
    }
    const { email, username, password, role } = req.body;

    // Validate the role field
    if (!['student', 'teacher', 'administrator'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided.' });
    }

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email or username already exists.' });
      }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      ...req.body,
      password: hashedPassword, 
    });

    await user.save();
    res.status(201).json({
      user:{id: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
          contact: user.contact,
          address: user.address,
          additionalInfo: user.additionalInfo,},
      message: 'User created successfully!',
      
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole!== 'administrator') {
      return res.status(403).json({ message: 'only administrator can see all Users' });
    }
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found'});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    const tempUser = await User.findById(req.params.id);
    if (!tempUser) return res.status(404).json({ message: 'User not found' });

    if (tempUser.id !== userId || userRole !== 'administrator') return res.status(403).json({message: 'you are not authorized to update this account'});

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.statu(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== 'administrator')return res.status(403).json({message:'You are not allowed to delete a user.Only administrator can delete a user.'});
   
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//Login User
exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password.' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password.' });
      }
  
      // Optional: Generate a token if authentication is successful
      const token = jwt.sign({ 
          id: user._id,
          role: user.role,
      }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
      res.status(200).json({
        message: 'Login successful.',
        user: {
          id: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
          contact: user.contact,
          address: user.address,
          additionalInfo: user.additionalInfo,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };