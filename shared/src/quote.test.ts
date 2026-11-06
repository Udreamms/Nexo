import assert from "node:assert/strict";
import { test } from "node:test";
import { cotizar, factorEdad, sieteClp } from "./quote";

test("menores de 2 años no pagan factor", () => {
  assert.equal(factorEdad(1, true), 0);
  assert.equal(factorEdad(2, true), 0.6);
});

test("el 7% respeta el tope imponible", () => {
  assert.ok(sieteClp(100_000_000) < 0.07 * 90 * 41226.39 + 1);
});

test("devuelve los 3 planes más baratos ordenados", () => {
  const r = cotizar({ personas: [{ anios: 32, esCarga: false }], sueldoLiquido: 1_200_000 });
  assert.equal(r.mejoresPlanes.length, 3);
  const [a, b, c] = r.mejoresPlanes;
  assert.ok(a!.totalUf <= b!.totalUf && b!.totalUf <= c!.totalUf);
});
