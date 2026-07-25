import { MongoClient, Db } from "mongodb";

export interface StoredLead {
  id: string; // MongoDB uses string IDs (_id)
  propertyId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

// 1. Maintain a single connection instance
let dbInstance: Db | null = null;

async function getDatabase(): Promise<Db> {
  if (dbInstance) return dbInstance;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  
  // Connects to your default database in Atlas (or specify name like client.db("leadtap"))
  dbInstance = client.db(); 
  return dbInstance;
}

// 2. Read all leads from MongoDB
export async function getAllLeads(): Promise<StoredLead[]> {
  try {
    const db = await getDatabase();
    const leadsCollection = db.collection("leads");

    // Fetch leads and map MongoDB's `_id` to `id` for consistency
    const docs = await leadsCollection.find({}).sort({ createdAt: -1 }).toArray();

    return docs.map((doc) => ({
      id: doc._id.toString(),
      propertyId: doc.propertyId,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      message: doc.message,
      createdAt: doc.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching leads from MongoDB:", error);
    return [];
  }
}

// 3. Save a new lead to MongoDB
export async function saveLead(
  lead: Omit<StoredLead, "id" | "createdAt">
) {
  console.log("Saving lead to MongoDB:", lead);

  const db = await getDatabase();
  const leadsCollection = db.collection("leads");

  const createdAt = new Date().toISOString();

  // Insert document into 'leads' collection
  const result = await leadsCollection.insertOne({
    ...lead,
    createdAt,
  });

  const newLead: StoredLead = {
    id: result.insertedId.toString(),
    createdAt,
    ...lead,
  };

  return newLead;
}