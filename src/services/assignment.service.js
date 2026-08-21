const Assignment = require('../models/assignment.model');
const Batch = require('../models/batch.model');
const { parsePagination, buildPagination } = require('../utils/pagination');

const createAssignment = async (assignmentData, mentorId) => {
  // Verify batch exists
  const batch = await Batch.findById(assignmentData.batch);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  const assignment = await Assignment.create({
    ...assignmentData,
    createdBy: mentorId,
  });

  return assignment;
};

const getAssignmentsByBatch = async (batchId, query) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = { batch: batchId };
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ];
  }

  const total = await Assignment.countDocuments(filter);
  const assignments = await Assignment.find(filter)
    .populate('createdBy', 'name email')
    .sort({ deadline: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);
  return { assignments, pagination };
};

const getAssignmentById = async (assignmentId) => {
  const assignment = await Assignment.findById(assignmentId)
    .populate('createdBy', 'name email')
    .populate('batch', 'name');

  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  return assignment;
};

const updateAssignment = async (assignmentId, updateData) => {
  const assignment = await Assignment.findByIdAndUpdate(assignmentId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  return assignment;
};

const deleteAssignment = async (assignmentId) => {
  const assignment = await Assignment.findByIdAndDelete(assignmentId);
  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }
  return { message: 'Assignment deleted successfully' };
};

module.exports = {
  createAssignment,
  getAssignmentsByBatch,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
