import type { RequestHandler } from "express";
import { auth } from "../lib/firebase";

export interface AuthUser {
  uid: string;
  role?: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}

/**
 * Exige un ID token de Firebase Auth en `Authorization: Bearer <token>`.
 * Funciona igual para web, Android e iOS: todos inician sesión con Firebase Auth.
 */
export const requireAuth: RequestHandler = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "No autenticado" });
    return;
  }
  try {
    const decoded = await auth().verifyIdToken(header.slice("Bearer ".length));
    req.user = {
      uid: decoded.uid,
      role: typeof decoded.role === "string" ? decoded.role : undefined,
    };
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o vencido" });
  }
};

/** Autorización por rol (custom claim `role` asignado desde el backend). */
export const requireRole =
  (role: string): RequestHandler =>
  (req, res, next) => {
    if (req.user?.role !== role) {
      res.status(403).json({ error: "Sin permisos" });
      return;
    }
    next();
  };
