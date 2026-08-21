const Progress = require('../models/progress.model');
const User = require('../models/user.model');
const Batch = require('../models/batch.model');
const { parsePagination, buildPagination } = require('../utils/pagination');

const createProgress = async (progressData, mentorId) => {
  const student = await User.findById(progressData.student);
  if (!student || student.role !== 'STUDENT') {
    const error = new Error('Invalid student ID');
    error.statusCode = 404;
    throw error;
  }

  // Verify mentor is assigned to this student
  if (!student.assignedMentor || student.assignedMentor.toString() !== mentorId.toString()) {
    const error = new Error('Forbidden: You can only track progress for your assigned students');
    error.statusCode = 403;
    throw error;
  }

  try {
    const progress = await Progress.create({
      ...progressData,
      updatedBy: mentorId,
    });
    return progress;
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error('Progress record already exists for this student, batch, and topic');
      error.statusCode = 409;
      throw error;
    }
    throw err;
  }
};

const getProgressByBatch = async (batchId, query) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = { batch: batchId };
  if (query.student) filter.student = query.student;
  if (query.topic) filter.topic = query.topic;
  if (query.status) filter.status = query.status;

  const total = await Progress.countDocuments(filter);
  const records = await Progress.find(filter)
    .populate('student', 'name email')
    .populate('updatedBy', 'name')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);
  return { records, pagination };
};

const getProgressById = async (progressId) => {
  const progress = await Progress.findById(progressId)
    .populate('student', 'name email')
    .populate('updatedBy', 'name');

  if (!progress) {
    const error = new Error('Progress record not found');
    error.statusCode = 404;
    throw error;
  }

  return progress;
};

const updateProgress = async (progressId, updateData, mentorId) => {
  const progress = await Progress.findById(progressId);
  if (!progress) {
    const error = new Error('Progress record not found');
    error.statusCode = 404;
    throw error;
  }

  // Verify mentor is assigned to the student
  const student = await User.findById(progress.student);
  if (!student.assignedMentor || student.assignedMentor.toString() !== mentorId.toString()) {
    const error = new Error('Forbidden: You can only update progress for your assigned students');
    error.statusCode = 403;
    throw error;
  }

  if (updateData.status) progress.status = updateData.status;
  if (updateData.notes !== undefined) progress.notes = updateData.notes;
  progress.updatedBy = mentorId;

  await progress.save();
  return progress;
};

const deleteProgress = async (progressId) => {
  const progress = await Progress.findByIdAndDelete(progressId);
  if (!progress) {
    const error = new Error('Progress record not found');
    error.statusCode = 404;
    throw error;
  }
  return { message: 'Progress record deleted successfully' };
};

const getStudentProgress = async (studentId, batchId) => {
  const records = await Progress.find({ student: studentId, batch: batchId })
    .populate('updatedBy', 'name')
    .sort({ updatedAt: -1 });

  return records;
};

module.exports = {
  createProgress,
  getProgressByBatch,
  getProgressById,
  updateProgress,
  deleteProgress,
  getStudentProgress,
};
