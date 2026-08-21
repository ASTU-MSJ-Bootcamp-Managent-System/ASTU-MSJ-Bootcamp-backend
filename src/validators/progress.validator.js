const { body, param } = require('express-validator');

const createProgressValidator = [
  body('student').isMongoId().withMessage('Invalid student ID'),
  body('batch').isMongoId().withMessage('Invalid batch ID'),
  body('topic')
    .isIn(['HTML_CSS', 'JAVASCRIPT', 'REACT', 'NODEJS', 'EXPRESSJS', 'MONGODB', 'GIT_GITHUB'])
    .withMessage('Invalid topic'),
  body('status')
    .optional()
    .isIn(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'NEEDS_IMPROVEMENT'])
    .withMessage('Invalid status'),
  body('notes').optional().trim(),
];

const updateProgressValidator = [
  param('id').isMongoId().withMessage('Invalid progress ID'),
  body('status')
    .isIn(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'NEEDS_IMPROVEMENT'])
    .withMessage('Invalid status'),
  body('notes').optional().trim(),
];

const progressIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid progress ID'),
];

module.exports = {
  createProgressValidator,
  updateProgressValidator,
  progressIdParamValidator,
};
