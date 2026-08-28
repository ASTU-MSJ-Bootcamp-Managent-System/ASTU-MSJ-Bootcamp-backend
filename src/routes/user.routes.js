const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validation.middleware');
const {
  updateProfileValidator,
  updateRoleValidator,
  userIdParamValidator,
} = require('../validators/user.validator');

// All routes require authentication
router.use(authenticate);

// GET /api/users - List all users (ADMIN only)
router.get('/', authorize('ADMIN'), userController.getUsers);

// GET /api/users/profile - Get own profile
router.get('/profile', userController.getProfile);

// GET /api/users/:id - Get user by ID (ADMIN only)
router.get('/:id', authorize('ADMIN'), userIdParamValidator, validate, userController.getUserById);

// PATCH /api/users/profile - Update own profile
router.patch('/profile', updateProfileValidator, validate, userController.updateProfile);

// PATCH /api/users/:id/approve - Approve student (ADMIN only)
router.patch('/:id/approve', authorize('ADMIN'), userIdParamValidator, validate, userController.approveUser);

// PATCH /api/users/:id/role - Update user role (ADMIN only)
router.patch('/:id/role', authorize('ADMIN'), userIdParamValidator, updateRoleValidator, validate, userController.updateUserRole);

// DELETE /api/users/:id - Delete user (ADMIN only)
router.delete('/:id', authorize('ADMIN'), userIdParamValidator, validate, userController.deleteUser);

module.exports = router;
