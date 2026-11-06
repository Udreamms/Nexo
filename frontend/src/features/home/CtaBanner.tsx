import { Icon } from "@/components/ui/Icon";
import styles from "./sections.module.css";

export function CtaBanner() {
  return (
    <section aria-label="Cotiza ahora" className={styles.banner}>
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.bannerInner}>
        <span className={styles.bannerEyebrow}>TU PRÓXIMO PLAN EMPIEZA AQUÍ</span>
        <h2 className={styles.bannerTitle}>
          <span className={styles.oneLine}>¿Tu plan sigue siendo el mejor para ti?</span>
          <br />
          <small>Revísalo en 60 segundos.</small>
        </h2>
        <span className={styles.bannerText}>
          Descubre en 60 segundos qué plan de Isapre puedes elegir con tu 7% y encuentra el que
          mejor se adapta a ti.
        </span>
        <a href="#cotizar" className={styles.bannerCta}>
          Cotiza tu Isapre <Icon name="arrow" size={18} />
        </a>
        <div className={styles.checks}>
          <span>✓ Gratis</span>
          <span>✓ Sin dejar tus datos</span>
          <span>✓ Las 7 Isapres</span>
          <span>✓ Equipo especializado</span>
        </div>
      </div>
    </section>
  );
}
