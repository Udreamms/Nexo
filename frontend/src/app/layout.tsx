import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexo Salud",
  description: "Compara las 7 Isapres abiertas con tu 7% y ve tus 3 mejores planes en 60 segundos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
