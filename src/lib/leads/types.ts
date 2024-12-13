import { z } from 'zod';

export const leadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']),
  source: z.string(),
  created_at: z.date(),
  last_contact: z.date().optional(),
  priority: z.number().int().min(1).max(5),
  notes: z.string().optional()
});

export const leadActivitySchema = z.object({
  id: z.string().uuid(),
  lead_id: z.string().uuid(),
  activity_type: z.enum(['call', 'email', 'form', 'chat', 'website']),
  description: z.string(),
  created_at: z.date()
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadActivity = z.infer<typeof leadActivitySchema>;