const attendanceService = require("../services/attendance.service");

const createAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body);

    res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAttendance,
};