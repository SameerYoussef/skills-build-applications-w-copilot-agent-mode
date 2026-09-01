import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance: number;
  calories: number;
  teamId?: mongoose.Types.ObjectId;
  description?: string;
  timestamp: Date;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'walking', 'gym', 'hiking']
    },
    duration: {
      type: Number,
      required: true
    },
    distance: {
      type: Number,
      required: true
    },
    calories: {
      type: Number,
      default: 0
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    },
    description: {
      type: String,
      default: ''
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export default Activity;
