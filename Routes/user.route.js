const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const authMiddleWare = require('../Middlewares/auth-middleware');


// Create a new user
router.post('/create', userController.createUser);

// Get all users
router.get('/', authMiddleWare,userController.getAllUsers);

// Get a user by ID
router.get('/:id',userController.getUserById);

// Update a user by ID
router.put('/:id', authMiddleWare,userController.updateUser);

// Delete a user by ID
router.delete('/:id',authMiddleWare, userController.deleteUser);
    
// Login a user
router.post('/login',userController.loginUser);

// Get Teachers
router.get('/teachers', authMiddleWare, userController.getAllTeachers);

// Get Students
router.get('/', authMiddleWare, userController.getAllStudents);

module.exports = router;
