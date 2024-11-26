const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");

const connectDB = require("./Configurations/db-config");
const authMiddleWare = require('./Middlewares/auth-middleware');

// Routes
const userRoute = require('./Routes/user.route');
const courseRoute = require('./Routes/course.route');
const attendanceRoute = require('./Routes/attendance.route');
const teacherCourseRoute = require('./Routes/teacher.course.route');
const enrollmentRoute = require('./Routes/enrollment.route');
const semesterRoute = require('./Routes/semister.route');

const app = express();
app.use(express.json());
dotEnv.config();
  
  app.use(cors());
  connectDB();

  // Define the routes
  app.use('/api/users',userRoute);
  app.use('/api/courses', authMiddleWare,courseRoute);
  app.use('/api/attendances', authMiddleWare,attendanceRoute);
  app.use('/api/teacher-courses',authMiddleWare, teacherCourseRoute);
  app.use('/api/enrollments',authMiddleWare, enrollmentRoute);
  app.use('/api/semesters', authMiddleWare,semesterRoute);

module.exports = app;
