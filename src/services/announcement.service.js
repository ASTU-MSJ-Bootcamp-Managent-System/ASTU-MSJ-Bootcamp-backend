const Announcement = require('../models/announcement.model');
const { parsePagination, buildPagination } = require('../utils/pagination');

const createAnnouncement = async (announcementData, authorId) => {
  const announcement = await Announcement.create({
    ...announcementData,
    author: authorId,
  });
  return announcement;
};

const getAnnouncements = async (query, userRole) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = {};

  // Filter by target audience based on user role
  if (userRole === 'STUDENT') {
    filter.$or = [
      { targetAudience: 'ALL' },
      { targetAudience: 'STUDENTS' },
    ];
  } else if (userRole === 'MENTOR') {
    filter.$or = [
      { targetAudience: 'ALL' },
      { targetAudience: 'MENTORS' },
    ];
  }
  // ADMIN sees all

  if (query.batch) filter.batch = query.batch;
  if (query.search) {
    filter.$and = filter.$and || [];
    filter.$and.push({
      $or: [
        { title: { $regex: query.search, $options: 'i' } },
        { content: { $regex: query.search, $options: 'i' } },
      ],
    });
  }

  const total = await Announcement.countDocuments(filter);
  const announcements = await Announcement.find(filter)
    .populate('author', 'name email role')
    .populate('batch', 'name')
    .sort({ publishDate: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);
  return { announcements, pagination };
};

const getAnnouncementById = async (announcementId) => {
  const announcement = await Announcement.findById(announcementId)
    .populate('author', 'name email role')
    .populate('batch', 'name');

  if (!announcement) {
    const error = new Error('Announcement not found');
    error.statusCode = 404;
    throw error;
  }

  return announcement;
};

const updateAnnouncement = async (announcementId, updateData) => {
  const announcement = await Announcement.findByIdAndUpdate(announcementId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!announcement) {
    const error = new Error('Announcement not found');
    error.statusCode = 404;
    throw error;
  }

  return announcement;
};

const deleteAnnouncement = async (announcementId) => {
  const announcement = await Announcement.findByIdAndDelete(announcementId);
  if (!announcement) {
    const error = new Error('Announcement not found');
    error.statusCode = 404;
    throw error;
  }
  return { message: 'Announcement deleted successfully' };
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};
