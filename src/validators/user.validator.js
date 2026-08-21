const { body, param } = require('express-validator');

const updateProfileValidator = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('bio').optional().trim(),
  body('avatarUrl').optional().trim().isURL().withMessage('Valid URL required'),
];

const updateRoleValidator = [
  body('role')
    .isIn(['ADMIN', 'MENTOR', 'STUDENT'])
    .withMessage('Role must be ADMIN, MENTOR, or STUDENT'),
];

const userIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

module.exports = {
  updateProfileValidator,
  updateRoleValidator,
  userIdParamValidator,
};
