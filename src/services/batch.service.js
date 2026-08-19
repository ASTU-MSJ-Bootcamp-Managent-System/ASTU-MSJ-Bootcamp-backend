const Batch = require('../models/batch.model');
const User = require('../models/user.model');

const createBatch = async (batchData) => {
  if (new Date(batchData.endDate) <= new Date(batchData.startDate)) {
    const error = new Error('endDate must be after startDate');
    error.statusCode = 422;
    throw error;
  }
  return await Batch.create(batchData);
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

  if (batch.mentors.includes(mentorId)) {
    const error = new Error('Mentor already attached to this batch');
    error.statusCode = 409;
    throw error;
  }

  batch.mentors.push(mentorId);
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

  if (batch.students.includes(studentId)) {
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

const assignStudentMentor = async (batchId, studentId, mentorId) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  if (!batch.students.includes(studentId)) {
    const error = new Error('Student is not enrolled in this batch');
    error.statusCode = 400;
    throw error;
  }

  if (!batch.mentors.includes(mentorId)) {
    const error = new Error('Mentor is not attached to this batch');
    error.statusCode = 400;
    throw error;
  }

  const student = await User.findById(studentId);
  student.assignedMentor = mentorId;
  await student.save();

  return { studentId, mentorId, batchId };
};

module.exports = {
  createBatch,
  attachMentor,
  enrollStudent,
  assignStudentMentor,
};