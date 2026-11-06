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

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "No encontrado" });
}

interface HttpLikeError {
  status?: number;
  type?: string;
}

/** Nunca filtra detalles internos al cliente. */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Datos inválidos", details: err.flatten().fieldErrors });
    return;
  }
  const e = err as HttpLikeError;
  if (e?.type === "entity.parse.failed") {
    res.status(400).json({ error: "JSON inválido" });
    return;
  }
  if (e?.type === "entity.too.large") {
    res.status(413).json({ error: "Solicitud demasiado grande" });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Error interno" });
}
