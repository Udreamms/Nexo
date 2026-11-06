import type { CotizacionInput, CotizacionResultado, Lead } from "@nexo/shared";

export interface ApiClientOptions {
  /** Por ejemplo "https://api.nexo.cl/api/v1". */
  baseUrl: string;
  /** Devuelve el ID token de Firebase Auth del usuario actual (si hay sesión). */
  getToken?: () => Promise<string | null | undefined>;
  /** Para pruebas o entornos sin fetch global. */
  fetchImpl?: typeof fetch;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
  ) {
    super(`La API respondió ${status}`);
    this.name = "ApiError";
  }
}

export interface StoredLead extends Lead {
  id: string;
  status: string;
  createdAt: number | null;
}

export function createApiClient({ baseUrl, getToken, fetchImpl }: ApiClientOptions) {
  const doFetch = fetchImpl ?? fetch;
  const root = baseUrl.replace(/\/+$/, "");

  async function request<T>(
    method: "GET" | "POST",
    path: string,
    options: { body?: unknown; auth?: boolean } = {},
  ): Promise<T> {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (options.body !== undefined) headers["Content-Type"] = "application/json";
    if (options.auth) {
      const token = await getToken?.();
      if (!token) throw new ApiError(401, { error: "No autenticado" });
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await doFetch(`${root}${path}`, {
      method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
    const data: unknown = await res.json().catch(() => null);
    if (!res.ok) throw new ApiError(res.status, data);
    return data as T;
  }

  return {
    health: () => request<{ status: string }>("GET", "/health"),
    calculateQuote: (input: CotizacionInput) =>
      request<CotizacionResultado>("POST", "/quote", { body: input }),
    createLead: (lead: Lead) => request<{ id: string }>("POST", "/leads", { body: lead }),
    /** Solo agentes autenticados. */
    listLeads: () => request<{ leads: StoredLead[] }>("GET", "/leads", { auth: true }),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
