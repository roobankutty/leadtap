import { createClient } from "redis";

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

// Events
redisClient.on("connect", () => {
  console.log("🔄 Redis Socket Connected");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Client Ready");
});

redisClient.on("reconnecting", () => {
  console.log("♻️ Redis Reconnecting...");
});

redisClient.on("end", () => {
  console.log("❌ Redis Connection Closed");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

/**
 * Connect Redis only once
 */
export async function connectRedis(): Promise<void> {
  try {
    // Already connected and ready
    if (redisClient.isReady) {
      console.log("✅ Redis already connected");
      return;
    }

    // Socket not open yet
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    // Wait until ready
    let retries = 10;

    while (!redisClient.isReady && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      retries--;
    }

    if (!redisClient.isReady) {
      throw new Error("Redis client did not become ready.");
    }

    // Verify Redis commands work
    const pong = await redisClient.ping();
    console.log("🏓 Redis Ping:", pong);

    console.log("✅ Redis Connected Successfully");
  } catch (err) {
    console.error("❌ Failed to connect Redis:", err);
    throw err;
  }
}