const { body, param } = require('express-validator');

const createAttendanceValidator = [
  body('student').isMongoId().withMessage('Invalid student ID'),
  body('batch').isMongoId().withMessage('Invalid batch ID'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('status')
    .isIn(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'])
    .withMessage('Status must be PRESENT, ABSENT, LATE, or EXCUSED'),
];

const updateAttendanceValidator = [
  param('id').isMongoId().withMessage('Invalid attendance ID'),
  body('status')
    .optional()
    .isIn(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'])
    .withMessage('Status must be PRESENT, ABSENT, LATE, or EXCUSED'),
  body('note').optional().trim(),
];

const attendanceQueryValidator = [
  param('batchId').isMongoId().withMessage('Invalid batch ID'),
];

module.exports = {
  createAttendanceValidator,
  updateAttendanceValidator,
  attendanceQueryValidator,
};
