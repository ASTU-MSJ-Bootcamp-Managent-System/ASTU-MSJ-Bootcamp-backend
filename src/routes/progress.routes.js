const express = require('express');
const router = express.Router();

const progressController = require('../controllers/progress.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validation.middleware');
const {
  createProgressValidator,
  updateProgressValidator,
} = require('../validators/progress.validator');

// All routes require authentication
router.use(authenticate);

// POST /api/progress - Create progress record (MENTOR only)
router.post('/', authorize('MENTOR'), createProgressValidator, validate, progressController.createProgress);

// GET /api/progress/batch/:batchId - List progress by batch
router.get('/batch/:batchId', progressController.getProgressByBatch);

// GET /api/progress/batch/:batchId/student/:studentId - Student progress for a batch
router.get('/batch/:batchId/student/:studentId', progressController.getStudentProgress);

// GET /api/progress/:id - Get progress by ID
router.get('/:id', progressController.getProgressById);

// PATCH /api/progress/:id - Update progress (MENTOR only)
router.patch('/:id', authorize('MENTOR'), updateProgressValidator, validate, progressController.updateProgress);

// DELETE /api/progress/:id - Delete progress (ADMIN only)
router.delete('/:id', authorize('ADMIN'), progressController.deleteProgress);

module.exports = router;
