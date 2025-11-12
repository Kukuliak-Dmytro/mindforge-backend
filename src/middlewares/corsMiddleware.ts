import { Request, Response, NextFunction } from "express";
import cors from "cors";

/**
 * CORS middleware configuration
 * Allows requests from the frontend URL specified in FRONTEND_URL environment variable
 */
const frontendUrl = process.env.FRONTEND_URL;
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) {
      return callback(null, true);
    }

    // Check if the origin matches the frontend URL
    if (origin === frontendUrl) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and authentication headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
};

/**
 * CORS middleware
 * Must be registered before other middleware and routes
 */
export const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
