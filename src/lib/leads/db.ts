import { v4 as uuidv4 } from 'uuid';
import db from '../../db';
import type { Lead, LeadActivity } from './types';

const leads = {
  create: db.prepare(`
    INSERT INTO leads (
      id, name, email, phone, service_interest, message, status,
      source, created_at, priority, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, ?)
  `),

  update: db.prepare(`
    UPDATE leads
    SET status = ?, last_contact = datetime('now'), priority = ?, notes = ?
    WHERE id = ?
  `),

  findById: db.prepare('SELECT * FROM leads WHERE id = ?'),
  
  findRecent: db.prepare(`
    SELECT * FROM leads 
    ORDER BY created_at DESC 
    LIMIT ?
  `),

  findByStatus: db.prepare(`
    SELECT * FROM leads 
    WHERE status = ? 
    ORDER BY priority DESC, created_at DESC
  `)
};

const activities = {
  create: db.prepare(`
    INSERT INTO lead_activities (id, lead_id, activity_type, description, created_at)
    VALUES (?, ?, ?, ?, datetime('now'))
  `),

  findByLead: db.prepare(`
    SELECT * FROM lead_activities 
    WHERE lead_id = ? 
    ORDER BY created_at DESC
  `)
};

export function createLead(data: Partial<Lead>): string {
  const id = uuidv4();
  
  leads.create.run(
    id,
    data.name || null,
    data.email || null,
    data.phone || null,
    data.service_interest || null,
    data.message || null,
    'new',
    data.source || 'website',
    data.priority || 1,
    data.notes || null
  );

  return id;
}

export function updateLeadStatus(
  id: string,
  status: Lead['status'],
  priority?: number,
  notes?: string
): void {
  leads.update.run(status, priority || 1, notes || null, id);
}

export function addLeadActivity(
  leadId: string,
  type: LeadActivity['activity_type'],
  description: string
): void {
  activities.create.run(uuidv4(), leadId, type, description);
}

export function getRecentLeads(limit: number = 10): Lead[] {
  return leads.findRecent.all(limit);
}

export function getLeadsByStatus(status: Lead['status']): Lead[] {
  return leads.findByStatus.all(status);
}

export function getLeadActivities(leadId: string): LeadActivity[] {
  return activities.findByLead.all(leadId);
}

export default {
  createLead,
  updateLeadStatus,
  addLeadActivity,
  getRecentLeads,
  getLeadsByStatus,
  getLeadActivities
};