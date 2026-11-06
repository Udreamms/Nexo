import { cotizar, formatoClp, formatoUf, type Persona } from "@nexo/shared";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import styles from "./cotiza.module.css";

export const metadata: Metadata = { title: "Tus 3 mejores planes · Nexo Salud" };

interface Props {
  searchParams: Promise<{ e?: string; p?: string; s?: string }>;
}

function leerPersonas(e?: string, p?: string): Persona[] {
  const titular = Number(e);
  if (!Number.isFinite(titular) || titular <= 0) return [];
  const cargas = (p ?? "")
    .split(".")
    .filter(Boolean)
    .map((par) => Number(par.split("-")[1]))
    .filter((n) => Number.isFinite(n))
    .map((anios): Persona => ({ anios, esCarga: true }));
  return [{ anios: titular, esCarga: false }, ...cargas];
}

export default async function CotizaPage({ searchParams }: Props) {
  const { e, p, s } = await searchParams;
  const personas = leerPersonas(e, p);
  const sueldo = Number(s) || 0;
  const resultado = personas.length ? cotizar({ personas, sueldoLiquido: sueldo }) : null;

  return (
    <>
      <Header />
      <main className={styles.main}>
        {resultado ? (
          <>
            <h1>Tus 3 mejores planes</h1>
            {sueldo > 0 && (
              <p className={styles.seven}>Tu 7% al mes: {formatoClp(resultado.sieteClp)}</p>
            )}
            <ol className={styles.list}>
              {resultado.mejoresPlanes.map((plan, i) => (
                <li key={`${plan.isapre}-${plan.baseUf}`} className={styles.item}>
                  <span className={styles.rank}>{i + 1}</span>
                  <span className={styles.isapre}>{plan.isapre}</span>
                  <span className={styles.price}>{formatoUf(plan.totalUf)} / mes</span>
                </li>
              ))}
            </ol>
            <p className={styles.note}>
              Valores referenciales. Un agente registrado confirma la cotización oficial.
            </p>
          </>
        ) : (
          <>
            <h1>Cuéntanos a quién quieres proteger</h1>
            <p>Necesitamos al menos una edad para calcular tus planes.</p>
          </>
        )}
        <Link href="/#cotizar" className={styles.back}>
          ← Volver a cotizar
        </Link>
      </main>
      <Footer />
    </>
  );
}
