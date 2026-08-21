const attendanceService = require('../services/attendance.service');
const { sendResponse } = require('../utils/response');

const createAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body, req.user.id);
    return sendResponse(res, 201, 'Attendance created successfully', attendance);
  } catch (error) {
    next(error);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.updateAttendance(req.params.id, req.body, req.user.id);
    return sendResponse(res, 200, 'Attendance updated successfully', attendance);
  } catch (error) {
    next(error);
  }
};

const getAttendanceByBatch = async (req, res, next) => {
  try {
    const result = await attendanceService.getAttendanceByBatch(req.params.batchId, req.query);
    return sendResponse(res, 200, 'Attendance retrieved successfully', result.records, result.pagination);
  } catch (error) {
    next(error);
  }
};

const getAttendancePercentage = async (req, res, next) => {
  try {
    const result = await attendanceService.getAttendancePercentage(req.params.batchId, req.params.studentId);
    return sendResponse(res, 200, 'Attendance percentage calculated', result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAttendance,
  updateAttendance,
  getAttendanceByBatch,
  getAttendancePercentage,
};
