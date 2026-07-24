import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAdmin } from "../services/auth.service";

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const admin = await getAdmin();

  if (admin.username !== username) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { username: admin.username },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  );

  res.json({
    success: true,
    token,
  });
}