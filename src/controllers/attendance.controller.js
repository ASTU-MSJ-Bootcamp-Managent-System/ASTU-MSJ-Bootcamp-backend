const attendanceService = require("../services/attendance.service");
const { sendSuccess } = require("../utils/response");

const createAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body, req.user.id);
    return sendSuccess(res, "Attendance created successfully", attendance, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAttendance,
};