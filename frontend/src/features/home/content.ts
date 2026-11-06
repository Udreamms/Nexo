import type { IconName } from "@/components/ui/Icon";

export const PASOS: ReadonlyArray<{ icono: IconName; titulo: string; texto: string }> = [
  {
    icono: "balance",
    titulo: "Ves tus planes al instante",
    texto: "Tu 7% y los 3 planes que más te convienen, sin dejar tus datos.",
  },
  {
    icono: "chat",
    titulo: "Te enviamos la comparación",
    texto: "Por WhatsApp, y nuestro equipo resuelve tus dudas en simple.",
  },
  {
    icono: "check",
    titulo: "Te ayudamos a cambiarte",
    texto: "Hacemos la cotización oficial y el trámite contigo, sin complicarte.",
  },
];

export const BENEFICIOS: ReadonlyArray<{ icono: IconName; titulo: string; texto: string }> = [
  {
    icono: "balance",
    titulo: "Sabes exactamente lo que pagas",
    texto: "Antes de decidir, ves cuánto cubre tu 7% y si te sobra o te falta.",
  },
  {
    icono: "people",
    titulo: "Especialistas que te hablan en simple",
    texto: "Agentes registrados en la Superintendencia de Salud, sin presión.",
  },
  {
    icono: "document",
    titulo: "Te cambias sin papeleo",
    texto: "Nos encargamos del trámite contigo, de principio a fin.",
  },
  {
    icono: "bell",
    titulo: "No te dejamos solo después",
    texto: "Te avisamos de las alzas y te ayudamos con reembolsos y licencias.",
  },
];

export const TESTIMONIOS: ReadonlyArray<{ texto: string; nombre: string; comuna: string }> = [1, 2, 3].map(
  (n) => ({
    texto: `[COMPLETAR: testimonio ${n}. Idealmente 2 o 3 líneas sobre qué le resolvió el equipo, por ejemplo cuánto ahorró o qué cobertura ganó.]`,
    nombre: "[COMPLETAR: nombre]",
    comuna: "[COMPLETAR: comuna]",
  }),
);

export const PREGUNTAS: ReadonlyArray<{ pregunta: string; respuesta: string }> = [
  {
    pregunta: "¿Cuánto cuesta usar Nexo Salud?",
    respuesta: "Nada. Comparar planes y recibir asesoría es gratis para ti.",
  },
  {
    pregunta: "¿Por qué es gratis?",
    respuesta:
      "Porque la Isapre le paga una comisión al agente cuando te cambias. Tu plan cuesta exactamente lo mismo que si fueras directo, y el orden de los planes depende solo de lo que más te conviene a ti.",
  },
  {
    pregunta: "¿Tengo que dejar mis datos para ver los planes?",
    respuesta:
      "No. Ves los planes y precios sin dejar nombre ni teléfono. Solo te pedimos tu WhatsApp si quieres recibir la comparación y que nuestro equipo te ayude a elegir.",
  },
  {
    pregunta: "¿Y si mi plan actual ya es bueno?",
    respuesta: "Te lo decimos. Si no te conviene cambiarte, no te vamos a insistir.",
  },
  {
    pregunta: "¿El precio que veo es el final?",
    respuesta:
      "En UF es el mismo que cobra la Isapre. En pesos es aproximado porque depende de la UF del mes. Un agente registrado confirma la cotización oficial antes de firmar.",
  },
  {
    pregunta: "¿Mi bebé paga plan?",
    respuesta:
      "Hasta antes de cumplir 2 años no paga factor, solo el GES. Con 2 años cumplidos paga factor 0,6 más el GES.",
  },
];
