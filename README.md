# School Management System
A feature-rich school management system built with **Node.js** and **MongoDB**. This app provides functionalities for managing users, courses, semesters, enrollments, attendance, and teacher-course assignments, allowing seamless interaction with a well-structured **RESTful API**.
## Features

### **User Features**
1. **Sign Up User**: Create a new user account (student, teacher, or admin).
2. **Login User**: Authenticate an existing user.
3. **Update User**: Edit user profile information (name, email, contact, etc.).
4. **Delete User**: Permanently remove a user account.
5. **Get All Users**: Retrieve a list of all registered users (admin only).
6. **Get Specific User**: Fetch details of a single user by their unique ID.

### **Course Features**
1.  **Create Course**: Create a new course with attributes such as course name, description, and credits.
2.  **Update Course**: Modify an existing course's information, such as description and prerequisite courses.
3.  **Delete Course**: Remove a course from the system.
4.  **Get All Courses**: Retrieve a list of all courses in the system.
5.  **Get Specific Course**: Fetch detailed information about a specific course by its ID.

### **Teacher to Course Mapping***
1.  **Assign Teacher to Course**: Link a teacher to a course in a specific semester.
2.  **Update Teacher to Course Mapping**: Modify teacher assignments to courses as needed.
3.  **Remove Teacher from Course**: Unassign a teacher from a course.
4.  **Get all Mappings**: Get all Mapping(only for admin)
5.  **Get single Mappings**: To get single mapping.
  
### **Semester Features**
1.  **Create Semester**: Create a new semester with a name, start date, end date, and associated courses.
2.  **Update Semester**: Modify semester details such as the start and end dates or the courses offered.
3.  **Delete Semester**: Delete a semester with a spasfic courses.
4.  **Get All Semesters**: Retrieve a list of all semesters.
5.  **Get Specific Semester**: Fetch detailed information of a specific semester by its ID.

### **Enrollment Feature**
1.  **Enroll Student in Course**: Register a student for a specific course in a particular semester.
2.  **Update Enrollment Status**: Modify a student's enrollment status (e.g., enrolled, completed, or dropped).
3.  **Add Grades to Enrollment**: Assign grades (midterm, final, overall) to students enrolled in a course.
4.  **Get Enrollment Details**: Retrieve detailed enrollment information for a student and course.

### **Attendance Features**
1.  **Record Attendance**: Mark attendance for students in a specific course and semester.
2.  **Update Attendance**: Modify a student's attendance record (e.g., from absent to present).
3.  **Get All Attendance**: Fetch attendance records for a student or a specific course.
4.  **Get Single Attendance**: Feach attenndance using a single id.
---

## Tech Stack

- **Backend**: Node.js (Express.js)
- **Database**: MongoDB (Mongoose)
- **API Format**: RESTful API
- **Authentication**: JSON Web Tokens (JWT)

---

  ## Installation
  
  1. Clone the repository:
  ```bash
  git clone https://github.com/eyoaab/School-Management-System
  cd School-Management-System
  ```
  2. Install dependencies:
  ```bash
  
  npm instal
  
  ```
  3.Set up environment variables:
  - Create a .env file in the root directory.
  - Add the following variable
  ```bash
  PORT=3000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  
  ```
  4.start the server
  ```bash
  
  npm start
  
  ```
## Folder Structure
```bash
School Management System/
├── controllers/        # API logic for users and blogs
├── models/             # Mongoose schemas
├── routes/             # Route handlers for the API
├── middleware/         # Custom middleware (e.g., auth)
├── config/             # Configuration files (e.g., database connection)
├── .env                # Environment variables
├── app.js              # Configuration with middlewares
├── server.js           # Main application entry point
├── package.json        # Dependencies and scripts

```
---

## Using the Deployed Backend

If you prefer to use the already deployed version of the backend, follow these steps:

1. **Base URL**:  
🔗 Use the deployed API base URL for all requests: => https://school-management-system-5qcl.onrender.com
2. **Authentication**:  
- Most endpoints require authentication. Ensure you obtain a valid JSON Web Token (JWT) by logging in via the `/users/login` endpoint.
- Include the token in the `Authorization` header for subsequent requests:
  ```json
  {
    "Authorization": "Bearer your_token_here"
  }
  ```

3. **Available Endpoints**:  
---

## **User Endpoints**
| Method | Endpoint                  | Description                              |
|--------|---------------------------|------------------------------------------|
| POST   | `/users/register`         | Sign up a new user(student,teacher,admin)|
| POST   | `/users/login`            | Log in an existing user                  |
| GET    | `/users`                  | Retrieve all users (admin only)          |
| GET    | `/users/:id`              | Retrieve details of a specific user      |
| PUT    | `/users/:id`              | Update a user's information              |
| DELETE | `/users/:id`              | Delete a user's account                  |

---

## **Course Endpoints**
| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| POST   | `/courses`            | Create a new course                         |
| GET    | `/courses`            | Retrieve all courses                        |
| GET    | `/courses/:id`        | Retrieve details of a specific course       |
| PUT    | `/courses/:id`        | Update a course                             |
| DELETE | `/courses/:id`        | Delete a course                             |

---

## **Teacher to Course Mapping Endpoints**
| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| POST   | `/teacher-courses`    | Assign a teacher to a course            |
| PUT   | `/teacher-courses/:id`    | Update a Assignment          |
| DELETE   | `/teacher-courses/:id`    | delete spasfic assignment            |
| GET   | `/teacher-courses`    | Get all assigments           |
| GET   | `/teacher-courses/:id`    | Get speasfic assigments           |



---

## **Semester Endpoints**
| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| POST   | `/semesters`          | Create a new semester                       |
| GET    | `/semesters`          | Retrieve all semesters                      |
| GET    | `/semesters/:id`      | Retrieve details of a specific semester     |
| PUT    | `/semesters/:id`      | Update a semester                           |
| DELETE | `/semesters/:id`      | Delete a semester                           |

---

## **Enrollment Endpoints**
| Method | Endpoint                  | Description                             |
|--------|---------------------------|--------------------------------------------------------|
| POST   | `/enrollments`        | Enroll a student in a course            |
| GET    | `/enrollments/student/:studentId` | Get all enrollments for a specific student |
| GET    | `/enrollments/course/:courseId` | Get all enrollments for a specific course |
| GET    | `/enrollments/semester/:semesterId` | Get all enrollments for a specific semester |
| PUT    | `/enrollments/:id`    | Update enrollment status                |
| DELETE | `/enrollments/:id`    | Delete an enrollment                    |

---

## **Attendance Endpoints**
| Method | Endpoint                  | Description                             |
|--------|---------------------------|-----------------------------------------|
| POST   | `/attendances`        | Mark attendance for a student in a course |
| GET    | `/attendances/student/:studentId` | Get all attendance records for a specific student |
| GET    | `/attendances/course/:courseId` | Get all attendance records for a specific course |
| GET    | `/attendances/semester/:semesterId` | Get all attendance records for a specific semester |

---

4. **Testing the API**:  
- Use tools like **Postman**, **cURL**, or any API testing tool to interact with the backend.  
- For example, to fetch all blogs:  
  ```bash
  curl -X GET https://bloging-app-backend.onrender.com/
  ```

5. **Error Handling**:  
- If an error occurs, the response will include a status code and a descriptive message. For example:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```

---

This section is for users who want to interact with the backend without setting it up locally.

   
