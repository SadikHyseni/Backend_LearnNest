import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'LearnNest';
let db;// To store the connected database instance

export async function connectDB() {
  try {
      const client = new MongoClient(uri);
      await client.connect();
      console.log('Connected to MongoDB Atlas');
      db = client.db(dbName);
  } catch (err) {
      console.error('MongoDB connection failed:', err);
      process.exit(1);
  }
}

export function getCollection(collectionName) {
    if (!db) {
        throw new Error('Database not connected. Call connectDB() first.');
    }
    return db.collection(collectionName);
}