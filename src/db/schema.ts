import { z } from 'zod';

export const visitorSchema = z.object({
  id: z.string().uuid(),
  ip_address: z.string(),
  user_agent: z.string(),
  first_visit: z.date(),
  last_visit: z.date(),
  visit_count: z.number().int().positive(),
  cookie_consent: z.boolean().optional(),
  consent_date: z.date().optional(),
});

export const emailSubscriberSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  subscribed_at: z.date(),
  unsubscribed_at: z.date().optional(),
  status: z.enum(['active', 'unsubscribed']),
  source: z.string(),
});

export const emailCampaignSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  subject: z.string(),
  content: z.string(),
  created_at: z.date(),
  sent_at: z.date().optional(),
  status: z.enum(['draft', 'scheduled', 'sent', 'failed']),
});

export const emailLogSchema = z.object({
  id: z.string().uuid(),
  campaign_id: z.string().uuid(),
  subscriber_id: z.string().uuid(),
  sent_at: z.date(),
  status: z.enum(['sent', 'failed', 'opened', 'clicked']),
  error: z.string().optional(),
});

export type Visitor = z.infer<typeof visitorSchema>;
export type EmailSubscriber = z.infer<typeof emailSubscriberSchema>;
export type EmailCampaign = z.infer<typeof emailCampaignSchema>;
export type EmailLog = z.infer<typeof emailLogSchema>;