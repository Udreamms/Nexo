import { PREGUNTAS } from "./content";
import styles from "./sections.module.css";

export function Faq() {
  return (
    <section id="preguntas" aria-label="Preguntas frecuentes" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sideCol}>
          <h2 className={styles.h2}>Preguntas frecuentes</h2>
          <p className={styles.lead}>¿Quieres aprender más? Revisa nuestras guías en simple.</p>
        </div>
        <div className={styles.faqList}>
          {PREGUNTAS.map((q) => (
            <details key={q.pregunta} className={styles.faqItem}>
              <summary>{q.pregunta}</summary>
              <p>{q.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
