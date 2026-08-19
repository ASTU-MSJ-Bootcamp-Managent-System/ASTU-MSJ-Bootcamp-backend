const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");

const createAttendance = async (attendanceData, mentorId) => {
  const student = await User.findById(attendanceData.student);
  
  if (!student || student.role !== "STUDENT") {
    const error = new Error("Invalid student ID");
    error.statusCode = 404;
    throw error;
  }
  
  if (!student.assignedMentor || student.assignedMentor.toString() !== mentorId.toString()) {
    const error = new Error("Forbidden: You can only record attendance for your assigned students");
    error.statusCode = 403;
    throw error;
  }

  try {
    const attendance = await Attendance.create({
      ...attendanceData,
      markedBy: mentorId,
    });
    return attendance;
  } catch (err) {
    // Catch duplicate compound key error (Rule #2)
    if (err.code === 11000) {
      const error = new Error("Attendance record already exists for this student in this batch on this date");
      error.statusCode = 409;
      throw error;
    }
    throw err;
  }
};

module.exports = {
  createAttendance,
};