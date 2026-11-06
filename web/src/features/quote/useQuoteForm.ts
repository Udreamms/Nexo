"use client";

import {
  GRUPOS,
  PLANES_MUESTRA,
  TOPE_IMPONIBLE_UF,
  UF_CLP,
  cotizarPlan,
  type GrupoId,
  type Persona,
} from "@nexo/shared";
import { useCallback, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";

export interface Acompanante {
  relacion: "conyuge" | "hijo";
  edad: number | null;
  /** Edad de ejemplo mostrada como placeholder. */
  ejemplo: number;
}

export function parseEdad(raw: string): number | null {
  const digits = raw.replace(/\D/g, "");
  return digits === "" ? null : Math.min(110, Number(digits));
}

export function parseMonto(raw: string): number {
  return Math.max(0, Number(raw.replace(/\D/g, "")) || 0);
}

export function useQuoteForm() {
  const [grupo, setGrupo] = useState<GrupoId | "">("");
  const [edad, setEdad] = useState<number | null>(null);
  const [acompanantes, setAcompanantes] = useState<Acompanante[]>([]);
  const [renta, setRenta] = useState(0);
  const iniciado = useRef(false);

  const marcarInicio = useCallback(() => {
    if (iniciado.current) return;
    iniciado.current = true;
    track("cotizador_inicio");
  }, []);

  const elegirGrupo = useCallback((id: GrupoId) => {
    const preset = GRUPOS.find((g) => g.id === id);
    setGrupo(id);
    setAcompanantes(
      (preset?.acompanantes ?? []).map((a) => ({
        relacion: a.relacion,
        edad: null,
        ejemplo: a.edadEjemplo,
      })),
    );
  }, []);

  const cambiarAcompanante = (i: number, valor: number | null) =>
    setAcompanantes((prev) => prev.map((p, j) => (j === i ? { ...p, edad: valor } : p)));

  const quitarAcompanante = (i: number) =>
    setAcompanantes((prev) => prev.filter((_, j) => j !== i));

  const agregarHijo = () =>
    setAcompanantes((prev) => [...prev, { relacion: "hijo", edad: null, ejemplo: 5 }]);

  const agregarPareja = () =>
    setAcompanantes((prev) => [{ relacion: "conyuge", edad: null, ejemplo: 30 }, ...prev]);

  const derivado = useMemo(() => {
    // Solo cuentan las edades escritas. Si "Tú" está vacío, la primera edad escrita pasa a ser el titular.
    const llenas = acompanantes.filter((p) => p.edad !== null);
    let titular = edad;
    let cargas = llenas;
    if (titular === null && llenas.length > 0) {
      titular = Math.max(18, llenas[0]!.edad as number);
      cargas = llenas.slice(1);
    }
    const listo = grupo !== "" && titular !== null;
    const personas: Persona[] = listo
      ? [
          { anios: titular as number, esCarga: false },
          ...cargas.map((p) => ({ anios: p.edad as number, esCarga: true })),
        ]
      : [];
    const desdeUf = personas.length
      ? Math.min(...PLANES_MUESTRA.map((plan) => cotizarPlan(plan, personas).totalUf))
      : 0;
    const siete = 0.07 * Math.min(renta / 0.8, TOPE_IMPONIBLE_UF * UF_CLP);
    const query = new URLSearchParams({
      e: String(titular ?? ""),
      p: cargas.map((p) => `${p.relacion}-${p.edad}`).join("."),
      s: String(renta),
      g: grupo,
    });
    return { listo, personas, desdeUf, siete, href: `/cotiza?${query.toString()}` };
  }, [acompanantes, edad, grupo, renta]);

  const ejemploTitular = (GRUPOS.find((g) => g.id === grupo) ?? GRUPOS[0]!).edadTitularEjemplo;

  return {
    grupo,
    edad,
    setEdad,
    acompanantes,
    renta,
    setRenta,
    ejemploTitular,
    elegirGrupo,
    cambiarAcompanante,
    quitarAcompanante,
    agregarHijo,
    agregarPareja,
    hayPareja: acompanantes.some((p) => p.relacion === "conyuge"),
    marcarInicio,
    ...derivado,
  };
}
