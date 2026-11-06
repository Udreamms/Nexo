"use client";

import {
  ETIQUETA_RELACION,
  GRUPOS,
  UF_CLP,
  formatoClp,
  formatoUf,
} from "@nexo/shared";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import styles from "./QuoteForm.module.css";
import { parseEdad, parseMonto, useQuoteForm } from "./useQuoteForm";

export function QuoteForm() {
  const f = useQuoteForm();

  return (
    <div id="cotizar" className={styles.form} onClick={f.marcarInicio}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>COTIZA EN 60 SEGUNDOS</span>
        <span className={styles.title}>¿A quién quieres proteger?</span>
      </div>

      <div className={styles.groups}>
        {GRUPOS.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`${styles.group} ${f.grupo === g.id ? styles.groupActive : ""}`}
            onClick={() => f.elegirGrupo(g.id)}
          >
            {g.etiqueta}
          </button>
        ))}
      </div>

      <div className={styles.ages}>
        <span className={styles.agesHead}>
          Edades
          <span className={styles.agesActions}>
            {!f.hayPareja && (
              <button type="button" className={styles.linkBtn} onClick={f.agregarPareja}>
                + Pareja
              </button>
            )}
            <button type="button" className={styles.linkBtn} onClick={f.agregarHijo}>
              + Hijo/a
            </button>
          </span>
        </span>
        <div className={styles.agesRow}>
          <label className={styles.age}>
            Tú
            <input
              type="text"
              inputMode="numeric"
              value={f.edad ?? ""}
              placeholder={`Ej: ${f.ejemploTitular}`}
              aria-label="Tu edad"
              onChange={(e) => f.setEdad(parseEdad(e.target.value))}
            />
          </label>
          {f.acompanantes.map((p, i) => (
            <label key={`${p.relacion}-${i}`} className={styles.age}>
              {ETIQUETA_RELACION[p.relacion]}
              <input
                type="text"
                inputMode="numeric"
                value={p.edad ?? ""}
                placeholder={`Ej: ${p.ejemplo}`}
                aria-label={`Edad de ${ETIQUETA_RELACION[p.relacion].toLowerCase()}`}
                onChange={(e) => f.cambiarAcompanante(i, parseEdad(e.target.value))}
              />
              <button
                type="button"
                className={styles.remove}
                aria-label="Quitar"
                onClick={() => f.quitarAcompanante(i)}
              >
                ×
              </button>
            </label>
          ))}
        </div>
      </div>

      <label className={styles.income}>
        <span>
          Tu sueldo líquido <em>(opcional, para calcular tu 7%)</em>
        </span>
        <span className={styles.incomeField}>
          <span>$</span>
          <input
            inputMode="numeric"
            value={f.renta ? f.renta.toLocaleString("es-CL") : ""}
            placeholder="Ej: 1.200.000"
            aria-label="Tu sueldo líquido"
            onChange={(e) => f.setRenta(parseMonto(e.target.value))}
          />
        </span>
      </label>

      <div className={styles.summary}>
        <div className={styles.summaryCell}>
          <span className={styles.summaryLabel}>Tu 7% al mes</span>
          <span className={styles.summaryValue}>
            {f.renta ? formatoClp(f.siete) : "Escribe tu sueldo"}
          </span>
        </div>
        <div className={styles.summaryCell}>
          <span className={styles.summaryLabel}>Planes desde</span>
          <span className={styles.summaryValue}>{f.listo ? formatoUf(f.desdeUf) : "—"}</span>
          <span className={styles.summaryHint}>
            {f.listo
              ? `aprox. ${formatoClp(f.desdeUf * UF_CLP)} al mes`
              : "Elige una opción y una edad"}
          </span>
        </div>
      </div>

      {f.listo ? (
        <Link
          href={f.href}
          className={styles.cta}
          onClick={() => track("ver_planes", { grupo: f.grupo, personas: f.personas.length })}
        >
          Ver mis 3 mejores planes <Icon name="arrow" size={18} />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Elige a quién quieres proteger e ingresa al menos una edad"
          className={`${styles.cta} ${styles.ctaDisabled}`}
        >
          Ver mis 3 mejores planes <Icon name="arrow" size={18} />
        </button>
      )}

      <span className={styles.legal}>
        Gratis · Sin dejar tus datos · Ninguna Isapre paga por aparecer primero
      </span>
    </div>
  );
}
