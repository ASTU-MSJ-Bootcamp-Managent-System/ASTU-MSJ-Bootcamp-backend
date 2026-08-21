const progressService = require('../services/progress.service');
const { sendResponse } = require('../utils/response');

const createProgress = async (req, res, next) => {
  try {
    const progress = await progressService.createProgress(req.body, req.user.id);
    return sendResponse(res, 201, 'Progress record created successfully', progress);
  } catch (error) {
    next(error);
  }
};

const getProgressByBatch = async (req, res, next) => {
  try {
    const result = await progressService.getProgressByBatch(req.params.batchId, req.query);
    return sendResponse(res, 200, 'Progress records retrieved successfully', result.records, result.pagination);
  } catch (error) {
    next(error);
  }
};

const getProgressById = async (req, res, next) => {
  try {
    const progress = await progressService.getProgressById(req.params.id);
    return sendResponse(res, 200, 'Progress record retrieved successfully', progress);
  } catch (error) {
    next(error);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const progress = await progressService.updateProgress(req.params.id, req.body, req.user.id);
    return sendResponse(res, 200, 'Progress record updated successfully', progress);
  } catch (error) {
    next(error);
  }
};

const deleteProgress = async (req, res, next) => {
  try {
    const result = await progressService.deleteProgress(req.params.id);
    return sendResponse(res, 200, result.message, null);
  } catch (error) {
    next(error);
  }
};

const getStudentProgress = async (req, res, next) => {
  try {
    const records = await progressService.getStudentProgress(req.params.studentId, req.params.batchId);
    return sendResponse(res, 200, 'Student progress retrieved successfully', records);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProgress,
  getProgressByBatch,
  getProgressById,
  updateProgress,
  deleteProgress,
  getStudentProgress,
};
