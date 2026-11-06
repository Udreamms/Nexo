"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLeadCreated = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const v2_1 = require("firebase-functions/v2");
/** Se ejecuta al crearse un lead. Punto de enganche para notificar al equipo (WhatsApp, email, CRM). */
exports.onLeadCreated = (0, firestore_1.onDocumentCreated)("leads/{leadId}", (event) => {
    const lead = event.data?.data();
    v2_1.logger.info("Nuevo lead", { id: event.params.leadId, grupo: lead?.grupo });
});
//# sourceMappingURL=onLeadCreated.js.map