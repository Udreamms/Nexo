import type { GrupoId, IsapreNombre, Plan } from "./types";

/** Valor de la UF de referencia. En producción debe venir de una API (p. ej. mindicador.cl). */
export const UF_CLP = 41226.39;

/** Tope imponible mensual en UF para el cálculo del 7%. */
export const TOPE_IMPONIBLE_UF = 90;

/** Tramos de edad: [desdeAnios, factorTitular, factorCarga]. */
export const TRAMOS_EDAD: ReadonlyArray<readonly [number, number, number]> = [
  [0, 0.6, 0.6],
  [20, 0.9, 0.7],
  [25, 1.0, 0.7],
  [35, 1.3, 0.9],
  [45, 1.4, 1.0],
  [55, 2.0, 1.4],
  [65, 2.4, 2.2],
];

/** Cobertura GES mensual por persona, en UF. */
export const GES_POR_ISAPRE: Readonly<Record<IsapreNombre, number>> = {
  "Vida Tres": 0.712,
  Consalud: 0.731,
  "Banmédica": 0.778,
  "Nueva Masvida": 0.854,
  Esencial: 0.91,
  "Cruz Blanca": 0.971,
  Colmena: 1.036,
};

/** Muestra de planes. En producción se lee desde Firestore vía backend. */
export const PLANES_MUESTRA: ReadonlyArray<Plan> = [
  { isapre: "Banmédica", baseUf: 0.94 },
  { isapre: "Banmédica", baseUf: 1.52 },
  { isapre: "Vida Tres", baseUf: 1.62 },
  { isapre: "Cruz Blanca", baseUf: 1.4 },
  { isapre: "Colmena", baseUf: 1.29 },
  { isapre: "Esencial", baseUf: 1.1 },
];

export interface GrupoPreset {
  id: GrupoId;
  etiqueta: string;
  edadTitularEjemplo: number;
  acompanantes: ReadonlyArray<{ relacion: "conyuge" | "hijo"; edadEjemplo: number }>;
}

export const GRUPOS: ReadonlyArray<GrupoPreset> = [
  { id: "yo", etiqueta: "Solo yo", edadTitularEjemplo: 32, acompanantes: [] },
  {
    id: "pareja",
    etiqueta: "En pareja",
    edadTitularEjemplo: 32,
    acompanantes: [{ relacion: "conyuge", edadEjemplo: 31 }],
  },
  {
    id: "hijos",
    etiqueta: "Con mis hijos",
    edadTitularEjemplo: 38,
    acompanantes: [
      { relacion: "conyuge", edadEjemplo: 36 },
      { relacion: "hijo", edadEjemplo: 6 },
    ],
  },
  {
    id: "mayores",
    etiqueta: "Mayores de 60",
    edadTitularEjemplo: 66,
    acompanantes: [{ relacion: "conyuge", edadEjemplo: 64 }],
  },
];

export const ISAPRES_ABIERTAS: ReadonlyArray<IsapreNombre> = [
  "Banmédica",
  "Colmena",
  "Consalud",
  "Cruz Blanca",
  "Esencial",
  "Nueva Masvida",
  "Vida Tres",
];

export const ETIQUETA_RELACION = { conyuge: "Pareja", hijo: "Hijo/a" } as const;
