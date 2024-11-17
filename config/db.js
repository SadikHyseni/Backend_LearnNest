import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

export async function connectDB() {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      console.log('Connected to MongoDB');
      return client.db('LearnNest');
    } catch (err) {
      console.error('MongoDB connection failed:', err.message);
      process.exit(1);
    }
  }