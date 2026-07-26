import { Router } from "express";
import { redisClient } from "../config/redis";

const router = Router();

router.get("/test", async (req, res) => {
  try {
    console.log("isOpen:", redisClient.isOpen);
    console.log("isReady:", redisClient.isReady);

    await redisClient.ping();
    console.log("PING OK");

    await redisClient.set("message", "Redis is working!");
    const value = await redisClient.get("message");

    res.json({
      success: true,
      value,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      name: error.name,
      code: error.code,
    });
  }
});

export default router;