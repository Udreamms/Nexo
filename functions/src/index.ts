import { initializeApp } from "firebase-admin/app";

initializeApp();

export { onLeadCreated } from "./triggers/onLeadCreated";
export { dailyUfSync } from "./scheduled/dailyUfSync";
