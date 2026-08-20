const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Assignment title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    instructions: {
      type: String,
      trim: true,
      default: '',
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
      required: [true, 'Batch ID is required'],
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    maximumScore: {
      type: Number,
      required: [true, 'Maximum score is required'],
      min: [1, 'Maximum score must be greater than 0'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Assignment', assignmentSchema);