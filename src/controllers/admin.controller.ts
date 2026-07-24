import { Request, Response } from "express";
import { getAllLeads } from "../services/leadStorage.service";
import { getProperties } from "../services/wordpress.service";
import { getAdmin, saveAdmin } from "../services/admin.service";

// GET /api/admin/leads
export async function fetchLeads(req: Request, res: Response) {
  const leads = await getAllLeads();

  res.json({
    success: true,
    total: leads.length,
    data: leads,
  });
}


// GET /api/admin/dashboard
export async function dashboard(req: Request, res: Response) {
  const leads = await getAllLeads();

  const propertyResult = await getProperties();

  const now = new Date();

  const todayLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.createdAt);

    return (
      leadDate.getDate() === now.getDate() &&
      leadDate.getMonth() === now.getMonth() &&
      leadDate.getFullYear() === now.getFullYear()
    );
  }).length;


  const thisMonthLeads = leads.filter((lead) => {
    const leadDate = new Date(lead.createdAt);

    return (
      leadDate.getMonth() === now.getMonth() &&
      leadDate.getFullYear() === now.getFullYear()
    );
  }).length;


  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);


  res.json({
    totalProperties: propertyResult.total || 0,
    totalLeads: leads.length || 0,
    todayLeads: todayLeads || 0,
    thisMonthLeads: thisMonthLeads || 0,
    recentLeads,
  });
}

// POST /api/admin/login
export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const admin = getAdmin();

  if (
    username === admin.username &&
    password === admin.password
  ) {
    return res.json({
      success: true,
      user: {
        username: admin.username,
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password",
  });
}

// GET /api/admin/settings
export async function getSettings(req: Request, res: Response) {
  const admin = getAdmin();

  res.json({
    username: admin.username,
  });
}

// PUT /api/admin/settings
export async function updateSettings(req: Request, res: Response) {
  const { username, password } = req.body;

  saveAdmin({
    username,
    password,
  });

  res.json({
    success: true,
    message: "Settings updated successfully",
  });
}