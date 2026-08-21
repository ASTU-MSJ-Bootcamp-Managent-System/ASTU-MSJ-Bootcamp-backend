const { body, param } = require('express-validator');

const createAnnouncementValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('targetAudience')
    .optional()
    .isIn(['ALL', 'MENTORS', 'STUDENTS'])
    .withMessage('Target audience must be ALL, MENTORS, or STUDENTS'),
  body('batch')
    .optional({ values: 'null' })
    .isMongoId()
    .withMessage('Invalid batch ID'),
  body('publishDate').optional().isISO8601().withMessage('Valid date required'),
];

const updateAnnouncementValidator = [
  param('id').isMongoId().withMessage('Invalid announcement ID'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
  body('targetAudience')
    .optional()
    .isIn(['ALL', 'MENTORS', 'STUDENTS'])
    .withMessage('Target audience must be ALL, MENTORS, or STUDENTS'),
  body('batch')
    .optional({ values: 'null' })
    .isMongoId()
    .withMessage('Invalid batch ID'),
];

const announcementIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid announcement ID'),
];

module.exports = {
  createAnnouncementValidator,
  updateAnnouncementValidator,
  announcementIdParamValidator,
};
