import express from "express";
import {
  fetchLeads,
  dashboard,
  getSettings,
  updateSettings,
} from "../controllers/admin.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { login } from "../controllers/auth.controller";

const router = express.Router();
/*router.get("/test", (req, res) => {
  res.send("Admin routes working");
});*/
router.post("/login", login);

router.get("/settings", verifyToken, getSettings);

router.put("/settings", verifyToken, updateSettings);

router.get("/dashboard", verifyToken, dashboard);
router.get("/leads", verifyToken,fetchLeads);

export default router;