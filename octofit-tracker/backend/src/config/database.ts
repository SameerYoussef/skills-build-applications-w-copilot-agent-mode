import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Create connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority' as const
};

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    console.log('✓ Connected to MongoDB');
    return mongoose.connection;
  } catch (error: any) {
    console.error('✗ MongoDB connection error:', error.message);
    throw error;
  }
}

export const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

export default db;
