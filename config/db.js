import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});