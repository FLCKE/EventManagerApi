import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const notificationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  userId: {
    type: String,
    ref: 'Users',
    required: false // null = broadcast
  },
  message: {
    type: String,
    required: true
  },
   read: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Notification', notificationSchema);