import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "../config/env";

/** Inicialización perezosa: el servidor arranca aunque Firebase no esté configurado. */
function ensureApp() {
  if (getApps().length > 0) return;
  initializeApp(
    env.firebaseServiceAccount
      ? {
          credential: cert(JSON.parse(env.firebaseServiceAccount)),
          projectId: env.firebaseProjectId,
        }
      : { projectId: env.firebaseProjectId },
  );
}

export function db() {
  ensureApp();
  return getFirestore();
}

export function auth() {
  ensureApp();
  return getAuth();
}
