import { Lead } from './types';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function sendNotification(options: NotificationOptions): void {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  new Notification(options.title, {
    body: options.body,
    icon: options.icon || '/favicon.png',
    tag: options.tag,
    requireInteraction: true
  });
}

export function notifyNewLead(lead: Lead): void {
  const title = 'New Lead Received!';
  const body = `
    ${lead.name ? `Name: ${lead.name}\n` : ''}
    ${lead.email ? `Email: ${lead.email}\n` : ''}
    ${lead.phone ? `Phone: ${lead.phone}\n` : ''}
    ${lead.service_interest ? `Service: ${lead.service_interest}` : ''}
  `.trim();

  sendNotification({
    title,
    body,
    tag: `lead-${lead.id}`,
    icon: '/favicon.png'
  });
}

export function notifyLeadUpdate(lead: Lead): void {
  sendNotification({
    title: 'Lead Status Updated',
    body: `Lead ${lead.name || lead.email || lead.phone} is now ${lead.status}`,
    tag: `lead-update-${lead.id}`
  });
}