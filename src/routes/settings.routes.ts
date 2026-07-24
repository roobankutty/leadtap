import { Router } from "express";
import {
  fetchSettings,
  updateSettings,
} from "../controllers/settings.controller";

const router = Router();

router.get("/", fetchSettings);
router.put("/", updateSettings);

export default router;