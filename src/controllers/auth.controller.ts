import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAdmin } from "../services/auth.service";

export async function login(req: Request, res: Response) {
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  return res.json({
    headers: req.headers,
    body: req.body,
  });
}