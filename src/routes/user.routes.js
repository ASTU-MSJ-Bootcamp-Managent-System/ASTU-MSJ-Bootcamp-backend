const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, userController.createUser);
router.get('/', protect, userController.getUsers);
router.patch('/:id/role', protect, userController.updateUserRole);

module.exports = router;