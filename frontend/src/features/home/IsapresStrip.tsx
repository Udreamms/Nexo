import { ISAPRES_ABIERTAS } from "@nexo/shared";
import styles from "./sections.module.css";

export function IsapresStrip() {
  return (
    <section aria-label="Isapres que comparamos" className={styles.strip}>
      <div className={styles.stripInner}>
        <span className={styles.stripLabel}>Comparamos las 7 Isapres abiertas</span>
        {ISAPRES_ABIERTAS.map((nombre) => (
          <span key={nombre} className={styles.stripName}>
            {nombre}
          </span>
        ))}
      </div>
    </section>
  );
}
