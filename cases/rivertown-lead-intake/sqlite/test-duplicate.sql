-- Duplicate test: UNIQUE (external_id, source_id) on Lead
PRAGMA foreign_keys = ON;

.print
.print === A: Dana resends FORM-10231 from source 1 (website_form). Expect: REJECTED ===
INSERT INTO Lead (source_id, external_id, email, submitted_at, received_at)
VALUES (1, 'FORM-10231', 'dana.okonkwo@meridian-partners.com', '2026-09-14T15:22:08.000Z', '2026-09-14T15:24:40.000Z');

.print
.print === B: Pat sends FORM-10231 from source 2 (event_form). Expect: ACCEPTED ===
INSERT INTO Lead (source_id, external_id, email, submitted_at, received_at)
VALUES (2, 'FORM-10231', 'pat.lee@northfield.org', '2026-10-15T14:00:00.000Z', '2026-10-15T14:00:02.000Z');

.print
.print === Lead table after the test. Expect: 2 rows, one per (external_id, source_id) pair ===
.mode box
SELECT lead_id, source_id, external_id, email FROM Lead;
