const Attendance = require('../models/attendance.model');
const User = require('../models/user.model');
const Batch = require('../models/batch.model');
const { parsePagination, buildPagination } = require('../utils/pagination');

const createAttendance = async (attendanceData, mentorId) => {
  if (!attendanceData.student) {
    const error = new Error('Student ID is required');
    error.statusCode = 400;
    throw error;
  }

  const student = await User.findById(attendanceData.student);

  if (!student || student.role !== 'STUDENT') {
    const error = new Error(`Student not found with ID: ${attendanceData.student}`);
    error.statusCode = 404;
    throw error;
  }

  // Verify mentor has access: either assigned directly OR is attached to the student's batch
  const hasDirectAssignment = student.assignedMentor && student.assignedMentor.toString() === mentorId.toString();
  let hasBatchAccess = false;
  if (!hasDirectAssignment && student.batch) {
    const batch = await Batch.findById(student.batch);
    if (batch && batch.mentors.some((id) => id.toString() === mentorId.toString())) {
      hasBatchAccess = true;
    }
  }
  if (!hasDirectAssignment && !hasBatchAccess) {
    const error = new Error('Forbidden: You can only record attendance for students in your batch');
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
    if (err.code === 11000) {
      const error = new Error('Attendance record already exists for this student in this batch on this date');
      error.statusCode = 409;
      throw error;
    }
    throw err;
  }
};

const updateAttendance = async (attendanceId, updateData, mentorId) => {
  const attendance = await Attendance.findById(attendanceId);

  if (!attendance) {
    const error = new Error('Attendance record not found');
    error.statusCode = 404;
    throw error;
  }

  // Verify mentor is assigned to the student
  const student = await User.findById(attendance.student);
  if (!student.assignedMentor || student.assignedMentor.toString() !== mentorId.toString()) {
    const error = new Error('Forbidden: You can only update attendance for your assigned students');
    error.statusCode = 403;
    throw error;
  }

  if (updateData.status) attendance.status = updateData.status;
  if (updateData.note !== undefined) attendance.note = updateData.note;

  await attendance.save();
  return attendance;
};

const getAttendanceByBatch = async (batchId, query) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = { batch: batchId };

  if (query.student) filter.student = query.student;
  if (query.status) filter.status = query.status;
  if (query.dateFrom || query.dateTo) {
    filter.date = {};
    if (query.dateFrom) filter.date.$gte = new Date(query.dateFrom);
    if (query.dateTo) filter.date.$lte = new Date(query.dateTo);
  }

  const total = await Attendance.countDocuments(filter);
  const records = await Attendance.find(filter)
    .populate('student', 'name email')
    .populate('markedBy', 'name')
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);
  return { records, pagination };
};

const getAttendancePercentage = async (batchId, studentId) => {
  const totalRecords = await Attendance.countDocuments({ batch: batchId, student: studentId });

  if (totalRecords === 0) {
    return {
      student: studentId,
      batch: batchId,
      totalDays: 0,
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      percentage: 0,
    };
  }

  const present = await Attendance.countDocuments({ batch: batchId, student: studentId, status: 'PRESENT' });
  const absent = await Attendance.countDocuments({ batch: batchId, student: studentId, status: 'ABSENT' });
  const late = await Attendance.countDocuments({ batch: batchId, student: studentId, status: 'LATE' });
  const excused = await Attendance.countDocuments({ batch: batchId, student: studentId, status: 'EXCUSED' });

  const percentage = totalRecords > 0 ? Math.round(((present + late) / totalRecords) * 100) : 0;

  return {
    student: studentId,
    batch: batchId,
    totalDays: totalRecords,
    present,
    absent,
    late,
    excused,
    percentage,
  };
};

module.exports = {
  createAttendance,
  updateAttendance,
  getAttendanceByBatch,
  getAttendancePercentage,
};
