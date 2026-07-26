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
  } catch (error: any) {
    console.error("Redis Test Error:", error);

    res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack, // remove this later in production
    });
    }
});

export default router;