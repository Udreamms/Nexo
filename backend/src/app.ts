import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middleware/http";
import { apiRouter } from "./routes";

export function createApp() {
  const app = express();
  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: "100kb" }));
  app.use("/api", apiRouter);
  app.use(errorHandler);
  return app;
}
