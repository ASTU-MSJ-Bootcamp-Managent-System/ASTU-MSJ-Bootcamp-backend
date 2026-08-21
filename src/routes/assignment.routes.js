const express = require('express');
const router = express.Router();

const assignmentController = require('../controllers/assignment.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validation.middleware');
const {
  createAssignmentValidator,
  updateAssignmentValidator,
  assignmentIdParamValidator,
} = require('../validators/assignment.validator');

// All routes require authentication
router.use(authenticate);

// POST /api/assignments - Create assignment (MENTOR, ADMIN only)
router.post('/', authorize('MENTOR', 'ADMIN'), createAssignmentValidator, validate, assignmentController.createAssignment);

// GET /api/assignments/batch/:batchId - List assignments by batch
router.get('/batch/:batchId', assignmentController.getAssignmentsByBatch);

// GET /api/assignments/:id - Get assignment by ID
router.get('/:id', assignmentIdParamValidator, validate, assignmentController.getAssignmentById);

// PATCH /api/assignments/:id - Update assignment (MENTOR, ADMIN only)
router.patch('/:id', authorize('MENTOR', 'ADMIN'), assignmentIdParamValidator, updateAssignmentValidator, validate, assignmentController.updateAssignment);

// DELETE /api/assignments/:id - Delete assignment (ADMIN only)
router.delete('/:id', authorize('ADMIN'), assignmentIdParamValidator, validate, assignmentController.deleteAssignment);

module.exports = router;
