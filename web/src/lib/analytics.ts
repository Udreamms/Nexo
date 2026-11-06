type Params = Record<string, string | number | boolean>;

interface AnalyticsWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (command: "event", name: string, params: Params) => void;
  fbq?: (command: "trackCustom", name: string, params: Params) => void;
}

/** Envía un evento a GA4 (gtag/dataLayer) y al píxel de Meta si están instalados. */
export function track(evento: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    const w = window as AnalyticsWindow;
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: evento, ...params });
    w.gtag?.("event", evento, params);
    w.fbq?.("trackCustom", evento, params);
  } catch {
    // La medición nunca debe romper la página.
  }
}
