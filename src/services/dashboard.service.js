const User = require('../models/user.model');
const Batch = require('../models/batch.model');
const Attendance = require('../models/attendance.model');
const Assignment = require('../models/assignment.model');
const Submission = require('../models/submission.model');
const Progress = require('../models/progress.model');
const Announcement = require('../models/announcement.model');

const getAdminDashboard = async () => {
  const totalUsers = await User.countDocuments();
  const totalStudents = await User.countDocuments({ role: 'STUDENT' });
  const totalMentors = await User.countDocuments({ role: 'MENTOR' });
  const totalAdmins = await User.countDocuments({ role: 'ADMIN' });
  const totalBatches = await Batch.countDocuments();
  const activeBatches = await Batch.countDocuments({
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  });
  const totalAssignments = await Assignment.countDocuments();
  const totalSubmissions = await Submission.countDocuments();
  const totalAnnouncements = await Announcement.countDocuments();

  // Recent submissions
  const recentSubmissions = await Submission.find()
    .populate('student', 'name email')
    .populate('assignment', 'title')
    .sort({ createdAt: -1 })
    .limit(5);

  // Submission status breakdown
  const submittedCount = await Submission.countDocuments({ status: 'SUBMITTED' });
  const gradedCount = await Submission.countDocuments({ status: 'GRADED' });
  const resubmissionRequestedCount = await Submission.countDocuments({ status: 'RESUBMISSION_REQUESTED' });
  const resubmittedCount = await Submission.countDocuments({ status: 'RESUBMITTED' });

  return {
    users: {
      total: totalUsers,
      students: totalStudents,
      mentors: totalMentors,
      admins: totalAdmins,
    },
    batches: {
      total: totalBatches,
      active: activeBatches,
    },
    assignments: {
      total: totalAssignments,
    },
    submissions: {
      total: totalSubmissions,
      submitted: submittedCount,
      graded: gradedCount,
      resubmissionRequested: resubmissionRequestedCount,
      resubmitted: resubmittedCount,
    },
    announcements: {
      total: totalAnnouncements,
    },
    recentSubmissions,
  };
};

const getMentorDashboard = async (mentorId) => {
  // Get students assigned to this mentor
  const assignedStudents = await User.find({ assignedMentor: mentorId, role: 'STUDENT' })
    .select('name email batch')
    .populate('batch', 'name');

  const studentIds = assignedStudents.map((s) => s._id);

  // Get batches where this mentor is attached
  const batches = await Batch.find({ mentors: mentorId })
    .select('name startDate endDate');

  const batchIds = batches.map((b) => b._id);

  // Pending submissions to grade
  const pendingSubmissions = await Submission.find({
    student: { $in: studentIds },
    status: { $in: ['SUBMITTED', 'RESUBMITTED'] },
  })
    .populate('student', 'name email')
    .populate('assignment', 'title deadline')
    .sort({ createdAt: -1 });

  // Average attendance for assigned students
  let averageAttendance = 0;
  if (studentIds.length > 0 && batchIds.length > 0) {
    const totalRecords = await Attendance.countDocuments({
      student: { $in: studentIds },
      batch: { $in: batchIds },
    });
    const presentCount = await Attendance.countDocuments({
      student: { $in: studentIds },
      batch: { $in: batchIds },
      status: { $in: ['PRESENT', 'LATE'] },
    });
    averageAttendance = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;
  }

  // Recent announcements
  const recentAnnouncements = await Announcement.find({
    $or: [{ targetAudience: 'ALL' }, { targetAudience: 'MENTORS' }],
  })
    .populate('author', 'name')
    .sort({ publishDate: -1 })
    .limit(5);

  return {
    assignedStudents: {
      count: assignedStudents.length,
      students: assignedStudents,
    },
    batches: {
      count: batches.length,
      batches,
    },
    pendingSubmissions: {
      count: pendingSubmissions.length,
      submissions: pendingSubmissions,
    },
    averageAttendance,
    recentAnnouncements,
  };
};

const getStudentDashboard = async (studentId) => {
  const student = await User.findById(studentId)
    .select('name email batch assignedMentor')
    .populate('batch', 'name')
    .populate('assignedMentor', 'name email');

  if (!student) {
    const error = new Error('Student not found');
    error.statusCode = 404;
    throw error;
  }

  // My submissions
  const totalSubmissions = await Submission.countDocuments({ student: studentId });
  const gradedSubmissions = await Submission.countDocuments({ student: studentId, status: 'GRADED' });
  const pendingSubmissions = await Submission.countDocuments({
    student: studentId,
    status: { $in: ['SUBMITTED', 'RESUBMITTED'] },
  });
  const resubmissionNeeded = await Submission.countDocuments({
    student: studentId,
    status: 'RESUBMISSION_REQUESTED',
  });

  // Average score
  const gradedRecords = await Submission.find({ student: studentId, status: 'GRADED' })
    .populate('assignment', 'maximumScore');
  let averageScore = 0;
  if (gradedRecords.length > 0) {
    const totalScore = gradedRecords.reduce((sum, s) => sum + (s.score || 0), 0);
    const totalMax = gradedRecords.reduce((sum, s) => sum + (s.assignment.maximumScore || 100), 0);
    averageScore = Math.round((totalScore / totalMax) * 100);
  }

  // Attendance
  let attendance = { totalDays: 0, present: 0, percentage: 0 };
  if (student.batch) {
    const totalDays = await Attendance.countDocuments({ student: studentId, batch: student.batch._id });
    const presentDays = await Attendance.countDocuments({
      student: studentId,
      batch: student.batch._id,
      status: { $in: ['PRESENT', 'LATE'] },
    });
    attendance = {
      totalDays,
      present: presentDays,
      percentage: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0,
    };
  }

  // Progress
  const progress = student.batch
    ? await Progress.find({ student: studentId, batch: student.batch._id })
    : [];

  // Recent announcements
  const recentAnnouncements = await Announcement.find({
    $or: [{ targetAudience: 'ALL' }, { targetAudience: 'STUDENTS' }],
  })
    .populate('author', 'name')
    .sort({ publishDate: -1 })
    .limit(5);

  // Recent submissions
  const recentSubmissions = await Submission.find({ student: studentId })
    .populate('assignment', 'title')
    .populate('gradedBy', 'name')
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    student,
    submissions: {
      total: totalSubmissions,
      graded: gradedSubmissions,
      pending: pendingSubmissions,
      resubmissionNeeded,
      averageScore,
    },
    attendance,
    progress,
    recentAnnouncements,
    recentSubmissions,
  };
};

module.exports = {
  getAdminDashboard,
  getMentorDashboard,
  getStudentDashboard,
};
