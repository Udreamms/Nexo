import {
  GES_POR_ISAPRE,
  PLANES_MUESTRA,
  TOPE_IMPONIBLE_UF,
  TRAMOS_EDAD,
  UF_CLP,
} from "./constants";
import type {
  CotizacionInput,
  CotizacionResultado,
  Persona,
  Plan,
  PlanCotizado,
} from "./types";

const redondear3 = (n: number): number => Math.round(n * 1000) / 1000;

/** Factor de riesgo por edad. Menores de 2 años no pagan factor (solo GES). */
export function factorEdad(anios: number, esCarga: boolean): number {
  if (anios < 2) return 0;
  let tramo = TRAMOS_EDAD[0]!;
  for (const t of TRAMOS_EDAD) if (anios >= t[0]) tramo = t;
  return esCarga ? tramo[2] : tramo[1];
}

/** Valor mensual de una persona en un plan: base × factor + GES. */
export function valorPersona(plan: Plan, persona: Persona): number {
  return redondear3(
    plan.baseUf * factorEdad(persona.anios, persona.esCarga) + GES_POR_ISAPRE[plan.isapre],
  );
}

export function cotizarPlan(plan: Plan, personas: Persona[]): PlanCotizado {
  const totalUf = personas.reduce((acc, p) => acc + valorPersona(plan, p), 0);
  return { ...plan, totalUf: redondear3(totalUf) };
}

/** 7% de la cotización legal: 0,07 × min(líquido ÷ 0,8, tope en UF). */
export function sieteClp(sueldoLiquido: number, ufClp: number = UF_CLP): number {
  return 0.07 * Math.min(sueldoLiquido / 0.8, TOPE_IMPONIBLE_UF * ufClp);
}

export function cotizar(
  input: CotizacionInput,
  planes: ReadonlyArray<Plan> = PLANES_MUESTRA,
  ufClp: number = UF_CLP,
): CotizacionResultado {
  const ordenados = planes
    .map((plan) => cotizarPlan(plan, input.personas))
    .sort((a, b) => a.totalUf - b.totalUf);
  const siete = sieteClp(input.sueldoLiquido, ufClp);
  return {
    sieteClp: siete,
    sieteUf: siete / ufClp,
    mejoresPlanes: ordenados.slice(0, 3),
  };
}
