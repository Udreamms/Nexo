import { Router } from "express";
import { quoteController } from "../controllers/quote.controller";
import { asyncHandler, validateBody } from "../middleware/http";
import { leadSchema, quoteRequestSchema } from "../schemas/quote.schema";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRouter.post("/quote", validateBody(quoteRequestSchema), (req, res) =>
  quoteController.calculate(req, res),
);

apiRouter.post(
  "/leads",
  validateBody(leadSchema),
  asyncHandler((req, res) => quoteController.createLead(req, res)),
);
