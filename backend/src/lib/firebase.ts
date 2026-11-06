import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { env } from "../config/env";

/** Inicialización perezosa: el servidor arranca aunque Firebase no esté configurado. */
export function db() {
  if (getApps().length === 0) initializeApp({ projectId: env.firebaseProjectId });
  return getFirestore();
}
