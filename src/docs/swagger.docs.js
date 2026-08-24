/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a student
 *     description: Public registration. Self-registration only allows the STUDENT role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Student
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *               role:
 *                 type: string
 *                 enum: [STUDENT]
 *                 example: STUDENT
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login
 *     description: Login as a student, mentor, or administrator.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/reset-password/request:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Request password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *     responses:
 *       200:
 *         description: Password reset request processed
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/auth/reset-password/confirm:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Confirm password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: RESET_TOKEN
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123!
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired reset token
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Change current user's password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123!
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/* ============================================================
   USERS
   ============================================================ */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current profile
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update current user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Student
 *               email:
 *                 type: string
 *                 format: email
 *                 example: updated@example.com
 *               phone:
 *                 type: string
 *                 example: +251911223344
 *               bio:
 *                 type: string
 *                 example: Full Stack Developer
 *               avatarUrl:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/avatar.jpg
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       400:
 *         description: Invalid user ID
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Change user role
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MENTOR, STUDENT]
 *                 example: MENTOR
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid user ID
 *       403:
 *         description: Forbidden
 */

/* ============================================================
   BATCHES
   ============================================================ */

/**
 * @swagger
 * /api/batches:
 *   get:
 *     tags:
 *       - Batches
 *     summary: Get all batches
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Batches retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/batches:
 *   post:
 *     tags:
 *       - Batches
 *     summary: Create batch
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: Full Stack Cohort 2026
 *               description:
 *                 type: string
 *                 example: ASTU Full Stack Development Bootcamp
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-01T00:00:00.000Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-12-01T00:00:00.000Z
 *     responses:
 *       201:
 *         description: Batch created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/batches/{id}:
 *   get:
 *     tags:
 *       - Batches
 *     summary: Get batch by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Batch retrieved successfully
 *       400:
 *         description: Invalid batch ID
 */

/**
 * @swagger
 * /api/batches/{id}:
 *   patch:
 *     tags:
 *       - Batches
 *     summary: Update batch
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Batch updated successfully
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/batches/{id}:
 *   delete:
 *     tags:
 *       - Batches
 *     summary: Delete batch
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Batch deleted successfully
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/batches/{id}/mentors:
 *   post:
 *     tags:
 *       - Batches
 *     summary: Attach mentor to batch
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mentorId
 *             properties:
 *               mentorId:
 *                 type: string
 *                 example: 65f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Mentor attached successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/batches/{id}/mentors/{mentorId}:
 *   delete:
 *     tags:
 *       - Batches
 *     summary: Detach mentor from batch
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: mentorId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mentor detached successfully
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/batches/{id}/students:
 *   post:
 *     tags:
 *       - Batches
 *     summary: Enroll student into batch
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: 65f1a2b3c4d5e6f7a8b9c0d2
 *     responses:
 *       200:
 *         description: Student enrolled successfully
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/batches/{id}/students/{studentId}:
 *   delete:
 *     tags:
 *       - Batches
 *     summary: Remove student from batch
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student removed successfully
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/batches/{id}/students/{studentId}/assign-mentor:
 *   post:
 *     tags:
 *       - Batches
 *     summary: Assign mentor to student
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mentorId
 *             properties:
 *               mentorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mentor assigned successfully
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/batches/mentor-students:
 *   get:
 *     tags:
 *       - Batches
 *     summary: Get mentor student roster
 *     description: Returns students assigned to the authenticated mentor.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mentor roster retrieved successfully
 *       403:
 *         description: Mentor role required
 */

/* ============================================================
   ATTENDANCE
   ============================================================ */

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     tags:
 *       - Attendance
 *     summary: Record attendance
 *     description: Mentor only.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student
 *               - batch
 *               - date
 *               - status
 *             properties:
 *               student:
 *                 type: string
 *               batch:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [PRESENT, ABSENT, LATE, EXCUSED]
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attendance recorded successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/attendance/{id}:
 *   patch:
 *     tags:
 *       - Attendance
 *     summary: Update attendance
 *     description: Mentor only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PRESENT, ABSENT, LATE, EXCUSED]
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/attendance/batch/{batchId}:
 *   get:
 *     tags:
 *       - Attendance
 *     summary: Get attendance by batch
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: batchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance records retrieved
 */

/**
 * @swagger
 * /api/attendance/batch/{batchId}/student/{studentId}/percentage:
 *   get:
 *     tags:
 *       - Attendance
 *     summary: Get student attendance percentage
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: batchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance percentage calculated
 */

/* ============================================================
   PROGRESS
   ============================================================ */

/**
 * @swagger
 * /api/progress:
 *   post:
 *     tags:
 *       - Progress
 *     summary: Record student progress
 *     description: Mentor only.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student
 *               - batch
 *               - topic
 *             properties:
 *               student:
 *                 type: string
 *               batch:
 *                 type: string
 *               topic:
 *                 type: string
 *                 enum: [HTML_CSS, JAVASCRIPT, REACT, NODEJS, EXPRESSJS, MONGODB, GIT_GITHUB]
 *               status:
 *                 type: string
 *                 enum: [NOT_STARTED, IN_PROGRESS, COMPLETED, NEEDS_IMPROVEMENT]
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Progress recorded successfully
 */

/**
 * @swagger
 * /api/progress/batch/{batchId}:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get progress by batch
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: batchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Progress retrieved successfully
 */

/**
 * @swagger
 * /api/progress/batch/{batchId}/student/{studentId}:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get student progress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: batchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: studentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student progress retrieved
 */

/**
 * @swagger
 * /api/progress/{id}:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get progress by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Progress retrieved successfully
 */

/**
 * @swagger
 * /api/progress/{id}:
 *   patch:
 *     tags:
 *       - Progress
 *     summary: Update progress
 *     description: Mentor only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [NOT_STARTED, IN_PROGRESS, COMPLETED, NEEDS_IMPROVEMENT]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Progress updated successfully
 */

/**
 * @swagger
 * /api/progress/{id}:
 *   delete:
 *     tags:
 *       - Progress
 *     summary: Delete progress
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Progress deleted successfully
 *       403:
 *         description: Forbidden
 */

/* ============================================================
   ASSIGNMENTS
   ============================================================ */

/**
 * @swagger
 * /api/assignments:
 *   post:
 *     tags:
 *       - Assignments
 *     summary: Create assignment
 *     description: Mentor or Admin.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - batch
 *               - deadline
 *               - maximumScore
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               instructions:
 *                 type: string
 *               batch:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               maximumScore:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Assignment created successfully
 */

/**
 * @swagger
 * /api/assignments/batch/{batchId}:
 *   get:
 *     tags:
 *       - Assignments
 *     summary: Get assignments by batch
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: batchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignments retrieved successfully
 */

/**
 * @swagger
 * /api/assignments/{id}:
 *   get:
 *     tags:
 *       - Assignments
 *     summary: Get assignment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment retrieved successfully
 */

/**
 * @swagger
 * /api/assignments/{id}:
 *   patch:
 *     tags:
 *       - Assignments
 *     summary: Update assignment
 *     description: Mentor or Admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               instructions:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               maximumScore:
 *                 type: number
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 */

/**
 * @swagger
 * /api/assignments/{id}:
 *   delete:
 *     tags:
 *       - Assignments
 *     summary: Delete assignment
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 */

/* ============================================================
   SUBMISSIONS
   ============================================================ */

/**
 * @swagger
 * /api/submissions:
 *   post:
 *     tags:
 *       - Submissions
 *     summary: Submit assignment
 *     description: Student only.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assignment
 *               - githubUrl
 *             properties:
 *               assignment:
 *                 type: string
 *               githubUrl:
 *                 type: string
 *                 format: uri
 *               liveDemoUrl:
 *                 type: string
 *                 format: uri
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Submission created successfully
 */

/**
 * @swagger
 * /api/submissions/my:
 *   get:
 *     tags:
 *       - Submissions
 *     summary: Get current student's submissions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student submissions retrieved
 */

/**
 * @swagger
 * /api/submissions/assignment/{assignmentId}:
 *   get:
 *     tags:
 *       - Submissions
 *     summary: Get submissions for an assignment
 *     description: Mentor or Admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: assignmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submissions retrieved successfully
 */

/**
 * @swagger
 * /api/submissions/{id}:
 *   get:
 *     tags:
 *       - Submissions
 *     summary: Get submission by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission retrieved successfully
 */

/**
 * @swagger
 * /api/submissions/{id}/grade:
 *   patch:
 *     tags:
 *       - Submissions
 *     summary: Grade submission
 *     description: Mentor only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - score
 *             properties:
 *               score:
 *                 type: number
 *                 minimum: 0
 *                 example: 95
 *               feedback:
 *                 type: string
 *                 example: Excellent implementation.
 *     responses:
 *       200:
 *         description: Submission graded successfully
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/submissions/{id}/resubmit:
 *   patch:
 *     tags:
 *       - Submissions
 *     summary: Resubmit assignment
 *     description: Student only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - githubUrl
 *             properties:
 *               githubUrl:
 *                 type: string
 *                 format: uri
 *               liveDemoUrl:
 *                 type: string
 *                 format: uri
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Submission resubmitted successfully
 */

/**
 * @swagger
 * /api/submissions/{id}/request-resubmission:
 *   patch:
 *     tags:
 *       - Submissions
 *     summary: Request submission resubmission
 *     description: Mentor only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resubmission requested successfully
 */

/* ============================================================
   ANNOUNCEMENTS
   ============================================================ */

/**
 * @swagger
 * /api/announcements:
 *   post:
 *     tags:
 *       - Announcements
 *     summary: Create announcement
 *     description: Admin or Mentor.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               targetAudience:
 *                 type: string
 *                 enum: [ALL, MENTORS, STUDENTS]
 *               batch:
 *                 type: string
 *               publishDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Announcement created successfully
 */

/**
 * @swagger
 * /api/announcements:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Get announcements
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Announcements retrieved successfully
 */

/**
 * @swagger
 * /api/announcements/{id}:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Get announcement by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement retrieved successfully
 */

/**
 * @swagger
 * /api/announcements/{id}:
 *   patch:
 *     tags:
 *       - Announcements
 *     summary: Update announcement
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               targetAudience:
 *                 type: string
 *                 enum: [ALL, MENTORS, STUDENTS]
 *               batch:
 *                 type: string
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 */

/**
 * @swagger
 * /api/announcements/{id}:
 *   delete:
 *     tags:
 *       - Announcements
 *     summary: Delete announcement
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 */

/* ============================================================
   DASHBOARDS
   ============================================================ */

/**
 * @swagger
 * /api/dashboard/admin:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Admin dashboard
 *     description: Admin only.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard retrieved
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/dashboard/mentor:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Mentor dashboard
 *     description: Mentor only.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mentor dashboard retrieved
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/dashboard/student:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Student dashboard
 *     description: Student only.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard retrieved
 *       403:
 *         description: Forbidden
 */