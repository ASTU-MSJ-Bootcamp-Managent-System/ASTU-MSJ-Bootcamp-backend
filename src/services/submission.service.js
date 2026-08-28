const Submission = require('../models/submission.model');
const Assignment = require('../models/assignment.model');
const User = require('../models/user.model');
const Batch = require('../models/batch.model');
const { parsePagination, buildPagination } = require('../utils/pagination');

const createSubmission = async (submissionData, studentId) => {
  // Verify assignment exists
  const assignment = await Assignment.findById(submissionData.assignment);
  if (!assignment) {
    const error = new Error('Assignment not found');
    error.statusCode = 404;
    throw error;
  }

  // Check if student already has a submission for this assignment
  const existingSubmission = await Submission.findOne({
    assignment: submissionData.assignment,
    student: studentId,
  });

  if (existingSubmission) {
    const error = new Error('You have already submitted this assignment. Use resubmit instead.');
    error.statusCode = 409;
    throw error;
  }

  const submission = await Submission.create({
    ...submissionData,
    student: studentId,
    status: 'SUBMITTED',
  });

  return submission;
};

const gradeSubmission = async (submissionId, gradeData, mentorId) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    const error = new Error('Submission not found');
    error.statusCode = 404;
    throw error;
  }

  // Verify mentor has access: either assigned directly OR is attached to the student's batch
  const student = await User.findById(submission.student);
  const hasDirectAssignment = student.assignedMentor && student.assignedMentor.toString() === mentorId.toString();
  let hasBatchAccess = false;
  if (!hasDirectAssignment && student.batch) {
    const batch = await Batch.findById(student.batch);
    if (batch && batch.mentors.some((id) => id.toString() === mentorId.toString())) {
      hasBatchAccess = true;
    }
  }
  if (!hasDirectAssignment && !hasBatchAccess) {
    const error = new Error('Forbidden: You can only grade submissions from students in your batch');
    error.statusCode = 403;
    throw error;
  }

  // Verify score doesn't exceed maximum
  const assignment = await Assignment.findById(submission.assignment);
  if (gradeData.score > assignment.maximumScore) {
    const error = new Error(`Score cannot exceed maximum score of ${assignment.maximumScore}`);
    error.statusCode = 422;
    throw error;
  }

  submission.score = gradeData.score;
  submission.feedback = gradeData.feedback || '';
  submission.status = 'GRADED';
  submission.gradedBy = mentorId;

  await submission.save();
  return submission;
};

const resubmit = async (submissionId, resubmitData, studentId) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    const error = new Error('Submission not found');
    error.statusCode = 404;
    throw error;
  }

  // Verify the student owns this submission
  if (submission.student.toString() !== studentId) {
    const error = new Error('Forbidden: You can only resubmit your own submissions');
    error.statusCode = 403;
    throw error;
  }

  // Only allow resubmission if status is RESUBMISSION_REQUESTED
  if (submission.status !== 'RESUBMISSION_REQUESTED') {
    const error = new Error('Resubmission is only allowed when status is RESUBMISSION_REQUESTED');
    error.statusCode = 400;
    throw error;
  }

  submission.githubUrl = resubmitData.githubUrl;
  if (resubmitData.liveDemoUrl !== undefined) submission.liveDemoUrl = resubmitData.liveDemoUrl;
  if (resubmitData.notes !== undefined) submission.notes = resubmitData.notes;
  submission.status = 'RESUBMITTED';
  submission.score = null;
  submission.feedback = '';
  submission.gradedBy = null;

  await submission.save();
  return submission;
};

const requestResubmission = async (submissionId, mentorId) => {
  const submission = await Submission.findById(submissionId);
  if (!submission) {
    const error = new Error('Submission not found');
    error.statusCode = 404;
    throw error;
  }

  // Verify mentor has access: either assigned directly OR is attached to the student's batch
  const student = await User.findById(submission.student);
  const hasDirectAssignment = student.assignedMentor && student.assignedMentor.toString() === mentorId.toString();
  let hasBatchAccess = false;
  if (!hasDirectAssignment && student.batch) {
    const batch = await Batch.findById(student.batch);
    if (batch && batch.mentors.some((id) => id.toString() === mentorId.toString())) {
      hasBatchAccess = true;
    }
  }
  if (!hasDirectAssignment && !hasBatchAccess) {
    const error = new Error('Forbidden: You can only request resubmission from students in your batch');
    error.statusCode = 403;
    throw error;
  }

  submission.status = 'RESUBMISSION_REQUESTED';
  await submission.save();
  return submission;
};

const getSubmissionsByAssignment = async (assignmentId, query) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = { assignment: assignmentId };
  if (query.status) filter.status = query.status;

  const total = await Submission.countDocuments(filter);
  const submissions = await Submission.find(filter)
    .populate('student', 'name email')
    .populate('gradedBy', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);
  return { submissions, pagination };
};

const getSubmissionById = async (submissionId) => {
  const submission = await Submission.findById(submissionId)
    .populate('student', 'name email')
    .populate('assignment', 'title deadline maximumScore')
    .populate('gradedBy', 'name');

  if (!submission) {
    const error = new Error('Submission not found');
    error.statusCode = 404;
    throw error;
  }

  return submission;
};

const getStudentSubmissions = async (studentId, query) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = { student: studentId };
  if (query.status) filter.status = query.status;

  const total = await Submission.countDocuments(filter);
  const submissions = await Submission.find(filter)
    .populate('assignment', 'title deadline maximumScore batch')
    .populate('gradedBy', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);
  return { submissions, pagination };
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
