ALTER TABLE rsvp_responses
ADD COLUMN phone_number TEXT NOT NULL DEFAULT '';

ALTER TABLE rsvp_responses
ADD COLUMN address TEXT NOT NULL DEFAULT '';
