const validateAttendance = (req, res, next) => {
  const { student, batch, date, status, markedBy } = req.body;

  if (!student || !batch || !date || !status || !markedBy) {
    return res.status(400).json({
      success: false,
      message: "student, batch, date, status and markedBy are required",
    });
  }

  const allowedStatuses = ["PRESENT", "ABSENT", "LATE", "EXCUSED"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid attendance status",
    });
  }

  next();
};

module.exports = validateAttendance;