import { Request, Response, NextFunction } from "express";
import { getTaxonomies } from "../services/taxonomy.service";

export async function fetchTaxonomies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await getTaxonomies();

    res.json(data);
  } catch (err) {
    next(err);
  }
}