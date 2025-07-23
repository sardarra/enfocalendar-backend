import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: String,
  startDate: {
    type: String,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: String,
    required: [true, 'End date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
  location: String,
  color: {
    type: String,
    default: '#3b82f6'
  },
  createdBy: {
    type: String,
    required: [true, 'Created by is required'],
    default: 'User'
  },
  repeat: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly', 'weekdays'],
    default: 'none'
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
export default Event;