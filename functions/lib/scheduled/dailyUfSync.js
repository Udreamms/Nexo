"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyUfSync = void 0;
const firestore_1 = require("firebase-admin/firestore");
const v2_1 = require("firebase-functions/v2");
const scheduler_1 = require("firebase-functions/v2/scheduler");
/** Guarda el valor diario de la UF en `config/uf` para que el backend y los clientes lo lean. */
exports.dailyUfSync = (0, scheduler_1.onSchedule)({ schedule: "every day 08:00", timeZone: "America/Santiago" }, async () => {
    const res = await fetch("https://mindicador.cl/api/uf");
    if (!res.ok) {
        v2_1.logger.error("No se pudo leer la UF", { status: res.status });
        return;
    }
    const data = (await res.json());
    const hoy = data.serie[0];
    if (!hoy)
        return;
    await (0, firestore_1.getFirestore)().doc("config/uf").set({ valor: hoy.valor, fecha: hoy.fecha });
    v2_1.logger.info("UF actualizada", hoy);
});
//# sourceMappingURL=dailyUfSync.js.map