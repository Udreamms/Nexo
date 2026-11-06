import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { env } from "../config/env";

export const securityHeaders = helmet();

/**
 * Lista blanca de orígenes web. Las peticiones sin cabecera Origin (apps móviles,
 * servidores, curl) se aceptan: CORS solo protege a los navegadores.
 */
export const corsPolicy = cors({
  origin(origin, callback) {
    callback(null, !origin || env.corsOrigins.includes(origin));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 600,
});

const limiter = (limit: number) =>
  rateLimit({
    windowMs: 60_000,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Demasiadas solicitudes, intenta más tarde" },
  });

/** Los limitadores se crean por router para no compartir estado entre instancias (ni en tests). */
export const createLimiters = () => ({
  general: limiter(120),
  strict: limiter(10),
});
