import { Request, Response, NextFunction } from "express";
import { leadSchema } from "../schemas/lead.schema";

export function validateLead(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const result = leadSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  // Replace req.body with validated data
  req.body = result.data;

  next();
}