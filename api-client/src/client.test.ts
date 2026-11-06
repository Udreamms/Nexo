import assert from "node:assert/strict";
import { test } from "node:test";
import { ApiError, createApiClient } from "./client";

function fakeFetch(status: number, body: unknown) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const impl = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(body), { status });
  }) as unknown as typeof fetch;
  return { impl, calls };
}

test("calculateQuote envía POST JSON a /quote", async () => {
  const { impl, calls } = fakeFetch(200, { mejoresPlanes: [] });
  const api = createApiClient({ baseUrl: "http://x/api/v1/", fetchImpl: impl });
  await api.calculateQuote({ personas: [{ anios: 30, esCarga: false }], sueldoLiquido: 0 });
  assert.equal(calls[0]!.url, "http://x/api/v1/quote");
  assert.equal(calls[0]!.init.method, "POST");
});

test("listLeads adjunta el token Bearer", async () => {
  const { impl, calls } = fakeFetch(200, { leads: [] });
  const api = createApiClient({ baseUrl: "http://x", fetchImpl: impl, getToken: async () => "tok" });
  await api.listLeads();
  const headers = calls[0]!.init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer tok");
});

test("listLeads sin sesión falla con 401 sin llamar a la red", async () => {
  const { impl, calls } = fakeFetch(200, {});
  const api = createApiClient({ baseUrl: "http://x", fetchImpl: impl });
  await assert.rejects(api.listLeads(), (e: unknown) => e instanceof ApiError && e.status === 401);
  assert.equal(calls.length, 0);
});

test("los errores HTTP se lanzan como ApiError", async () => {
  const { impl } = fakeFetch(400, { error: "Datos inválidos" });
  const api = createApiClient({ baseUrl: "http://x", fetchImpl: impl });
  await assert.rejects(
    api.createLead({ whatsapp: "x", grupo: "yo", edades: [1], sueldoLiquido: 0 }),
    (e: unknown) => e instanceof ApiError && e.status === 400,
  );
});
