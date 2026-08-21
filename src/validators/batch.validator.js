const { body, param } = require('express-validator');

const createBatchValidator = [
  body('name').trim().notEmpty().withMessage('Batch name is required'),
  body('description').optional().trim(),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
];

const batchIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid batch ID'),
];

const mentorBodyValidator = [
  body('mentorId').isMongoId().withMessage('Invalid mentor ID'),
];

const studentBodyValidator = [
  body('studentId').isMongoId().withMessage('Invalid student ID'),
];

const assignMentorValidator = [
  body('mentorId').isMongoId().withMessage('Invalid mentor ID'),
];

module.exports = {
  createBatchValidator,
  batchIdParamValidator,
  mentorBodyValidator,
  studentBodyValidator,
  assignMentorValidator,
};
