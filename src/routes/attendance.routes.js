const express = require("express");
const attendanceController = require("../controllers/attendance.controller");
const validateAttendance = require("../validators/attendance.validator");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  protect,
  restrictTo("MENTOR"),
  validateAttendance,
  attendanceController.createAttendance
);

module.exports = router;