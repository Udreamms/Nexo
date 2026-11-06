import { Router } from "express";
import { quoteController } from "../controllers/quote.controller";
import { requireAuth, requireRole } from "../middleware/auth";
import { asyncHandler, validateBody } from "../middleware/http";
import { createLimiters } from "../middleware/security";
import { leadSchema, quoteRequestSchema } from "../schemas/quote.schema";

/** API versionada: las apps móviles publicadas siguen usando /v1 aunque aparezca /v2. */
export function createV1Router() {
  const router = Router();
  const limits = createLimiters();

  router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Públicas (limitadas por IP)
  router.post("/quote", limits.general, validateBody(quoteRequestSchema), (req, res) =>
    quoteController.calculate(req, res),
  );
  router.post(
    "/leads",
    limits.strict,
    validateBody(leadSchema),
    asyncHandler((req, res) => quoteController.createLead(req, res)),
  );

  // Privadas: requieren Firebase ID token con rol "agent"
  router.get(
    "/leads",
    limits.general,
    requireAuth,
    requireRole("agent"),
    asyncHandler((req, res) => quoteController.listLeads(req, res)),
  );

  return router;
}
