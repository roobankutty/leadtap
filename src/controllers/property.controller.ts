import { Request, Response } from "express";
import {
  getProperties,
  getPropertyBySlug,
} from "../services/wordpress.service";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";

export const fetchProperties = asyncHandler(async (req, res) => {

  const filters = {
    city: req.query.city as string,
    type: req.query.type as string,
    status: req.query.status as string,
    search: req.query.search as string,
  };

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;

  const result = await getProperties(filters, page, limit);

  res.json({
    success: true,
    ...result,
  });

});

export const fetchPropertyBySlug = asyncHandler(async (req, res) => {

  const slug = String(req.params.slug);

  const property = await getPropertyBySlug(slug);

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  res.json({
    success: true,
    property,
  });

});