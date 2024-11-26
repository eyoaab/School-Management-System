const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
dotEnv.config();
  
  app.use(cors());
  connectDB();

  // Define the routes
  app.use('/users',userRoute);
  app.use('/courses', authMiddleWare,courseRoute);
  app.use('/attendances', authMiddleWare,attendanceRoute);
  app.use('/teacher-courses',authMiddleWare, teacherCourseRoute);
  app.use('/enrollments',authMiddleWare, enrollmentRoute);
  app.use('/semesters', authMiddleWare,semesterRoute);

module.exports = app;
