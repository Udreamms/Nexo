import { Icon } from "@/components/ui/Icon";
import { PASOS } from "./content";
import styles from "./sections.module.css";

export function HowItWorks() {
  return (
    <section id="como" aria-label="Cómo funciona" className={styles.how}>
      <div className={styles.inner}>
        <div className={styles.sideCol}>
          <h2 className={styles.h2}>
            ¿Qué pasa <span className="nx-gradient-text">después de cotizar?</span>
          </h2>
          <p className={styles.lead}>Sin llamadas insistentes ni letra chica. Tú decides cada paso.</p>
          <a href="#cotizar" className={styles.textLink}>
            Cotizar ahora →
          </a>
        </div>
        <div className={styles.steps}>
          {PASOS.map((paso, i) => (
            <div key={paso.titulo} className={styles.step}>
              <div className={styles.stepHead}>
                <span className={styles.stepNum}>{i + 1}</span>
                <span className={styles.stepIcon}>
                  <Icon name={paso.icono} size={26} />
                </span>
              </div>
              <span className={styles.stepTitle}>{paso.titulo}</span>
              <span className={styles.stepText}>{paso.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
