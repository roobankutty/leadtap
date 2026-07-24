import express from "express";
import {
  fetchLeads,
  dashboard,
  login,
  getSettings,
  updateSettings,
} from "../controllers/admin.controller";

const router = express.Router();
/*router.get("/test", (req, res) => {
  res.send("Admin routes working");
});*/
router.post("/login", login);

router.get("/settings", getSettings);

router.put("/settings", updateSettings);

router.get("/dashboard", dashboard);
router.get("/leads", fetchLeads);

export default router;