import express from "express";
import errorHandler from "./src/middlewares/errorHandler";
import router from "./src/routes/index";
import corsMiddleware from "./src/middlewares/corsMiddleware";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/auth";

const app = express();
// CORS middleware - must be registered first
app.use(corsMiddleware);

// Better Auth routes - must be mounted before express.json()
// Handle all /api/auth/* routes (Express v5 uses /*splat pattern)
app.all("/api/auth/*splat", toNodeHandler(auth));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);

// Error handling middleware must be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
