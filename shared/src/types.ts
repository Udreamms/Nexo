export type Relacion = "titular" | "conyuge" | "hijo";

export type GrupoId = "yo" | "pareja" | "hijos" | "mayores";

export interface Persona {
  anios: number;
  /** true si es carga (pareja o hijo/a); el titular no es carga. */
  esCarga: boolean;
}

export interface Plan {
  isapre: IsapreNombre;
  /** Precio base en UF antes de aplicar factor de edad y GES. */
  baseUf: number;
}

export type IsapreNombre =
  | "Banmédica"
  | "Colmena"
  | "Consalud"
  | "Cruz Blanca"
  | "Esencial"
  | "Nueva Masvida"
  | "Vida Tres";

export interface PlanCotizado extends Plan {
  /** Valor mensual total del grupo, en UF. */
  totalUf: number;
}

export interface CotizacionInput {
  personas: Persona[];
  /** Sueldo líquido mensual en CLP (0 si no se informa). */
  sueldoLiquido: number;
}

export interface CotizacionResultado {
  sieteUf: number;
  sieteClp: number;
  mejoresPlanes: PlanCotizado[];
}

export interface Lead {
  whatsapp: string;
  grupo: GrupoId;
  edades: number[];
  sueldoLiquido: number;
  utm?: Record<string, string>;
}
