const assignmentService = require('../services/assignment.service');
const { sendResponse } = require('../utils/response');

const createAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.createAssignment(req.body, req.user.id);
    return sendResponse(res, 201, 'Assignment created successfully', assignment);
  } catch (error) {
    next(error);
  }
};

const getAssignmentsByBatch = async (req, res, next) => {
  try {
    const result = await assignmentService.getAssignmentsByBatch(req.params.batchId, req.query);
    return sendResponse(res, 200, 'Assignments retrieved successfully', result.assignments, result.pagination);
  } catch (error) {
    next(error);
  }
};

const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);
    return sendResponse(res, 200, 'Assignment retrieved successfully', assignment);
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.updateAssignment(req.params.id, req.body);
    return sendResponse(res, 200, 'Assignment updated successfully', assignment);
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const result = await assignmentService.deleteAssignment(req.params.id);
    return sendResponse(res, 200, result.message, null);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAssignment,
  getAssignmentsByBatch,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
