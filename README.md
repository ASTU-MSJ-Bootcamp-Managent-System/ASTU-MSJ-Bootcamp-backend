http://localhost:5000;


@adminToken = YOUR_ADMIN_JWT_TOKEN
@mentorToken = YOUR_MENTOR_JWT_TOKEN
@studentToken = YOUR_STUDENT_JWT_TOKEN

# Resource IDs
@batchId = YOUR_BATCH_ID
@mentorId = YOUR_MENTOR_ID
@studentId = YOUR_STUDENT_ID
@assignmentId = YOUR_ASSIGNMENT_ID
@submissionId = YOUR_SUBMISSION_ID
@attendanceId = YOUR_ATTENDANCE_ID
@progressId = YOUR_PROGRESS_ID
@announcementId = YOUR_ANNOUNCEMENT_ID

#Admin Login
POST http://localhost:5000/admin/auth/login
Content-Type: application/json


{
  "email": "admin@astu.edu.et",
  "password": "AdminSecretPassword123!"
}


Student / Mentor Login

POST http://localhost:5000/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "Password123!"
}

#Student Registration

POST http://localhost:5000/auth/register
Content-Type: application/json

{
  "name": "Showcase Student",
  "email": "showcase.student@example.com",
  "password": "Password123!"
}

### 3.1 Admin Creates Mentor

POST http://localhost:5000/api/users
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "name": "Showcase Mentor",
  "email": "showcase.mentor@example.com",
  "password": "Password123!",
  "role": "MENTOR"
}

### 3.2 Admin Gets User

GET {{baseUrl}}/users/{{studentId}}
Authorization: Bearer {{adminToken}}


# 3.3 Admin Changes User Role

PATCH http://localhost/users/{{studentId}}/role
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "role": "MENTOR"
}


### 4.2 Attach Mentor
POST http://localhost:5000/api/batches/{{batchId}}/mentors
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "mentorId": "{{mentorId}}"
}


### 5.1 Record Attendance
POST http://localhost:5000/api/attendance
Authorization: Bearer {{mentorToken}}
Content-Type: application/json

{
  "studentId": "{{studentId}}",
  "batchId": "{{batchId}}",
  "date": "2026-08-23T00:00:00.000Z",
  "status": "PRESENT",
  "note": "Participated actively"
  
  
  
  
# 4.3 Enroll Student
 
POST http://localhost:5000/api/batches/{{batchId}}/enroll-student
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "studentId": "{{studentId}}"
}


# 4.4 Assign Student to Mentor

POST http://localhost:5000/api/batches/{{batchId}}/students/{{studentId}}/assign-mentor
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "mentorId": "{{mentorId}}"
  
  
  
# 5.2 Update Attendance

PATCH http://localhost:5000/api/attendance/{{attendanceId}}
Authorization: Bearer {{mentorToken}}
Content-Type: application/json

{
  "status": "LATE",
  "note": "Arrived late"
  
  
  
  
  
  
  
  
  
  
  
  ### 4.3 Enroll Student
#
# PURPOSE:
#   Adds a student to the selected batch.
#
# AUTH:
#   ADMIN
#
# EXPECTED:
#   200 OK / 201 Created
#
POST http://localhost:5000/api/batches/{{batchId}}/enroll-student
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "studentId": "{{studentId}}"
}


### 4.4 Assign Student to Mentor

POST http://localhost:5000/api/batches/{{batchId}}/students/{{studentId}}/assign-mentor
Authorization: Bearer {{adminToken}}
Content-Type: application/json

{
  "mentorId": "{{mentorId}}"
}


### 4.5 Mentor Views Assigned Students

GET http://localhost:5000/api/batches/{{batchId}}/mentors/{{mentorId}}/students
Authorization: Bearer {{mentorToken}}


### 5.2 Update Attendance
#
# PURPOSE:
#   Updates an existing attendance record.
#
# AUTH:
#   MENTOR
#
# EXPECTED:
#   200 OK
#
PATCH http://localhost:5000/api/attendance/{{attendanceId}}
Authorization: Bearer {{mentorToken}}
Content-Type: application/json

{
  "status": "LATE",
  "note": "Arrived late"
}


### 5.3 Attendance Percentage
#
# PURPOSE:
#   Gets the student's attendance percentage.
#
# AUTH:
#   MENTOR
#
# EXPECTED:
#   200 OK
#
GET http://localhost:5000/api/attendance/percentage?studentId={{studentId}}&batchId={{batchId}}
Authorization: Bearer {{mentorToken}}


### 6.1 Record Student Progress

 http://localhost:5000/api/progress
Authorization: Bearer {{mentorToken}}
Content-Type: application/json

{
  "studentId": "{{studentId}}",
  "batchId": "{{batchId}}",
  "topic": "NODEJS",
  "status": "IN_PROGRESS",
  "notes": "Working on backend fundamentals"
}


### 6.2 Update Student Progress

PATCH http://localhost:5000/api/progress/{{progressId}}
Authorization: Bearer {{mentorToken}}
Content-Type: application/json

{
  "status": "COMPLETED",
  "notes": "Successfully completed evaluation"
}


### 7.1 Create Assignment

POST http://localhost:5000/api/assignments
Authorization: Bearer {{mentorToken}}
Content-Type: application/json

{
  "title": "REST API Architecture",
  "description": "Build a secure REST API",
  "instructions": "Implement authentication and RBAC",
  "batchId": "{{batchId}}",
  "deadline": "2026-09-15T23:59:59.000Z",
  "maximumScore": 100
}


### 7.2 Student Submits Assignment

POST http://localhost:5000/api/submissions
Authorization: Bearer {{studentToken}}
Content-Type: application/json

{
  "assignmentId": "{{assignmentId}}",
  "githubUrl": "https://github.com/student/backend-project",
  "liveDemoUrl": "https://example.com",
  "notes": "Completed the assignment"
}


### 7.3 Mentor Grades Submission

#
PATCH http://localhost:5000/api/submissions/{{submissionId}}
Authorization: Bearer {{mentorToken}}
Content-Type: application/json

{
  "score": 95,
  "feedback": "Excellent implementation and clean architecture.",
  "status": "GRADED"
}


### 8.1 Create Announcement

POST http://localhost:5000/api/announcements
Authorization: Bearer {{AdminToken}}
Content-Type: application/json

{
  "title": "Project Showcase Reminder",
  "content": "Prepare your final project presentation.",
  "targetAudience": "STUDENTS",
  "batchId": "{{batchId}}"
}


### 9.1 Admin Dashboard

GET http://localhost:5000/api/dashboard/admin
Authorization: Bearer {{adminToken}}


### 9.2 Mentor Dashboard

GET http://localhost:5000/api/dashboard/mentor
Authorization: Bearer {{mentorToken}}


### 9.3 Student Dashboard

GET http://localhost:5000/api/dashboard/student
Authorization: Bearer {{studentToken}}


### 10.1 Security Test — No Token

GET http://localhost:5000/api/users/me


### 10.2 Security Test — Student Cannot Create Batch
POST http://localhost:5000/api/batches
Authorization: Bearer {{studentToken}}
Content-Type: application/json

{
  "name": "Unauthorized Batch"
}


### 10.3 Security Test — Student Cannot Grade

PATCH http://localhost:5000/api/submissions/{{submissionId}}
Authorization: Bearer {{studentToken}}
Content-Type: application/json

{
  "score": 100,
  "feedback": "Unauthorized attempt",
  "status": "GRADED"
}
