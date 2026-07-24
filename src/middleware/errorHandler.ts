import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  logger.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}