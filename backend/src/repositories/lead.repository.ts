import type { Lead } from "@nexo/shared";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../lib/firebase";

const COLLECTION = "leads";

export const leadRepository = {
  async create(lead: Lead): Promise<string> {
    const ref = await db()
      .collection(COLLECTION)
      .add({ ...lead, status: "nuevo", createdAt: FieldValue.serverTimestamp() });
    return ref.id;
  },
};
