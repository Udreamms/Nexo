import { getFirestore } from "firebase-admin/firestore";
import { logger } from "firebase-functions/v2";
import { onSchedule } from "firebase-functions/v2/scheduler";

interface MIndicadorUf {
  serie: Array<{ valor: number; fecha: string }>;
}

/** Guarda el valor diario de la UF en `config/uf` para que backend y frontend lo lean. */
export const dailyUfSync = onSchedule(
  { schedule: "every day 08:00", timeZone: "America/Santiago" },
  async () => {
    const res = await fetch("https://mindicador.cl/api/uf");
    if (!res.ok) {
      logger.error("No se pudo leer la UF", { status: res.status });
      return;
    }
    const data = (await res.json()) as MIndicadorUf;
    const hoy = data.serie[0];
    if (!hoy) return;
    await getFirestore().doc("config/uf").set({ valor: hoy.valor, fecha: hoy.fecha });
    logger.info("UF actualizada", hoy);
  },
);
