import { cotizar, type CotizacionResultado } from "@nexo/shared";
import type { QuoteRequest } from "../schemas/quote.schema";

export const quoteService = {
  calculate(input: QuoteRequest): CotizacionResultado {
    return cotizar(input);
  },
};
