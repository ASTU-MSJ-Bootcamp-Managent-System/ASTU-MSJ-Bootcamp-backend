const express = require('express');
const router = express.Router();

const attendanceController = require('../controllers/attendance.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validation.middleware');
const {
  createAttendanceValidator,
  updateAttendanceValidator,
} = require('../validators/attendance.validator');

// All routes require authentication
router.use(authenticate);

// POST /api/attendance - Mark attendance (MENTOR only)
router.post('/', authorize('MENTOR'), createAttendanceValidator, validate, attendanceController.createAttendance);

// PATCH /api/attendance/:id - Update attendance (MENTOR only)
router.patch('/:id', authorize('MENTOR'), updateAttendanceValidator, validate, attendanceController.updateAttendance);

// GET /api/attendance/batch/:batchId - List attendance by batch
router.get('/batch/:batchId', attendanceController.getAttendanceByBatch);

// GET /api/attendance/batch/:batchId/student/:studentId/percentage - Attendance percentage
router.get('/batch/:batchId/student/:studentId/percentage', attendanceController.getAttendancePercentage);

module.exports = router;
