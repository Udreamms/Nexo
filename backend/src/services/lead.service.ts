import { leadRepository } from "../repositories/lead.repository";
import type { LeadRequest } from "../schemas/quote.schema";

export const leadService = {
  async register(input: LeadRequest): Promise<{ id: string }> {
    const id = await leadRepository.create(input);
    return { id };
  },
};
