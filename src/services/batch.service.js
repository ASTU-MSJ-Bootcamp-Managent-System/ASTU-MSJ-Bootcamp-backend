const Batch = require('../models/batch.model');
const User = require('../models/user.model');
const { parsePagination, buildPagination } = require('../utils/pagination');

const createBatch = async (batchData) => {
  if (new Date(batchData.endDate) <= new Date(batchData.startDate)) {
    const error = new Error('endDate must be after startDate');
    error.statusCode = 422;
    throw error;
  }
  return await Batch.create(batchData);
};

const getAllBatches = async (query) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = {};
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  const total = await Batch.countDocuments(filter);
  const batches = await Batch.find(filter)
    .populate('mentors', 'name email')
    .populate('students', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);

  return { batches, pagination };
};

const getBatchById = async (batchId) => {
  const batch = await Batch.findById(batchId)
    .populate('mentors', 'name email role')
    .populate('students', 'name email assignedMentor');

  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  return batch;
};

const updateBatch = async (batchId, updateData) => {
  const batch = await Batch.findByIdAndUpdate(batchId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  return batch;
};

const deleteBatch = async (batchId) => {
  const batch = await Batch.findByIdAndDelete(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }
  return { message: 'Batch deleted successfully' };
};

const attachMentor = async (batchId, mentorId) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  const mentor = await User.findById(mentorId);
  if (!mentor || mentor.role !== 'MENTOR') {
    const error = new Error('Target user is not a valid Mentor');
    error.statusCode = 400;
    throw error;
  }

  if (batch.mentors.some((id) => id.toString() === mentorId.toString())) {
    const error = new Error('Mentor already attached to this batch');
    error.statusCode = 409;
    throw error;
  }

  batch.mentors.push(mentorId);
  await batch.save();
  return batch;
};

const detachMentor = async (batchId, mentorId) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  if (!batch.mentors.some((id) => id.toString() === mentorId.toString())) {
    const error = new Error('Mentor is not attached to this batch');
    error.statusCode = 400;
    throw error;
  }

  batch.mentors = batch.mentors.filter((id) => id.toString() !== mentorId.toString());
  await batch.save();
  return batch;
};

const enrollStudent = async (batchId, studentId) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  const student = await User.findById(studentId);
  if (!student || student.role !== 'STUDENT') {
    const error = new Error('Target user is not a valid Student');
    error.statusCode = 400;
    throw error;
  }

  if (batch.students.some((id) => id.toString() === studentId.toString())) {
    const error = new Error('Student already enrolled in this batch');
    error.statusCode = 409;
    throw error;
  }

  batch.students.push(studentId);
  await batch.save();

  student.batch = batchId;
  await student.save();

  return batch;
};

const removeStudent = async (batchId, studentId) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  if (!batch.students.some((id) => id.toString() === studentId.toString())) {
    const error = new Error('Student is not enrolled in this batch');
    error.statusCode = 400;
    throw error;
  }

  batch.students = batch.students.filter((id) => id.toString() !== studentId.toString());
  await batch.save();

  const student = await User.findById(studentId);
  if (student) {
    student.batch = null;
    student.assignedMentor = null;
    await student.save();
  }

  return batch;
};

const assignStudentMentor = async (batchId, studentId, mentorId) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  if (!batch.students.some((id) => id.toString() === studentId.toString())) {
    const error = new Error('Student is not enrolled in this batch');
    error.statusCode = 400;
    throw error;
  }

  /* Auto-attach mentor to batch if not already there */
  if (!batch.mentors.some((id) => id.toString() === mentorId.toString())) {
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'MENTOR') {
      const error = new Error('Target user is not a valid Mentor');
      error.statusCode = 400;
      throw error;
    }
    batch.mentors.push(mentorId);
    await batch.save();
  }

  const student = await User.findById(studentId);
  student.assignedMentor = mentorId;
  await student.save();

  return { studentId, mentorId, batchId };
};

const getMentorStudentRoster = async (mentorId, query) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = { assignedMentor: mentorId, role: 'STUDENT' };
  const total = await User.countDocuments(filter);
  const students = await User.find(filter)
    .select('-password -resetPasswordToken -resetPasswordExpires')
    .populate('batch', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);
  return { students, pagination };
};

module.exports = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  attachMentor,
  detachMentor,
  enrollStudent,
  removeStudent,
  assignStudentMentor,
  getMentorStudentRoster,
};
