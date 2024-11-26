const connectDB = require("./Configurations/db-config");
const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");

const userRoute = require('./Routes/user.route');
const courseRoute = require('./Routes/course.route');
const attendanceRoute = require('./Routes/attendance.route');
const teacherCourseRoute = require('./Routes/teacher.course.route');
const enrollmentRoute = require('./Routes/enrollment.route');
const semesterRoute = require('./Routes/semister.route');

const app = express();
app.use(express.json());
dotEnv.config();

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));

  // Define the routes
  app.use('/api/users', userRoute);
  app.use('/api/courses', courseRoute);
  app.use('/api/attendances', attendanceRoute);
  app.use('/api/teacher-courses', teacherCourseRoute);
  app.use('/api/enrollments', enrollmentRoute);
  app.use('/api/semesters', semesterRoute);

const PORT = process.env.PORT || 5000;
