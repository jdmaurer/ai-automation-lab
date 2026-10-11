# SQL Retrieval Diagnostic Handoff

Date prepared: 2026-10-11

## Purpose

This file starts a fresh ChatGPT conversation for the SQL remediation block in Josh Maurer's 12-week AI Skills Intensive.

The goal is NOT to turn Josh into a SQL specialist. The goal is to verify and strengthen the exact SQL needed for the program's applied relational work, then move into the Rivertown SQLite build.

## Authoritative scope

The master-calendar SQL target is working relational competence for the Rivertown implementation:
- understand tables, rows, columns, primary keys, foreign keys, and nullability
- create and alter a small relational schema
- perform basic row operations needed by the build
- model relationships correctly
- enforce idempotency with UNIQUE(external_id, source)
- run duplicate and invalid-reference tests
- explain why the constraint/test behavior matters

Do not expand into DBA work, query optimization, advanced PostgreSQL administration, or a general data-engineering track.

## Coursework completed

- DataCamp Introduction to SQL
- DataCamp Intermediate SQL
- DataCamp Joining Data in SQL
- DataCamp Introduction to Relational Databases in SQL

The relational course was completed 2026-10-10.

## What is already conceptually strong

Do not reteach these unless the diagnostic shows a real misunderstanding:
- primary key vs foreign key
- one-to-many relationships
- many-to-many relationships and a linking table
- referential integrity
- ON DELETE CASCADE concept
- UNIQUE vs DISTINCT concept
- JOIN purpose and matching logic
- WHERE as row filtering
- GROUP BY as making groups
- COUNT and LIMIT
- why a foreign key value must reference an existing parent row
- why the Rivertown build needs duplicate prevention/idempotency

## What did not retrieve reliably

Test these from plain-English tasks, without fill-in-the-blank hints:
- ADD CONSTRAINT
- SET NOT NULL
- RENAME COLUMN
- INSERT INTO ... VALUES
- INSERT INTO ... SELECT DISTINCT ... FROM
- UPDATE ... SET ... FROM ... WHERE
- ALTER COLUMN ... TYPE
- FOREIGN KEY ... REFERENCES
- UNIQUE constraint syntax

Some of these may now retrieve better after repeated exposure. Test before reteaching.

## Important testing rules

1. Give the business job first.
2. Give the table and column names explicitly. Do not test memory for invented schema names.
3. Ask Josh to choose the SQL family before exact syntax when useful:
   - change table structure
   - change row data
   - retrieve/query data
   - add a rule/constraint
4. One problem at a time.
5. Do not reveal syntax in the question.
6. If Josh is stuck, first remind him what the SQL needs to accomplish. Only then give one syntax cue.
7. Mark separately:
   - concept understood / not understood
   - syntax retrieved independently / retrieved with cue / not retrieved
8. Do delayed retrieval. Do not repeat the same command immediately three times and call it learned.
9. Do not overtrain analysis syntax that is outside the applied Rivertown requirement.
10. Stop the diagnostic once there is enough evidence to build a short remediation list.

## Suggested diagnostic order

Use realistic but simple schemas and provide the names in each prompt.

1. CREATE TABLE with VARCHAR, INTEGER, NOT NULL, and PRIMARY KEY.
2. ALTER TABLE ADD COLUMN.
3. RENAME a column.
4. ALTER COLUMN ... TYPE.
5. SET NOT NULL on an existing column.
6. ADD CONSTRAINT ... UNIQUE(...).
7. INSERT INTO ... VALUES for one row.
8. UPDATE an existing row with SET and WHERE.
9. INSERT INTO ... SELECT DISTINCT ... FROM for migration.
10. Add a FOREIGN KEY ... REFERENCES constraint to an existing table.
11. One simple JOIN using foreign key to primary key.
12. One invalid-reference prediction.
13. One duplicate prediction against UNIQUE(external_id, source).

Do not require every item if earlier responses already establish competence.

## Pass condition for the diagnostic

The diagnostic is successful when Josh can:
- identify the correct SQL operation family from the job
- explain what the statement will do
- produce or nearly produce the core syntax for the commands needed in the Rivertown build
- correctly predict duplicate and invalid-reference behavior

Minor punctuation, capitalization, or naming slips are not grounds for failure if the structure and logic are correct.

## What comes immediately after the diagnostic

Build the Rivertown SQLite schema in applied case-study mode:
- Lead
- Company
- Source
- WorkflowRun
- ReviewDecision
- primary keys
- foreign keys
- nullability
- basic CRUD needed by the case
- UNIQUE(external_id, source)

Then run:
1. duplicate test — same external_id + source must be rejected or handled idempotently
2. invalid-reference test — a foreign key value pointing to a missing parent must fail

After those tests, re-score Gate 1 criterion #7 from actual evidence.

## Teaching style

Josh learns by doing. Use one instruction or question at a time. Explain the goal before syntax. Do not make him retype large blocks. Do not mistake a missed keyword for a missed concept. If he pushes back that a question lacks context, fix the question rather than guessing what he should have inferred.

## Fresh-chat start prompt

Read CURRENT_STATE.md, ASSISTANT_WORKING_CONTEXT.md, and SQL_RETRIEVAL_HANDOFF.md from the live GitHub repository first. Run the bounded SQL retrieval diagnostic in SQL_RETRIEVAL_HANDOFF.md one problem at a time. Give me the table and column names; test SQL structure and logic, not name memorization. Do not teach beyond the 12-week program's applied SQL requirement. After the diagnostic, give me the short remediation list before we start the Rivertown SQLite build.
