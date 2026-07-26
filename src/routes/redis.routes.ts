import { Router } from "express";
import { redisClient } from "../config/redis";

const router = Router();

console.log("📦 Redis Route Loaded");

router.get("/test", async (req, res) => {
  console.log("🔥 /api/redis/test called");

  res.json({
    pid: process.pid,
    isOpen: redisClient.isOpen,
    isReady: redisClient.isReady,
    time: new Date().toISOString(),
  });
});

export default router;