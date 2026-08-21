const dashboardService = require('../services/dashboard.service');
const { sendResponse } = require('../utils/response');

const getAdminDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getAdminDashboard();
    return sendResponse(res, 200, 'Admin dashboard retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

const getMentorDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getMentorDashboard(req.user.id);
    return sendResponse(res, 200, 'Mentor dashboard retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

const getStudentDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getStudentDashboard(req.user.id);
    return sendResponse(res, 200, 'Student dashboard retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboard,
  getMentorDashboard,
  getStudentDashboard,
};
