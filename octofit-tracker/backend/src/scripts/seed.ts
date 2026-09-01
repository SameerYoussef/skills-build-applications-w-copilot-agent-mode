import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

dotenv.config();

/**
 * Seed the octofit_db database with test data.
 * This script populates the database with sample users, teams, activities, workouts, and leaderboard entries.
 */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Sample data
const sampleUsers = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'hashed_password_1',
    bio: 'Fitness enthusiast and runner'
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'hashed_password_2',
    bio: 'Cyclist and gym enthusiast'
  },
  {
    name: 'Carol Davis',
    email: 'carol@example.com',
    password: 'hashed_password_3',
    bio: 'Swimmer and outdoor adventurer'
  },
  {
    name: 'David Wilson',
    email: 'david@example.com',
    password: 'hashed_password_4',
    bio: 'Hiker and fitness tracker'
  },
  {
    name: 'Emma Brown',
    email: 'emma@example.com',
    password: 'hashed_password_5',
    bio: 'Marathon runner and coach'
  }
];

const sampleWorkouts = [
  {
    name: 'Morning Run',
    description: 'Easy pace morning jog to build aerobic base',
    duration: 30,
    difficulty: 'beginner',
    type: 'running',
    instructions: [
      'Warm up for 5 minutes with light jogging',
      'Run at comfortable pace for 20 minutes',
      'Cool down with 5 minutes of walking'
    ],
    caloriesBurned: 250
  },
  {
    name: 'High Intensity Interval Training',
    description: 'Sprint intervals to improve cardiovascular fitness',
    duration: 20,
    difficulty: 'advanced',
    type: 'running',
    instructions: [
      'Warm up for 5 minutes',
      'Sprint for 1 minute, recover for 1 minute (repeat 8 times)',
      'Cool down for 3 minutes'
    ],
    caloriesBurned: 300
  },
  {
    name: 'Beginner Cycling',
    description: 'Leisurely bike ride for fitness and fun',
    duration: 45,
    difficulty: 'beginner',
    type: 'cycling',
    instructions: [
      'Start with a 5-minute warm-up',
      'Maintain steady pace for 35 minutes',
      'Cool down for 5 minutes'
    ],
    caloriesBurned: 350
  },
  {
    name: 'Strength Training',
    description: 'Full body workout to build muscle and endurance',
    duration: 45,
    difficulty: 'intermediate',
    type: 'gym',
    instructions: [
      'Warm up with 10 minutes of cardio',
      'Upper body: 3 sets of 10 reps each',
      'Lower body: 3 sets of 10 reps each',
      'Core: 3 sets of 15 reps each',
      'Cool down with stretching'
    ],
    caloriesBurned: 400
  },
  {
    name: 'Swimming Basics',
    description: 'Learn and practice swimming techniques',
    duration: 30,
    difficulty: 'beginner',
    type: 'swimming',
    instructions: [
      'Warm up with 5 minutes of easy swimming',
      'Practice different strokes for 20 minutes',
      'Cool down with 5 minutes of float and stretch'
    ],
    caloriesBurned: 280
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Cleared all collections');

    // Seed Users
    console.log('Seeding users...');
    const users = await User.insertMany(sampleUsers);
    console.log(`Created ${users.length} users`);

    // Seed Workouts
    console.log('Seeding workouts...');
    const workouts = await Workout.insertMany(sampleWorkouts);
    console.log(`Created ${workouts.length} workouts`);

    // Seed Teams
    console.log('Seeding teams...');
    const teams = await Team.insertMany([
      {
        name: 'Morning Runners',
        description: 'A group dedicated to morning running activities',
        members: [users[0]._id, users[4]._id],
        createdBy: users[0]._id
      },
      {
        name: 'Cycling Club',
        description: 'For cycling enthusiasts of all levels',
        members: [users[1]._id, users[2]._id],
        createdBy: users[1]._id
      },
      {
        name: 'Fitness Warriors',
        description: 'Cross-functional fitness training group',
        members: [users[2]._id, users[3]._id, users[4]._id],
        createdBy: users[3]._id
      }
    ]);
    console.log(`Created ${teams.length} teams`);

    // Seed Activities
    console.log('Seeding activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 35,
        distance: 5.2,
        calories: 300,
        teamId: teams[0]._id,
        description: 'Morning run in the park'
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 40,
        distance: 6.5,
        calories: 350,
        teamId: teams[0]._id,
        description: 'Trail run with elevation'
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 60,
        distance: 20,
        calories: 450,
        teamId: teams[1]._id,
        description: 'Long distance cycling'
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 30,
        distance: 1.5,
        calories: 280,
        teamId: teams[1]._id,
        description: 'Pool swimming session'
      },
      {
        userId: users[3]._id,
        type: 'gym',
        duration: 45,
        distance: 0,
        calories: 400,
        teamId: teams[2]._id,
        description: 'Strength training session'
      },
      {
        userId: users[4]._id,
        type: 'running',
        duration: 50,
        distance: 8,
        calories: 550,
        teamId: teams[0]._id,
        description: 'Long distance run'
      }
    ]);
    console.log(`Created ${activities.length} activities`);

    // Seed Leaderboard
    console.log('Seeding leaderboard...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        totalDistance: 11.7,
        totalActivities: 2,
        totalCalories: 650,
        rank: 1,
        teamId: teams[0]._id
      },
      {
        userId: users[4]._id,
        totalDistance: 8,
        totalActivities: 1,
        totalCalories: 550,
        rank: 2,
        teamId: teams[0]._id
      },
      {
        userId: users[1]._id,
        totalDistance: 20,
        totalActivities: 1,
        totalCalories: 450,
        rank: 3,
        teamId: teams[1]._id
      },
      {
        userId: users[2]._id,
        totalDistance: 1.5,
        totalActivities: 1,
        totalCalories: 280,
        rank: 4,
        teamId: teams[1]._id
      },
      {
        userId: users[3]._id,
        totalDistance: 0,
        totalActivities: 1,
        totalCalories: 400,
        rank: 5,
        teamId: teams[2]._id
      }
    ]);
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    // Verify data creation
    console.log('\n=== Data Verification ===');
    const userCount = await User.countDocuments();
    const teamCount = await Team.countDocuments();
    const activityCount = await Activity.countDocuments();
    const leaderboardCount = await Leaderboard.countDocuments();
    const workoutCount = await Workout.countDocuments();

    console.log(`✓ Users: ${userCount}`);
    console.log(`✓ Teams: ${teamCount}`);
    console.log(`✓ Activities: ${activityCount}`);
    console.log(`✓ Leaderboard Entries: ${leaderboardCount}`);
    console.log(`✓ Workouts: ${workoutCount}`);

    console.log('\n✓ Seed the octofit_db database with test data - COMPLETED');
    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
