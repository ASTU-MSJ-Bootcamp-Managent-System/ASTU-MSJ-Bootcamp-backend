const submissionService = require('../services/submission.service');
const { sendResponse } = require('../utils/response');

const createSubmission = async (req, res, next) => {
  try {
    const submission = await submissionService.createSubmission(req.body, req.user.id);
    return sendResponse(res, 201, 'Submission created successfully', submission);
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const submission = await submissionService.gradeSubmission(req.params.id, req.body, req.user.id);
    return sendResponse(res, 200, 'Submission graded successfully', submission);
  } catch (error) {
    next(error);
  }
};

const resubmit = async (req, res, next) => {
  try {
    const submission = await submissionService.resubmit(req.params.id, req.body, req.user.id);
    return sendResponse(res, 200, 'Resubmission successful', submission);
  } catch (error) {
    next(error);
  }
};

const requestResubmission = async (req, res, next) => {
  try {
    const submission = await submissionService.requestResubmission(req.params.id, req.user.id);
    return sendResponse(res, 200, 'Resubmission requested successfully', submission);
  } catch (error) {
    next(error);
  }
};

const getSubmissionsByAssignment = async (req, res, next) => {
  try {
    const result = await submissionService.getSubmissionsByAssignment(req.params.assignmentId, req.query);
    return sendResponse(res, 200, 'Submissions retrieved successfully', result.submissions, result.pagination);
  } catch (error) {
    next(error);
  }
};

const getSubmissionById = async (req, res, next) => {
  try {
    const submission = await submissionService.getSubmissionById(req.params.id);
    return sendResponse(res, 200, 'Submission retrieved successfully', submission);
  } catch (error) {
    next(error);
  }
};

const getStudentSubmissions = async (req, res, next) => {
  try {
    const result = await submissionService.getStudentSubmissions(req.user.id, req.query);
    return sendResponse(res, 200, 'Student submissions retrieved successfully', result.submissions, result.pagination);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubmission,
  gradeSubmission,
  resubmit,
  requestResubmission,
  getSubmissionsByAssignment,
  getSubmissionById,
  getStudentSubmissions,
};
