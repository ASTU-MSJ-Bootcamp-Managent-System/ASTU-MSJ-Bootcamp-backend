const express = require('express');
const router = express.Router();

const batchController = require('../controllers/batch.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validation.middleware');
const {
  createBatchValidator,
  batchIdParamValidator,
  mentorBodyValidator,
  studentBodyValidator,
  assignMentorValidator,
} = require('../validators/batch.validator');

// All routes require authentication
router.use(authenticate);

// GET /api/batches - List all batches
router.get('/', batchController.getBatches);

// GET /api/batches/mentor-students - Mentor's student roster
router.get('/mentor-students', authorize('MENTOR'), batchController.getMentorStudentRoster);

// POST /api/batches - Create batch (ADMIN only)
router.post('/', authorize('ADMIN'), createBatchValidator, validate, batchController.createBatch);

// GET /api/batches/:id - Get batch by ID
router.get('/:id', batchIdParamValidator, validate, batchController.getBatchById);

// PATCH /api/batches/:id - Update batch (ADMIN only)
router.patch('/:id', authorize('ADMIN'), batchIdParamValidator, validate, batchController.updateBatch);

// DELETE /api/batches/:id - Delete batch (ADMIN only)
router.delete('/:id', authorize('ADMIN'), batchIdParamValidator, validate, batchController.deleteBatch);

// POST /api/batches/:id/mentors - Attach mentor (ADMIN only)
router.post('/:id/mentors', authorize('ADMIN'), batchIdParamValidator, mentorBodyValidator, validate, batchController.attachMentor);

// DELETE /api/batches/:id/mentors/:mentorId - Detach mentor (ADMIN only)
router.delete('/:id/mentors/:mentorId', authorize('ADMIN'), batchController.detachMentor);

// POST /api/batches/:id/students - Enroll student (ADMIN only)
router.post('/:id/students', authorize('ADMIN'), batchIdParamValidator, studentBodyValidator, validate, batchController.enrollStudent);

// DELETE /api/batches/:id/students/:studentId - Remove student (ADMIN only)
router.delete('/:id/students/:studentId', authorize('ADMIN'), batchController.removeStudent);

// POST /api/batches/:id/students/:studentId/assign-mentor - Assign mentor to student (ADMIN only)
router.post('/:id/students/:studentId/assign-mentor', authorize('ADMIN'), batchController.assignStudentMentor);

module.exports = router;
