import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  totalDistance: number;
  totalActivities: number;
  totalCalories: number;
  rank: number;
  teamId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    totalDistance: {
      type: Number,
      default: 0
    },
    totalActivities: {
      type: Number,
      default: 0
    },
    totalCalories: {
      type: Number,
      default: 0
    },
    rank: {
      type: Number,
      default: 0
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
export default Leaderboard;
