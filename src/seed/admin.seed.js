const dotenv = require("dotenv");
const connectDB = require("../config/database");

// 1. Import all 7 models
const User = require("../models/user.model");
const Batch = require("../models/batch.model");
const Attendance = require("../models/attendance.model");
const Progress = require("../models/progress.model");
const Assignment = require("../models/assignment.model");
const Submission = require("../models/submission.model");
const Announcement = require("../models/announcement.model");

dotenv.config();

const seedAll = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB. Creating records for all 7 models...");

    // Clear existing data so we start fresh
    await User.deleteMany({});
    await Batch.deleteMany({});
    await Attendance.deleteMany({});
    await Progress.deleteMany({});
    await Assignment.deleteMany({});
    await Submission.deleteMany({});
    await Announcement.deleteMany({});

    // 1. User
    const admin = await User.create({
      name: "System Admin",
      email: "admin@example.com",
      password: "password123",
      role: "ADMIN",
    });

    // 2. Batch
    const batch = await Batch.create({
      name: "Batch 01",
      description: "First Active Batch",
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      mentors: [admin._id],
    });

    // 3. Attendance
    await Attendance.create({
      student: admin._id,
      batch: batch._id,
      date: new Date(),
      status: "PRESENT",
      markedBy: admin._id,
    });

    // 4. Progress
    await Progress.create({
      student: admin._id,
      batch: batch._id,
      topic: "NODEJS",
      status: "IN_PROGRESS",
      updatedBy: admin._id,
    });

    // 5. Assignment
    const assignment = await Assignment.create({
      title: "Build REST API",
      description: "Express and MongoDB assignment",
      batch: batch._id,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      maximumScore: 100,
      createdBy: admin._id,
    });

    // 6. Submission
    await Submission.create({
      assignment: assignment._id,
      student: admin._id,
      githubUrl: "https://github.com/example/repo",
      status: "SUBMITTED",
    });

    // 7. Announcement
    await Announcement.create({
      title: "Welcome Students",
      content: "Bootcamp started successfully!",
      author: admin._id,
    });

    console.log("SUCCESS! Created records in all 7 collections.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedAll();