import { Request, Response } from "express";
import {
  getSettings,
  saveSettings,
} from "../services/settings.service";

export async function fetchSettings(req: Request, res: Response) {
  const settings = await getSettings();

  res.json({
    success: true,
    data: settings,
  });
}

export async function updateSettings(req: Request, res: Response) {
  const settings = await saveSettings(req.body);

  res.json({
    success: true,
    message: "Settings updated successfully",
    data: settings,
  });
}