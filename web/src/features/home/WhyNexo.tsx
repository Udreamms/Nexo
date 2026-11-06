import { Icon } from "@/components/ui/Icon";
import { BENEFICIOS } from "./content";
import styles from "./sections.module.css";

export function WhyNexo() {
  return (
    <section aria-label="Por qué Nexo" className={styles.section}>
      <div className={styles.whyInner}>
        <div className={styles.whyPhoto}>
          <div
            className={styles.whyImage}
            role="img"
            aria-label="Familia feliz con su hijo en un parque"
          />
        </div>
        <div className={styles.whyText}>
          <span className={styles.eyebrow}>POR QUÉ NEXO</span>
          <h2 className={styles.h2}>
            Tú eliges tranquilo.{" "}
            <span className="nx-gradient-text">Nuestro equipo se encarga del resto.</span>
          </h2>
          <p className={styles.lead}>
            Un equipo especializado en Isapres te acompaña antes, durante y después de cambiarte.
            Sin costo para ti: tu plan cuesta lo mismo que si vas directo a la Isapre.
          </p>
          <div className={styles.benefits}>
            {BENEFICIOS.map((b) => (
              <div key={b.titulo} className={styles.benefit}>
                <span className={styles.benefitIcon}>
                  <Icon name={b.icono} size={26} />
                </span>
                <span className={styles.benefitBody}>
                  <span className={styles.benefitTitle}>{b.titulo}</span>
                  <span className={styles.benefitText}>{b.texto}</span>
                </span>
              </div>
            ))}
          </div>
          <span className={styles.note}>
            Y si tu plan actual ya es el mejor para ti, te lo decimos.
          </span>
        </div>
      </div>
    </section>
  );
}
