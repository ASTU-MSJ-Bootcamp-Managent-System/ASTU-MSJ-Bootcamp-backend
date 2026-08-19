const express = require("express");
const attendanceController = require("../controllers/attendance.controller");
const validateAttendance = require("../validators/attendance.validator");

const router = express.Router();

router.post(
  "/",
  validateAttendance,
  attendanceController.createAttendance
);

module.exports = router;