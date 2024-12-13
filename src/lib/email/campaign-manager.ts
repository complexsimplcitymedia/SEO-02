import db from '../../db';
import { sendEmail } from './mailer';
import type { EmailCampaign, EmailSubscriber } from '../../db/schema';

export async function createCampaign(
  name: string,
  subject: string,
  content: string
): Promise<string> {
  return db.createCampaign(name, subject, content);
}

export async function sendCampaign(campaignId: string): Promise<void> {
  const campaign = db.campaigns.findById.get(campaignId);
  if (!campaign || campaign.status !== 'draft') {
    throw new Error('Invalid campaign or already sent');
  }

  const subscribers = db.subscribers.findActive.all();
  
  for (const subscriber of subscribers) {
    try {
      await sendEmail({
        to: subscriber.email,
        subject: campaign.subject,
        html: campaign.content
      });

      db.logEmailSend(campaignId, subscriber.id, 'sent');
    } catch (error) {
      db.logEmailSend(campaignId, subscriber.id, 'failed', error.message);
    }
  }

  db.campaigns.updateStatus.run('sent', campaignId);
}

export async function getCampaignStats(campaignId: string) {
  const logs = db.logs.findByCampaign.all(campaignId);
  
  return {
    sent: logs.filter(log => log.status === 'sent').length,
    failed: logs.filter(log => log.status === 'failed').length,
    opened: logs.filter(log => log.status === 'opened').length,
    clicked: logs.filter(log => log.status === 'clicked').length
  };
}

export default {
  createCampaign,
  sendCampaign,
  getCampaignStats
};