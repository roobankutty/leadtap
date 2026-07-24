import { Router } from "express";
import {
  fetchProperties,
  fetchPropertyBySlug,
} from "../controllers/property.controller";

const router = Router();

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved properties.
 */
router.get("/", fetchProperties);

/**
 * @swagger
 * /api/properties/{slug}:
 *   get:
 *     summary: Get property by slug
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property found.
 *       404:
 *         description: Property not found.
 */
router.get("/:slug", fetchPropertyBySlug);

export default router;