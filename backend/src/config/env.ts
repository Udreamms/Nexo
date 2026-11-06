import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  FIREBASE_PROJECT_ID: z.string().min(1).default("nexo-dev"),
  FIREBASE_SERVICE_ACCOUNT: z.string().optional(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("Variables de entorno inválidas:", parsed.error.flatten().fieldErrors);
  throw new Error("Configuración de entorno inválida");
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  isProduction: parsed.data.NODE_ENV === "production",
  port: parsed.data.PORT,
  corsOrigins: parsed.data.CORS_ORIGINS.split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  firebaseProjectId: parsed.data.FIREBASE_PROJECT_ID,
  firebaseServiceAccount: parsed.data.FIREBASE_SERVICE_ACCOUNT,
} as const;
