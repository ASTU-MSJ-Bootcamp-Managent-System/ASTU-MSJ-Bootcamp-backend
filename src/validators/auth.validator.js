const { body } = require('express-validator');

const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  // Explicitly reject role if sent to enforce security rules
  body('role').custom((value) => {
    if (value && value !== 'STUDENT') {
      throw new Error('Self-registration only allows STUDENT role');
    }
    return true;
  })
];

const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];

const resetRequestValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
];

const resetConfirmValidator = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];

module.exports = {
  registerValidator,
  loginValidator,
  changePasswordValidator,
  resetRequestValidator,
  resetConfirmValidator
};