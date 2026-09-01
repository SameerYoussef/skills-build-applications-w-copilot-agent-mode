import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  type: string;
  instructions: string[];
  caloriesBurned: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'walking', 'gym', 'hiking']
    },
    instructions: [
      {
        type: String
      }
    ],
    caloriesBurned: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
export default Workout;
