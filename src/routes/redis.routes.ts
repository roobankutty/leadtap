import { Router } from "express";
import { redisClient } from "../config/redis";

const router = Router();

console.log("📦 Redis Route Loaded");

router.get("/test", async (req, res) => {
  console.log("🔥 /api/redis/test called");

  try {
    console.log("PID:", process.pid);
    console.log("isOpen:", redisClient.isOpen);
    console.log("isReady:", redisClient.isReady);

    // If not connected, connect now
    if (!redisClient.isOpen) {
      console.log("🔄 Redis not open. Connecting...");
      await redisClient.connect();
    }

    // Test Redis
    const pong = await redisClient.ping();

    await redisClient.set("render-test", "Redis Working!", {
      EX: 60,
    });

    const value = await redisClient.get("render-test");

    res.json({
      success: true,
      pid: process.pid,
      isOpen: redisClient.isOpen,
      isReady: redisClient.isReady,
      ping: pong,
      value,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("❌ Redis Route Error:", error);

    res.status(500).json({
      success: false,
      pid: process.pid,
      isOpen: redisClient.isOpen,
      isReady: redisClient.isReady,
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
  }
});

export default router;