import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions/v2";

/** Se ejecuta al crearse un lead. Punto de enganche para notificar al equipo (WhatsApp, email, CRM). */
export const onLeadCreated = onDocumentCreated("leads/{leadId}", (event) => {
  const lead = event.data?.data();
  logger.info("Nuevo lead", { id: event.params.leadId, grupo: lead?.grupo });
});
