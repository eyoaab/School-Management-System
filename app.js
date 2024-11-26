const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./Configurations/db-config");
const authMiddleware = require('./Middlewares/auth-middleware');

// Routes
const userRoute = require('./Routes/user.route');
const courseRoute = require('./Routes/course.route');
const attendanceRoute = require('./Routes/attendance.route');
const teacherCourseRoute = require('./Routes/teacher.course.route');
const enrollmentRoute = require('./Routes/enrollment.route');
const semesterRoute = require('./Routes/semister.route');

// Initialize app and load environment variables
dotenv.config();
const app = express();

if (!process.env.PORT || !process.env.MONGO_URI) {
  console.error("Error: Missing required environment variables.");
  process.exit(1);
}

connectDB();

// Middlewares
app.use(express.json()); 
app.use(cors()); 

// Routes
app.use('/users', userRoute);
app.use(authMiddleware); 
app.use('/courses', courseRoute);
app.use('/attendances', attendanceRoute);
app.use('/teacher-courses', teacherCourseRoute);
app.use('/enrollments', enrollmentRoute);
app.use('/semesters', semesterRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

module.exports = app;
