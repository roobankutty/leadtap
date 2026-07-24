import fs from "fs/promises";
import path from "path";

export interface StoredLead {
  id: number;
  propertyId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const FILE_PATH = path.join(process.cwd(), "data", "leads.json");

// Read all leads
export async function getAllLeads(): Promise<StoredLead[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save a new lead
export async function saveLead(
  lead: Omit<StoredLead, "id" | "createdAt">
) {
	console.log("Saving lead:", lead);
	
  const leads = await getAllLeads();

  const newLead: StoredLead = {
    id: leads.length + 1,
    createdAt: new Date().toISOString(),
    ...lead,
  };

  leads.push(newLead);

  await fs.writeFile(FILE_PATH, JSON.stringify(leads, null, 2));

  return newLead;
}