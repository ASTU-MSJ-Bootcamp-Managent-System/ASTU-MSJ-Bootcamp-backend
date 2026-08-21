const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

// All routes require authentication
router.use(authenticate);

// GET /api/dashboard/admin - Admin dashboard (ADMIN only)
router.get('/admin', authorize('ADMIN'), dashboardController.getAdminDashboard);

// GET /api/dashboard/mentor - Mentor dashboard (MENTOR only)
router.get('/mentor', authorize('MENTOR'), dashboardController.getMentorDashboard);

// GET /api/dashboard/student - Student dashboard (STUDENT only)
router.get('/student', authorize('STUDENT'), dashboardController.getStudentDashboard);

module.exports = router;
