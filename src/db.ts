// src/db.ts
import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("❌ MONGO_URI environment variable is missing in .env file");
}

const client = new MongoClient(mongoUri);
let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (!db) {
    await client.connect();
    // Replaces 'leadtap' with your preferred database name if different
    db = client.db("leadtap");
    console.log("✅ Successfully connected to MongoDB Atlas");
  }
  return db;
}