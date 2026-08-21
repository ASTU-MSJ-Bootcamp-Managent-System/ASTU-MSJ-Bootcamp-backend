const announcementService = require('../services/announcement.service');
const { sendResponse } = require('../utils/response');

const createAnnouncement = async (req, res, next) => {
  try {
    const announcement = await announcementService.createAnnouncement(req.body, req.user.id);
    return sendResponse(res, 201, 'Announcement created successfully', announcement);
  } catch (error) {
    next(error);
  }
};

const getAnnouncements = async (req, res, next) => {
  try {
    const result = await announcementService.getAnnouncements(req.query, req.user.role);
    return sendResponse(res, 200, 'Announcements retrieved successfully', result.announcements, result.pagination);
  } catch (error) {
    next(error);
  }
};

const getAnnouncementById = async (req, res, next) => {
  try {
    const announcement = await announcementService.getAnnouncementById(req.params.id);
    return sendResponse(res, 200, 'Announcement retrieved successfully', announcement);
  } catch (error) {
    next(error);
  }
};

const updateAnnouncement = async (req, res, next) => {
  try {
    const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
    return sendResponse(res, 200, 'Announcement updated successfully', announcement);
  } catch (error) {
    next(error);
  }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    const result = await announcementService.deleteAnnouncement(req.params.id);
    return sendResponse(res, 200, result.message, null);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
