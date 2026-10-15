-- Invalid-reference test: Lead.source_id must point to a real Source row
PRAGMA foreign_keys = ON;

.print
.print === Check: is foreign-key enforcing on? Expect: 1 ===
PRAGMA foreign_keys;

.print
.print === C: a lead claims it came from source 9, which does not exist. Expect: REJECTED ===
INSERT INTO Lead (source_id, external_id, email, submitted_at, received_at)
VALUES (9, 'FORM-20001', 'sam.ortiz@example.org', '2026-10-15T15:00:00.000Z', '2026-10-15T15:00:02.000Z');

.print
.print === Lead table after the test. Expect: still 2 rows (Dana and Pat) ===
.mode box
SELECT lead_id, source_id, external_id, email FROM Lead;
