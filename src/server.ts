import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./config/swagger";
import propertyRoutes from "./routes/property.routes";
import taxonomyRoutes from "./routes/taxonomy.routes";
import leadRoutes from "./routes/lead.routes";
import webhookRoutes from "./routes/webhook.routes";
import adminRoutes from "./routes/admin.routes";
import settingsRoutes from "./routes/settings.routes";

import { errorHandler } from "./middleware/errorHandler";
import logger from "./utils/logger";
import { requestLogger } from "./middleware/requestLogger";
import helmet from "helmet";
import compression from "compression";

const app = express();

/* console.log("SERVER FILE:", __filename);
console.log("Admin routes imported:", adminRoutes);
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});*/
// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        service: "Property Backend API",
        version: "1.0.0",
        status: "Running",
        timestamp: new Date().toISOString()
    });
});
/* app.get("/", (req, res) => {
  res.send("ROOBAN BACKEND TEST");
});
app.get("/api/admin/test", (req, res) => {
  res.send("DIRECT SERVER TEST");
});*/

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
/*console.log("SETTINGS ROUTE MOUNTED");
console.log("Settings route loaded");
app.use("/api/admin", (req, res, next) => {
  console.log("ADMIN REQUEST:", req.method, req.originalUrl);
  next();
});*/
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

// Start Server
app.listen(PORT, () => {
    logger.info(`🚀 Server started on port ${PORT}`);
    logger.info(`🌐 WordPress GraphQL: ${process.env.WORDPRESS_GRAPHQL}`);
});

// Global Error Handler
app.use(errorHandler);
