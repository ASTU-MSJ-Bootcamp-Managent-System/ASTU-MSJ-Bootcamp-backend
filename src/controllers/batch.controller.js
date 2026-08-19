const batchService = require('../services/batch.service');
const { sendSuccess } = require('../utils/response');

const createBatch = async (req, res, next) => {
  try {
    const batch = await batchService.createBatch(req.body);
    return sendSuccess(res, 'Batch created successfully', batch, 201);
  } catch (error) {
    next(error);
  }
};

const attachMentor = async (req, res, next) => {
  try {
    const batch = await batchService.attachMentor(req.params.id, req.body.mentorId);
    return sendSuccess(res, 'Mentor attached to batch successfully', batch, 200);
  } catch (error) {
    next(error);
  }
};

const enrollStudent = async (req, res, next) => {
  try {
    const batch = await batchService.enrollStudent(req.params.id, req.body.studentId);
    return sendSuccess(res, 'Student enrolled in batch successfully', batch, 200);
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
    return sendSuccess(res, 'Student assigned to mentor successfully', result, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBatch,
  attachMentor,
  enrollStudent,
  assignStudentMentor,
};