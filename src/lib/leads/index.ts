import db, { createLead, updateLeadStatus, addLeadActivity } from './db';
import { notifyNewLead, notifyLeadUpdate } from './notifications';
import type { Lead, LeadActivity } from './types';

export async function handleNewLead(data: Partial<Lead>): Promise<string> {
  const leadId = createLead({
    ...data,
    priority: calculatePriority(data)
  });

  // Log the lead creation activity
  addLeadActivity(leadId, 'form', 'Lead created from website form');

  // Send notification
  const lead = db.findById.get(leadId);
  if (lead) {
    await notifyNewLead(lead);
  }

  return leadId;
}

export async function updateLead(
  id: string,
  status: Lead['status'],
  notes?: string
): Promise<void> {
  const priority = calculatePriorityForStatus(status);
  updateLeadStatus(id, status, priority, notes);

  // Log the status change
  addLeadActivity(id, 'website', `Status updated to ${status}`);

  // Send notification for important status changes
  const lead = db.findById.get(id);
  if (lead && ['qualified', 'converted'].includes(status)) {
    await notifyLeadUpdate(lead);
  }
}

function calculatePriority(lead: Partial<Lead>): number {
  let priority = 1;

  // Increase priority based on available contact info
  if (lead.phone) priority += 1;
  if (lead.email) priority += 1;

  // Higher priority for specific services
  if (lead.service_interest?.toLowerCase().includes('custom')) {
    priority += 1;
  }

  return Math.min(priority, 5);
}

function calculatePriorityForStatus(status: Lead['status']): number {
  switch (status) {
    case 'qualified': return 4;
    case 'contacted': return 3;
    case 'converted': return 5;
    case 'lost': return 1;
    default: return 2;
  }
}

export { type Lead, type LeadActivity };
export default {
  handleNewLead,
  updateLead,
  getRecentLeads: db.getRecentLeads,
  getLeadsByStatus: db.getLeadsByStatus,
  getLeadActivities: db.getLeadActivities
};