import "@fontsource-variable/dm-sans";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Nexo Salud",
  description: "Compara las 7 Isapres abiertas con tu 7% y ve tus 3 mejores planes en 60 segundos.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
