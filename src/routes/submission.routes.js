const express = require('express');
const router = express.Router();

const submissionController = require('../controllers/submission.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validation.middleware');
const {
  createSubmissionValidator,
  gradeSubmissionValidator,
  resubmitValidator,
  submissionIdParamValidator,
} = require('../validators/submission.validator');

// All routes require authentication
router.use(authenticate);

// POST /api/submissions - Submit homework (STUDENT only)
router.post('/', authorize('STUDENT'), createSubmissionValidator, validate, submissionController.createSubmission);

// GET /api/submissions/my - Get current student's submissions
router.get('/my', submissionController.getStudentSubmissions);

// GET /api/submissions/assignment/:assignmentId - List submissions by assignment (MENTOR, ADMIN)
router.get('/assignment/:assignmentId', authorize('MENTOR', 'ADMIN'), submissionController.getSubmissionsByAssignment);

// GET /api/submissions/:id - Get submission by ID
router.get('/:id', submissionIdParamValidator, validate, submissionController.getSubmissionById);

// PATCH /api/submissions/:id/grade - Grade submission (MENTOR only)
router.patch('/:id/grade', authorize('MENTOR'), submissionIdParamValidator, gradeSubmissionValidator, validate, submissionController.gradeSubmission);

// PATCH /api/submissions/:id/resubmit - Resubmit (STUDENT only)
router.patch('/:id/resubmit', authorize('STUDENT'), submissionIdParamValidator, resubmitValidator, validate, submissionController.resubmit);

// PATCH /api/submissions/:id/request-resubmission - Request resubmission (MENTOR only)
router.patch('/:id/request-resubmission', authorize('MENTOR'), submissionIdParamValidator, validate, submissionController.requestResubmission);

module.exports = router;
