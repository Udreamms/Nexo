import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark}>N</span>
          <span className={styles.name}>nexo</span>
          <span className={styles.sub}>salud</span>
        </Link>
        <nav aria-label="Principal" className={styles.nav}>
          <Link href="/#como">Cómo funciona</Link>
          <Link href="/#preguntas">Preguntas</Link>
        </nav>
        <Link href="/#cotizar" className={styles.cta}>
          Cotiza tu Isapre <Icon name="arrow" size={18} />
        </Link>
      </div>
    </header>
  );
}
