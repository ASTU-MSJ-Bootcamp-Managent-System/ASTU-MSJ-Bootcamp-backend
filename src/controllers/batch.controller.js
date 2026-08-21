const batchService = require('../services/batch.service');
const { sendResponse } = require('../utils/response');

const createBatch = async (req, res, next) => {
  try {
    const batch = await batchService.createBatch(req.body);
    return sendResponse(res, 201, 'Batch created successfully', batch);
  } catch (error) {
    next(error);
  }
};

const getBatches = async (req, res, next) => {
  try {
    const result = await batchService.getAllBatches(req.query);
    return sendResponse(res, 200, 'Batches retrieved successfully', result.batches, result.pagination);
  } catch (error) {
    next(error);
  }
};

const getBatchById = async (req, res, next) => {
  try {
    const batch = await batchService.getBatchById(req.params.id);
    return sendResponse(res, 200, 'Batch retrieved successfully', batch);
  } catch (error) {
    next(error);
  }
};

const updateBatch = async (req, res, next) => {
  try {
    const batch = await batchService.updateBatch(req.params.id, req.body);
    return sendResponse(res, 200, 'Batch updated successfully', batch);
  } catch (error) {
    next(error);
  }
};

const deleteBatch = async (req, res, next) => {
  try {
    const result = await batchService.deleteBatch(req.params.id);
    return sendResponse(res, 200, result.message, null);
  } catch (error) {
    next(error);
  }
};

const attachMentor = async (req, res, next) => {
  try {
    const batch = await batchService.attachMentor(req.params.id, req.body.mentorId);
    return sendResponse(res, 200, 'Mentor attached to batch successfully', batch);
  } catch (error) {
    next(error);
  }
};

const detachMentor = async (req, res, next) => {
  try {
    const batch = await batchService.detachMentor(req.params.id, req.params.mentorId);
    return sendResponse(res, 200, 'Mentor detached from batch successfully', batch);
  } catch (error) {
    next(error);
  }
};

const enrollStudent = async (req, res, next) => {
  try {
    const batch = await batchService.enrollStudent(req.params.id, req.body.studentId);
    return sendResponse(res, 200, 'Student enrolled in batch successfully', batch);
  } catch (error) {
    next(error);
  }
};

const removeStudent = async (req, res, next) => {
  try {
    const batch = await batchService.removeStudent(req.params.id, req.params.studentId);
    return sendResponse(res, 200, 'Student removed from batch successfully', batch);
  } catch (error) {
    next(error);
  }
};

const assignStudentMentor = async (req, res, next) => {
  try {
    const result = await batchService.assignStudentMentor(
      req.params.id,
      req.params.studentId,
      req.body.mentorId
    );
    return sendResponse(res, 200, 'Student assigned to mentor successfully', result);
  } catch (error) {
    next(error);
  }
};

const getMentorStudentRoster = async (req, res, next) => {
  try {
    const result = await batchService.getMentorStudentRoster(req.user.id, req.query);
    return sendResponse(res, 200, 'Mentor student roster retrieved successfully', result.students, result.pagination);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBatch,
  getBatches,
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
