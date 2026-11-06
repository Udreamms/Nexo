export const env = {
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  firebaseProjectId: process.env.GCLOUD_PROJECT ?? "nexo-dev",
} as const;
