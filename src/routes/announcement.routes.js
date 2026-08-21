const express = require('express');
const router = express.Router();

const announcementController = require('../controllers/announcement.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validation.middleware');
const {
  createAnnouncementValidator,
  updateAnnouncementValidator,
  announcementIdParamValidator,
} = require('../validators/announcement.validator');

// All routes require authentication
router.use(authenticate);

// POST /api/announcements - Create announcement (ADMIN, MENTOR)
router.post('/', authorize('ADMIN', 'MENTOR'), createAnnouncementValidator, validate, announcementController.createAnnouncement);

// GET /api/announcements - List announcements (filtered by role)
router.get('/', announcementController.getAnnouncements);

// GET /api/announcements/:id - Get announcement by ID
router.get('/:id', announcementIdParamValidator, validate, announcementController.getAnnouncementById);

// PATCH /api/announcements/:id - Update announcement (ADMIN only)
router.patch('/:id', authorize('ADMIN'), announcementIdParamValidator, updateAnnouncementValidator, validate, announcementController.updateAnnouncement);

// DELETE /api/announcements/:id - Delete announcement (ADMIN only)
router.delete('/:id', authorize('ADMIN'), announcementIdParamValidator, validate, announcementController.deleteAnnouncement);

module.exports = router;
