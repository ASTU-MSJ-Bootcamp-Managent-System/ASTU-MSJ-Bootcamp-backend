const { body, param } = require('express-validator');

const createSubmissionValidator = [
  body('assignment').isMongoId().withMessage('Invalid assignment ID'),
  body('githubUrl').trim().isURL().withMessage('Valid GitHub URL is required'),
  body('liveDemoUrl').optional({ values: 'null' }).trim().isURL().withMessage('Valid URL required'),
  body('notes').optional().trim(),
];

const gradeSubmissionValidator = [
  param('id').isMongoId().withMessage('Invalid submission ID'),
  body('score')
    .isFloat({ min: 0 })
    .withMessage('Score must be a non-negative number'),
  body('feedback').optional().trim(),
];

const resubmitValidator = [
  param('id').isMongoId().withMessage('Invalid submission ID'),
  body('githubUrl').trim().isURL().withMessage('Valid GitHub URL is required'),
  body('liveDemoUrl').optional({ values: 'null' }).trim().isURL().withMessage('Valid URL required'),
  body('notes').optional().trim(),
];

const submissionIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid submission ID'),
];

module.exports = {
  createSubmissionValidator,
  gradeSubmissionValidator,
  resubmitValidator,
  submissionIdParamValidator,
};
