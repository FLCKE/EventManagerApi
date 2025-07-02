import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const eventSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: String,
  imageUrl: {
    type: String,
  },
  createdBy: {
    type: String,
    ref: 'Users',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Event', eventSchema);