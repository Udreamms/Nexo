import { QuoteForm } from "@/features/quote/QuoteForm";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" aria-label="Inicio" className={styles.hero}>
      <div className={styles.photo}>
        <div className={styles.image} role="img" aria-label="Foto de portada" />
        <div className={styles.veil} aria-hidden="true" />
        <div className={styles.text}>
          <h1>
            Tu plan de Isapre
            <br />
            en 60 segundos.
          </h1>
          <p>Compara las 7 Isapres abiertas con tu 7% y ve tus 3 mejores planes.</p>
        </div>
      </div>
      <div className={styles.formWrap}>
        <div className={styles.mobileTitle}>
          <p className={styles.mobileHeading}>
            Tu plan de Isapre <span className="nx-gradient-text">en 60 segundos.</span>
          </p>
          <p className={styles.mobileSub}>
            Compara las 7 Isapres abiertas con tu 7% y ve tus 3 mejores planes.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
