const Attendance = require("../models/attendance.model");

const createAttendance = async (attendanceData) => {
  const attendance = await Attendance.create(attendanceData);

  return attendance;
};

module.exports = {
  createAttendance,
};