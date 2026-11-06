import type { Request, Response } from "express";
import type { LeadRequest, QuoteRequest } from "../schemas/quote.schema";
import { leadService } from "../services/lead.service";
import { quoteService } from "../services/quote.service";

export const quoteController = {
  calculate(req: Request, res: Response) {
    res.json(quoteService.calculate(req.body as QuoteRequest));
  },
  async createLead(req: Request, res: Response) {
    const result = await leadService.register(req.body as LeadRequest);
    res.status(201).json(result);
  },
  async listLeads(_req: Request, res: Response) {
    res.json({ leads: await leadService.list() });
  },
};
