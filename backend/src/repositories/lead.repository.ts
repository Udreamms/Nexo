import type { Lead } from "@nexo/shared";
import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";

const COLLECTION = "leads";

export interface StoredLead extends Lead {
  id: string;
  status: string;
  createdAt: number | null;
}

export const leadRepository = {
  async create(lead: Lead): Promise<string> {
    const ref = await db()
      .collection(COLLECTION)
      .add({ ...lead, status: "nuevo", createdAt: FieldValue.serverTimestamp() });
    return ref.id;
  },

  async list(limit = 50): Promise<StoredLead[]> {
    const snap = await db().collection(COLLECTION).orderBy("createdAt", "desc").limit(limit).get();
    return snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        whatsapp: data.whatsapp,
        grupo: data.grupo,
        edades: data.edades,
        sueldoLiquido: data.sueldoLiquido,
        utm: data.utm,
        status: data.status,
        createdAt: (data.createdAt as Timestamp | undefined)?.toMillis() ?? null,
      };
    });
  },
};
