import { createPool } from 'mariadb';
import { v4 as uuidv4 } from 'uuid';
import type { Visitor, EmailSubscriber, EmailCampaign, EmailLog } from './schema';

const pool = createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 5
});

export const visitors = {
  async create(ipAddress: string, userAgent: string): Promise<string> {
    const conn = await pool.getConnection();
    try {
      const id = uuidv4();
      await conn.query(
        'INSERT INTO visitors (id, ip_address, user_agent, first_visit, last_visit) VALUES (?, ?, ?, NOW(), NOW())',
        [id, ipAddress, userAgent]
      );
      return id;
    } finally {
      conn.release();
    }
  },

  async updateVisit(ipAddress: string, userAgent: string): Promise<void> {
    const conn = await pool.getConnection();
    try {
      await conn.query(
        'UPDATE visitors SET last_visit = NOW(), visit_count = visit_count + 1 WHERE ip_address = ? AND user_agent = ?',
        [ipAddress, userAgent]
      );
    } finally {
      conn.release();
    }
  },

  async updateConsent(id: string, consent: boolean): Promise<void> {
    const conn = await pool.getConnection();
    try {
      await conn.query(
        'UPDATE visitors SET cookie_consent = ?, consent_date = NOW() WHERE id = ?',
        [consent, id]
      );
    } finally {
      conn.release();
    }
  },

  async findByIp(ipAddress: string, userAgent: string): Promise<Visitor | null> {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query(
        'SELECT * FROM visitors WHERE ip_address = ? AND user_agent = ?',
        [ipAddress, userAgent]
      );
      return rows[0] || null;
    } finally {
      conn.release();
    }
  }
};

export const subscribers = {
  async create(email: string, name?: string, source: string = 'website'): Promise<string> {
    const conn = await pool.getConnection();
    try {
      const id = uuidv4();
      await conn.query(
        'INSERT INTO email_subscribers (id, email, name, subscribed_at, status, source) VALUES (?, ?, ?, NOW(), ?, ?)',
        [id, email, name, 'active', source]
      );
      return id;
    } finally {
      conn.release();
    }
  },

  async unsubscribe(email: string): Promise<void> {
    const conn = await pool.getConnection();
    try {
      await conn.query(
        'UPDATE email_subscribers SET status = ?, unsubscribed_at = NOW() WHERE email = ?',
        ['unsubscribed', email]
      );
    } finally {
      conn.release();
    }
  },

  async findActive(): Promise<EmailSubscriber[]> {
    const conn = await pool.getConnection();
    try {
      return await conn.query('SELECT * FROM email_subscribers WHERE status = ?', ['active']);
    } finally {
      conn.release();
    }
  }
};

export const campaigns = {
  async create(name: string, subject: string, content: string): Promise<string> {
    const conn = await pool.getConnection();
    try {
      const id = uuidv4();
      await conn.query(
        'INSERT INTO email_campaigns (id, name, subject, content, created_at, status) VALUES (?, ?, ?, ?, NOW(), ?)',
        [id, name, subject, content, 'draft']
      );
      return id;
    } finally {
      conn.release();
    }
  },

  async updateStatus(id: string, status: string): Promise<void> {
    const conn = await pool.getConnection();
    try {
      await conn.query(
        'UPDATE email_campaigns SET status = ?, sent_at = CASE WHEN ? = ? THEN NOW() ELSE sent_at END WHERE id = ?',
        [status, status, 'sent', id]
      );
    } finally {
      conn.release();
    }
  }
};

export const logs = {
  async create(campaignId: string, subscriberId: string, status: string, error?: string): Promise<void> {
    const conn = await pool.getConnection();
    try {
      const id = uuidv4();
      await conn.query(
        'INSERT INTO email_logs (id, campaign_id, subscriber_id, sent_at, status, error) VALUES (?, ?, ?, NOW(), ?, ?)',
        [id, campaignId, subscriberId, status, error]
      );
    } finally {
      conn.release();
    }
  }
};

export async function trackVisitor(ipAddress: string, userAgent: string): Promise<void> {
  const existing = await visitors.findByIp(ipAddress, userAgent);
  if (existing) {
    await visitors.updateVisit(ipAddress, userAgent);
  } else {
    await visitors.create(ipAddress, userAgent);
  }
}

export async function addSubscriber(email: string, name?: string, source: string = 'website'): Promise<void> {
  await subscribers.create(email, name, source);
}

export default {
  visitors,
  subscribers,
  campaigns,
  logs,
  trackVisitor,
  addSubscriber
};