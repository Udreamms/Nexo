import { z } from "zod";

export const quoteRequestSchema = z.object({
  personas: z
    .array(z.object({ anios: z.number().int().min(0).max(110), esCarga: z.boolean() }))
    .min(1)
    .max(12),
  sueldoLiquido: z.number().min(0).default(0),
});

export const leadSchema = z.object({
  whatsapp: z.string().regex(/^\+?\d{8,15}$/, "WhatsApp inválido"),
  grupo: z.enum(["yo", "pareja", "hijos", "mayores"]),
  edades: z.array(z.number().int().min(0).max(110)).min(1).max(12),
  sueldoLiquido: z.number().min(0).default(0),
  utm: z.record(z.string()).optional(),
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
export type LeadRequest = z.infer<typeof leadSchema>;
