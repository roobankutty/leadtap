import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = header.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}