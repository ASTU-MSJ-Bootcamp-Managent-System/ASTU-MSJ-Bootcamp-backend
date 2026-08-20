const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: [true, 'Assignment ID is required'],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student ID is required'],
    },
    githubUrl: {
      type: String,
      required: [true, 'GitHub URL is required'],
      trim: true,
    },
    liveDemoUrl: {
      type: String,
      trim: true,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    score: {
      type: Number,
      default: null,
    },
    feedback: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['SUBMITTED', 'GRADED', 'RESUBMISSION_REQUESTED', 'RESUBMITTED'],
      default: 'SUBMITTED',
    },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);