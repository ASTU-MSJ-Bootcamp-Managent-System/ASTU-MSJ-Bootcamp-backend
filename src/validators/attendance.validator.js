const validateAttendance = (req, res, next) => {
  const { student, batch, date, status } = req.body;

  if (!student || !batch || !date || !status) {
    return res.status(400).json({
      success: false,
      message: "student, batch, date, and status are required fields",
    });
  }

  const allowedStatuses = ["PRESENT", "ABSENT", "LATE", "EXCUSED"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid attendance status. Allowed values: ${allowedStatuses.join(", ")}`,
    });
  }

  next();
};

module.exports = validateAttendance;