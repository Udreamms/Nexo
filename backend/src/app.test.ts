import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { after, before, describe, test } from "node:test";
import type { Server } from "node:http";
import { createApp } from "./app";

let server: Server;
let base: string;

before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/v1`;
});

after(() => {
  server.close();
});

const post = (path: string, body: unknown, headers: Record<string, string> = {}) =>
  fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

describe("API v1", () => {
  test("health responde ok", async () => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: "ok" });
  });

  test("quote devuelve los 3 mejores planes", async () => {
    const res = await post("/quote", {
      personas: [{ anios: 32, esCarga: false }],
      sueldoLiquido: 1_200_000,
    });
    assert.equal(res.status, 200);
    const data = (await res.json()) as { mejoresPlanes: unknown[]; sieteClp: number };
    assert.equal(data.mejoresPlanes.length, 3);
    assert.ok(data.sieteClp > 0);
  });

  test("quote rechaza datos inválidos con 400", async () => {
    const res = await post("/quote", { personas: [] });
    assert.equal(res.status, 400);
  });

  test("rechaza JSON malformado con 400 sin filtrar detalles", async () => {
    const res = await fetch(`${base}/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{no es json",
    });
    assert.equal(res.status, 400);
    assert.deepEqual(await res.json(), { error: "JSON inválido" });
  });

  test("rechaza cuerpos demasiado grandes con 413", async () => {
    const res = await post("/quote", { relleno: "x".repeat(30_000) });
    assert.equal(res.status, 413);
  });

  test("incluye cabeceras de seguridad y oculta x-powered-by", async () => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.headers.get("x-powered-by"), null);
    assert.equal(res.headers.get("x-content-type-options"), "nosniff");
    assert.ok(res.headers.get("strict-transport-security"));
  });

  test("CORS: solo orígenes permitidos; sin Origin (móvil) se acepta", async () => {
    const ok = await fetch(`${base}/health`, { headers: { Origin: "http://localhost:3000" } });
    assert.equal(ok.headers.get("access-control-allow-origin"), "http://localhost:3000");
    const bad = await fetch(`${base}/health`, { headers: { Origin: "https://malicioso.example" } });
    assert.equal(bad.headers.get("access-control-allow-origin"), null);
    const mobile = await fetch(`${base}/health`);
    assert.equal(mobile.status, 200);
  });

  test("GET /leads exige autenticación (401) y rechaza tokens falsos", async () => {
    const sinToken = await fetch(`${base}/leads`);
    assert.equal(sinToken.status, 401);
    const falso = await fetch(`${base}/leads`, { headers: { Authorization: "Bearer abc.def.ghi" } });
    assert.equal(falso.status, 401);
  });

  test("rutas desconocidas devuelven 404", async () => {
    const res = await fetch(`${base}/no-existe`);
    assert.equal(res.status, 404);
  });

  test("POST /leads valida el WhatsApp antes de tocar la base de datos", async () => {
    const res = await post("/leads", {
      whatsapp: "no-es-un-numero",
      grupo: "yo",
      edades: [32],
    });
    assert.equal(res.status, 400);
  });

  test("POST /leads tiene rate limit estricto (429)", async () => {
    let ultimo = 0;
    for (let i = 0; i < 12; i++) {
      ultimo = (await post("/leads", { whatsapp: "x", grupo: "yo", edades: [1] })).status;
    }
    assert.equal(ultimo, 429);
  });
});
