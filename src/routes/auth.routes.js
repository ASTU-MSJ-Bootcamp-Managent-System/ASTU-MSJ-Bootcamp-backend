const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/auth.middleware');
const validate = require('../middleware/validation.middleware');

const {
  registerValidator,
  loginValidator,
  changePasswordValidator,
  resetRequestValidator,
  resetConfirmValidator
} = require('../validators/auth.validator');


// Public Routes
router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/reset-password/request', resetRequestValidator, validate, authController.requestResetPassword);
router.post('/reset-password/confirm', resetConfirmValidator, validate, authController.confirmResetPassword);

// Protected Routes
router.post('/logout', authenticate, authController.logout);
router.post('/change-password', authenticate, changePasswordValidator, validate, authController.changePassword);

module.exports = router;