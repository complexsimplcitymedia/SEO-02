-- Leads table to track potential customers
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  service_interest TEXT,
  message TEXT,
  status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  source TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  last_contact DATETIME,
  priority INTEGER DEFAULT 1,
  notes TEXT
);

-- Lead activity tracking
CREATE TABLE IF NOT EXISTS lead_activities (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('call', 'email', 'form', 'chat', 'website')),
  description TEXT,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

-- Create indexes
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_priority ON leads(priority);
CREATE INDEX idx_lead_activities_lead ON lead_activities(lead_id);