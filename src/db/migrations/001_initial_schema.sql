-- Visitors table to track site visitors
CREATE TABLE IF NOT EXISTS visitors (
  id TEXT PRIMARY KEY,
  ip_address TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  first_visit DATETIME NOT NULL,
  last_visit DATETIME NOT NULL,
  visit_count INTEGER NOT NULL DEFAULT 1,
  cookie_consent BOOLEAN,
  consent_date DATETIME
);

-- Email subscribers table
CREATE TABLE IF NOT EXISTS email_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at DATETIME NOT NULL,
  unsubscribed_at DATETIME,
  status TEXT NOT NULL CHECK (status IN ('active', 'unsubscribed')),
  source TEXT NOT NULL
);

-- Email campaigns table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  sent_at DATETIME,
  status TEXT NOT NULL CHECK (status IN ('draft', 'scheduled', 'sent', 'failed'))
);

-- Email sending logs
CREATE TABLE IF NOT EXISTS email_logs (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  subscriber_id TEXT NOT NULL,
  sent_at DATETIME NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'opened', 'clicked')),
  error TEXT,
  FOREIGN KEY (campaign_id) REFERENCES email_campaigns(id),
  FOREIGN KEY (subscriber_id) REFERENCES email_subscribers(id)
);

-- Indexes for better query performance
CREATE INDEX idx_visitors_ip ON visitors(ip_address);
CREATE INDEX idx_subscribers_email ON email_subscribers(email);
CREATE INDEX idx_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_logs_campaign ON email_logs(campaign_id);
CREATE INDEX idx_logs_subscriber ON email_logs(subscriber_id);