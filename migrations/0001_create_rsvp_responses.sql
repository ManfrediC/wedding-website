CREATE TABLE IF NOT EXISTS rsvp_responses (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL CHECK (language IN ('en', 'it', 'de')),
  attending TEXT NOT NULL CHECK (attending IN ('yes', 'no')),
  primary_guest_name TEXT NOT NULL,
  adult_count INTEGER NOT NULL DEFAULT 0 CHECK (adult_count >= 0),
  adults_json TEXT NOT NULL DEFAULT '[]',
  child_count INTEGER NOT NULL DEFAULT 0 CHECK (child_count >= 0),
  children_json TEXT NOT NULL DEFAULT '[]',
  dietary_requirements TEXT NOT NULL DEFAULT '',
  allergies TEXT NOT NULL DEFAULT '',
  accessibility_mobility TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  notification_status TEXT NOT NULL DEFAULT 'not_sent',
  notification_error TEXT NOT NULL DEFAULT '',
  revision_count INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rsvp_responses_attending ON rsvp_responses(attending);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_updated_at ON rsvp_responses(updated_at);
