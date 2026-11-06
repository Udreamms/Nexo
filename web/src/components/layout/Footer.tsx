import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <span className={styles.mark}>N</span>
              <span className={styles.name}>nexo</span>
              <span className={styles.sub}>salud</span>
            </div>
            <span className={styles.tagline}>
              Comparamos, explicamos y te conectamos con un agente registrado.
            </span>
          </div>
          <div className={styles.col}>
            <strong>Herramientas</strong>
            <Link href="/#cotizar">Cotiza tu Isapre</Link>
          </div>
          <div className={styles.col}>
            <strong>Nexo</strong>
            <Link href="/">Quiénes somos</Link>
            <Link href="/">Privacidad</Link>
          </div>
        </div>
        <p className={styles.legal}>
          Nexo entrega información general y comparaciones referenciales. La asesoría, la
          cotización oficial y la firma del contrato las realiza un agente de ventas registrado
          en la Superintendencia de Salud. Tus datos se comparten solo con tu autorización.
        </p>
      </div>
    </footer>
  );
}
