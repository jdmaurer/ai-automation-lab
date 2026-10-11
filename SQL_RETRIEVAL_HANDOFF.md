# SQL Readiness Check Handoff

Date revised: 2026-10-11

## Purpose

This file starts a fresh ChatGPT conversation for the SQL remediation block in Josh Maurer's 12-week AI Skills Intensive.

The target is **operational SQL literacy**, not SQL fluency and not memorizing the DataCamp certificate.

Josh should be able to understand, build, inspect, and test a small relational database for Rivertown. He may use normal reference help or AI assistance for exact syntax as long as he understands what the SQL does and can supervise it.

## Authoritative scope

The master-calendar SQL target is working relational competence for the Rivertown implementation:

- understand tables, rows, columns, primary keys, foreign keys, and nullability
- design a small relational model
- create the needed tables and relationships
- perform basic row operations needed by the build
- enforce idempotency with `UNIQUE (external_id, source)`
- run duplicate and invalid-reference tests
- explain why the constraints and test results matter

Do not expand into DBA work, query optimization, advanced PostgreSQL administration, or a general data-engineering track.

## Important correction from 2026-10-11

Do **not** run the earlier broad whole-certificate 13-item syntax diagnostic.

That would over-measure whether Josh memorized the course rather than whether he has the SQL capability the 12-week program requires.

The correct approach is a **small Rivertown readiness check**, then move into the actual build.

## What is already conceptually strong

Do not reteach these unless the readiness check shows a real misunderstanding:

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

Josh can read and understand most SQL he sees. The remaining issue is not broad conceptual understanding; it is exact syntax retrieval for some commands.

## What still needs practice

Only practice syntax that the Rivertown build actually needs.

Likely weak retrieval areas include:
- adding a named constraint
- defining a UNIQUE rule
- defining a foreign key
- INSERT INTO ... VALUES
- UPDATE ... SET ... WHERE
- CREATE TABLE / ALTER TABLE patterns when needed

Do not require memorization of certificate-specific syntax such as information_schema inspection, PostgreSQL-only variants, complex UPDATE ... FROM patterns, multi-table aggregate exercises, or every ALTER variation unless the Rivertown build directly needs them.

## Readiness check

Use at most 4-6 short tasks, one at a time, using the actual Rivertown concepts.

Give table and column names explicitly. Do not test name memory.

Suggested checks:

1. Given a small Lead/Source schema, ask which columns should be primary and foreign keys and why.
2. Ask Josh to recognize whether a task needs CREATE/ALTER, INSERT, UPDATE, or SELECT.
3. Ask him to create or complete the `UNIQUE (external_id, source)` rule with normal reference help if needed.
4. Ask him to insert one row with `INSERT INTO ... VALUES`.
5. Ask him to predict what should happen when a duplicate external_id + source is inserted.
6. Ask him to predict what should happen when a foreign key points to a missing parent.

Stop once there is enough evidence to identify only the truly necessary syntax gaps.

## Pass condition

Josh is ready to move into the Rivertown SQLite build when he can:

- explain the relational model
- choose the correct SQL operation family for a task
- read and supervise the core SQL used in the build
- write or complete basic statements with reasonable reference help
- correctly predict duplicate and invalid-reference behavior

Exact recall of every keyword from a blank screen is **not** required.

## What comes immediately after the readiness check

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
- `UNIQUE (external_id, source)`

Then run:

1. duplicate test — same external_id + source must be rejected or handled idempotently
2. invalid-reference test — a foreign key value pointing to a missing parent must fail

After those tests, re-score Gate 1 criterion #7 from actual evidence.

## Teaching style

Josh learns by doing. Use one instruction or question at a time. Explain the goal before syntax. Do not make him retype large blocks. Do not mistake a missed keyword for a missed concept. If exact syntax is not the skill being tested, allow normal reference help.

## Fresh-chat start prompt

Read CURRENT_STATE.md, ASSISTANT_WORKING_CONTEXT.md, and SQL_RETRIEVAL_HANDOFF.md from the live GitHub repository first. Treat the SQL target as operational SQL literacy, not memorization. Do a short Rivertown-focused readiness check only, using at most 4-6 tasks and giving me the table and column names. Test whether I can choose the right SQL operation, understand the relational model, supervise the syntax, and predict duplicate/foreign-key behavior. Do not run a whole-certificate syntax exam. Then move into the Rivertown SQLite build.
