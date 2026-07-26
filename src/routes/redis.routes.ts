import { Router } from "express";
import { redisClient } from "../config/redis";

const router = Router();

router.get("/test", async (req, res) => {
  try {
    // Save data
    await redisClient.set("message", "Redis is working!", {
      EX: 60,
    });

    // Read data
    const value = await redisClient.get("message");

    res.json({
      success: true,
      value,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
});

export default router;