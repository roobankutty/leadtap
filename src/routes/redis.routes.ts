import { Router } from "express";
import { redisClient } from "../config/redis";

const router = Router();

router.get("/test", async (req, res) => {
  res.json({
    isOpen: redisClient.isOpen,
    isReady: redisClient.isReady,
  });
});

export default router;