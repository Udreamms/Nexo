import express from "express";
import { errorHandler, notFound } from "./middleware/http";
import { corsPolicy, securityHeaders } from "./middleware/security";
import { createV1Router } from "./routes";

export function createApp() {
  const app = express();
  app.set("trust proxy", 1); // detrás de Vercel/Cloud Run: IP real para el rate limit
  app.use(securityHeaders);
  app.use(corsPolicy);
  app.use(express.json({ limit: "20kb" }));
  app.use("/api/v1", createV1Router());
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
