const { body, param } = require('express-validator');

const createAssignmentValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('instructions').optional().trim(),
  body('batch').isMongoId().withMessage('Invalid batch ID'),
  body('deadline').isISO8601().withMessage('Valid deadline is required'),
  body('maximumScore')
    .isFloat({ min: 1 })
    .withMessage('Maximum score must be greater than 0'),
];

const updateAssignmentValidator = [
  param('id').isMongoId().withMessage('Invalid assignment ID'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('instructions').optional().trim(),
  body('deadline').optional().isISO8601().withMessage('Valid deadline required'),
  body('maximumScore').optional().isFloat({ min: 1 }).withMessage('Maximum score must be greater than 0'),
];

const assignmentIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid assignment ID'),
];

module.exports = {
  createAssignmentValidator,
  updateAssignmentValidator,
  assignmentIdParamValidator,
};
