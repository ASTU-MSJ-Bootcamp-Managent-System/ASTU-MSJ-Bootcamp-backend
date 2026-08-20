const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student ID is required'],
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
      required: [true, 'Batch ID is required'],
    },
    topic: {
      type: String,
      enum: [
        'HTML_CSS',
        'JAVASCRIPT',
        'REACT',
        'NODEJS',
        'EXPRESSJS',
        'MONGODB',
        'GIT_GITHUB',
      ],
      required: [true, 'Topic is required'],
    },
    status: {
      type: String,
      enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'NEEDS_IMPROVEMENT'],
      default: 'NOT_STARTED',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

progressSchema.index({ student: 1, batch: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);