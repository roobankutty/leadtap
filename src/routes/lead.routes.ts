import { Router } from "express";
import { submitLead, getLeads } from "../controllers/lead.controller";
import { validateLead } from "../middleware/validateLead";
import { apiLimiter } from "../middleware/rateLimiter";
const router = Router();

/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Submit a property enquiry
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - name
 *               - email
 *               - phone
 *               - message
 *             properties:
 *               propertyId:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Rooban Shanmugam
 *               email:
 *                 type: string
 *                 example: rooban@gmail.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               message:
 *                 type: string
 *                 example: I'm interested in this property.
 *     responses:
 *       201:
 *         description: Lead submitted successfully
 *       400:
 *         description: Validation failed
 */

router.post(
  "/",
  apiLimiter,
  validateLead,
  submitLead
);

router.get(
  "/",
  getLeads
);

export default router;