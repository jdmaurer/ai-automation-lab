-- Rivertown starter rows: two sources, one company, one lead (Dana)
PRAGMA foreign_keys = ON;

INSERT INTO Source (source_id, name) VALUES (1, 'website_form');
INSERT INTO Source (source_id, name) VALUES (2, 'event_form');

INSERT INTO Company (company_id, name, company_size) VALUES (1, 'Meridian Partners LLC', '11-50');

INSERT INTO Lead (source_id, external_id, company_id, email, first_name, last_name,
                  engagement_type, message, submitted_at, received_at, routed_to)
VALUES (1, 'FORM-10231', 1, 'dana.okonkwo@meridian-partners.com', 'Dana', 'Okonkwo',
        'Training', 'Looking for a two-day facilitation workshop for our managers.',
        '2026-09-14T15:22:08.000Z', '2026-09-14T15:22:11.480Z', 'training');

.mode box
SELECT * FROM Source;
SELECT lead_id, source_id, external_id, company_id, email, status FROM Lead;
