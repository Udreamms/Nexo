import { Icon } from "@/components/ui/Icon";
import { TESTIMONIOS } from "./content";
import styles from "./sections.module.css";

export function Testimonials() {
  return (
    <section id="testimonios" aria-label="Testimonios" className={styles.testimonials}>
      <div className={styles.innerCol}>
        <div className={styles.sideCol} style={{ maxWidth: 640 }}>
          <span className={styles.eyebrow}>TESTIMONIOS</span>
          <h2 className={styles.h2}>
            Mira lo que dicen <span className="nx-gradient-text">de nosotros.</span>
          </h2>
        </div>
        <div className={styles.cards}>
          {TESTIMONIOS.map((t, i) => (
            <figure key={i} className={styles.card}>
              <span aria-hidden="true" className={`${styles.quoteMark} nx-gradient-text`}>
                “
              </span>
              <blockquote className={styles.quote}>{t.texto}</blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar}>
                  <Icon name="people" size={22} />
                </span>
                <span className={styles.authorInfo}>
                  <span className={styles.authorName}>{t.nombre}</span>
                  <span className={styles.authorMeta}>{t.comuna}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
