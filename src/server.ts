import "dotenv/config";
import { connectRedis, redisClient } from "./config/redis";
import redisRoutes from "./routes/redis.routes";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb"; // 1. Imported native MongoClient
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger";
import propertyRoutes from "./routes/property.routes";
import taxonomyRoutes from "./routes/taxonomy.routes";
import leadRoutes from "./routes/lead.routes";
import webhookRoutes from "./routes/webhook.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import settingsRoutes from "./routes/settings.routes";

import { errorHandler } from "./middleware/errorHandler";
import logger from "./utils/logger";
import { requestLogger } from "./middleware/requestLogger";
import helmet from "helmet";
import compression from "compression";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/redis", redisRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Client Initialization
const MONGO_URI = process.env.MONGO_URI || "";
let isDbConnected = false;

if (!MONGO_URI) {
    logger.error("❌ MONGO_URI is missing in environment variables!");
} else {
    const client = new MongoClient(MONGO_URI);
    
    // Connect to MongoDB Atlas
    client.connect()
        .then(() => {
            isDbConnected = true;
            logger.info("✅ Successfully connected to MongoDB Atlas!");
        })
        .catch((err: any) => {
            isDbConnected = false;
            logger.error(`❌ MongoDB Connection Error: ${err.message}`);
        });
}

// Health Check Endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        service: "Property Backend API",
        version: "1.0.0",
        status: "Running",
        database: isDbConnected ? "Connected" : "Disconnected",
        timestamp: new Date().toISOString()
    });
});

app.use(helmet());
app.use(compression());

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/taxonomies", taxonomyRoutes);
app.use("/api/leads", leadRoutes);

console.log(
  "Settings routes:",
  settingsRoutes.stack.map((layer: any) => {
    return layer.route?.path;
  })
);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);

// CRM Hooks
app.use("/api/webhook", webhookRoutes);

// Swagger Documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(requestLogger);

console.log("MAIL_HOST:", process.env.MAIL_HOST);
console.log("MAIL_PORT:", process.env.MAIL_PORT);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect Redis
    await connectRedis();

    console.log("Redis Connected");
    console.log("isOpen:", redisClient.isOpen);
    console.log("isReady:", redisClient.isReady);

    // Test Redis
    await redisClient.set("test", "hello");
    const value = await redisClient.get("test");

    console.log("Redis Value:", value);

    // Start Express
    app.listen(PORT, () => {
      logger.info(`🚀 Server started on port ${PORT}`);
      logger.info(
        `🌐 WordPress GraphQL: ${process.env.WORDPRESS_GRAPHQL}`
      );
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

// Start Server
app.listen(PORT, () => {
    logger.info(`🚀 Server started on port ${PORT}`);
    logger.info(`🌐 WordPress GraphQL: ${process.env.WORDPRESS_GRAPHQL}`);
});

// Global Error Handler
app.use(errorHandler);