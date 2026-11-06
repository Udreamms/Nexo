import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

export const validateBody =
  <T>(schema: ZodSchema<T>): RequestHandler =>
  (req, _res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return next(parsed.error);
    req.body = parsed.data;
    next();
  };

/** Permite handlers async sin try/catch repetido. */
export const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<void>): RequestHandler =>
  (req, res, next) => {
    fn(req, res).catch(next);
  };

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Datos inválidos", details: err.flatten() });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Error interno" });
}
