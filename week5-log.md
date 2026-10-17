# Week 5 log

## Thursday 10.1.26 - DataCamp Introduction to SQL

I completed DataCamp's Introduction to SQL before starting the Intermediate course. I believe the completion was October 1; I did not independently verify the certificate timestamp during this closeout.

I stayed with DataCamp instead of SQLBolt because the interactive exercise format works much better for me. That changes the practice resource, not the master-calendar goal: I still need working relational SQL for the Rivertown data model.

Stopping point: Introduction to SQL complete. Next: Intermediate SQL.


## Friday 10.2.26 and Monday 10.5.26 - DataCamp Intermediate SQL

Worked on the Intermediate course on October 2 and October 5. I did not work on Saturday October 3 or Sunday October 4. Finished the entire Intermediate SQL course on October 5.

What I learned:
- WHERE filters individual rows before grouping. HAVING filters finished groups after aggregation.
- GROUP BY changes what a row represents: before grouping it can be one flight; after grouping it can be one airline, plane type, or category.
- COUNT, AVG, and COUNT(DISTINCT ...) summarize groups.
- CASE inside an aggregate lets one metric use a condition without filtering the whole query. For example, a CASE can pass only long-haul distances into AVG or only long-haul flight IDs into COUNT.
- A CTE is a temporary table-like result for the current query. A value or alias created at one query level is safest to use at a later level.
- A scalar subquery can produce one number, such as the total number of flights, for a percent-of-total calculation.
- I do not need to display every intermediate calculation as its own column; helper columns were useful while learning the numerator and denominator, then the same calculations could be nested directly.
- The final exercises combined row filtering, grouping, regular aggregates, DISTINCT, conditional aggregates, and HAVING. I wrote the final multi-part query myself.

What was hard:
- Nested queries and aliases became painful when explanations referred to a name like flight_count without saying which query level it belonged to.
- Giving me the syntax before I reasoned it out turned me into a parrot. The better method is: give the requirement, ask me for the next construct, confirm or correct only after I answer, and then give the exact copy/paste syntax.
- One small step at a time worked much better than pages of explanation. If a concept is new, explain it like I am in fifth grade, then let me use it immediately.

Teaching rule reinforced: during coding practice, do not hide the answer in the question or correction. Ask first. Once I get it right, give me the exact syntax if I need it.

Stopping point: DataCamp Intermediate SQL complete. I have NOT completed the SQL remediation yet. JOINs and relational-database work still remain. Next: DataCamp Joining Data in SQL, then relational database basics and the Rivertown SQLite schema with the external_id + source uniqueness rule and duplicate/invalid-reference tests.

## Tuesday 10.6.26 - Joining Data complete; relational course started

Finished DataCamp Joining Data in SQL. The join course landed much better than the newer relational course because the earlier SQL training had already made JOIN, WHERE, GROUP BY, and related analysis patterns familiar.

Started DataCamp Introduction to Relational Databases in SQL. Covered the point of splitting a redundant flat table into related tables, CREATE TABLE, ALTER TABLE, adding/dropping/renaming columns, migrating rows with INSERT INTO ... SELECT DISTINCT, data types, CAST, and changing column types.

The important teaching issue became clear quickly: getting through fill-in-the-blank exercises is not the same as being able to retrieve the syntax later. I can usually explain what the database should do, but small command words and exact placement often do not stick.

Stopping point: relational database course in progress. Continue the course before doing any formal remediation.


## Wednesday 10.7.26 - Constraints and start of keys

Continued DataCamp Introduction to Relational Databases in SQL. Worked through VARCHAR/CHAR sizing, ALTER COLUMN ... TYPE, USING SUBSTRING when shrinking text, NOT NULL, UNIQUE constraints, and the start of the keys chapter.

The concept side was much stronger than the syntax side. I understood why existing data must satisfy a new constraint and why a natural-looking identifier can be a bad long-term key. The words SET in SET NOT NULL and ADD CONSTRAINT were easy to use repeatedly inside one exercise block and then hard to retrieve later.

Stopping point: keys chapter underway.


## Thursday 10.8.26 - No Skills Intensive coursework

No SQL or Skills Intensive training today.

Worked instead on business/marketing work around joshuadmaurer.com: landing page, About page, and HTML for the first course offering. Also made progress on the AI job-search automation side project. This was intentional market-facing work, not a change to the 12-week curriculum.


## Friday 10.9.26 - Keys and surrogate keys

Returned to the relational database course. Worked through superkeys, candidate keys, primary keys, and surrogate keys.

The concepts were clear: a candidate key is a minimal unique identifier, a primary key is the chosen candidate key, and a surrogate key is an artificial stable identifier. I also pushed back on treating a currently unique name pair as a safe future identifier; duplicate names can exist later.

Syntax retrieval remained the weak point, especially RENAME COLUMN and ADD CONSTRAINT. The course's starter code and fill-in blanks made it possible to finish exercises without proving that I could produce the command from a plain-English task.

Stopping point: surrogate-key exercises near the end of Chapter 3.


## Saturday 10.10.26 - Relational database course completed; retention problem identified

Finished DataCamp Introduction to Relational Databases in SQL, including foreign keys, one-to-many and many-to-many relationships, referential integrity, ON DELETE CASCADE, updating rows from another table, and the final multi-table analysis exercises.

Concepts that held up well:
- Primary keys identify rows; foreign keys point to valid rows in another table.
- One university can have many professors; the foreign key belongs on the many side.
- Many-to-many relationships use a middle table with foreign keys to both sides.
- Referential integrity prevents broken references.
- CASCADE can deliberately delete dependent rows when the referenced parent is deleted.
- DISTINCT removes duplicate query results; UNIQUE is a stored-data rule that prevents duplicates.
- JOIN, WHERE, GROUP BY, COUNT, ORDER BY, LIMIT, and the general analysis logic were mostly familiar from earlier SQL work.

What did not stick reliably was exact command syntax. A delayed-recall diagnostic showed weak retrieval for:
- ADD CONSTRAINT
- SET NOT NULL
- RENAME COLUMN
- INSERT INTO ... VALUES
- INSERT INTO ... SELECT DISTINCT ... FROM
- UPDATE ... SET ... FROM ... WHERE
- ALTER COLUMN ... TYPE
- FOREIGN KEY ... REFERENCES
- UNIQUE constraint syntax

Some patterns were stronger, including ALTER TABLE ... ADD COLUMN, DROP COLUMN, SELECT, JOIN logic, WHERE, GROUP BY, COUNT, and LIMIT.

Important correction for future practice: do not test me on made-up table or column names. In real work those names will be in front of me. Give the business job and the relevant schema names, then test whether I can choose the right SQL family and construct the syntax. Also separate concept knowledge from syntax retrieval; I often understood the rule while failing to recall one command word.

A DataCamp run produced a referential-integrity error even though the CASCADE answer had been accepted. The SQL was correct; only the highlighted DELETE statement had run, so the DROP/ADD constraint statements above it were skipped. Running the full script worked.

Decision for next session: do not start another SQL course and do not expand into a DBA track. Start a fresh chat with a bounded whole-certificate retrieval test, compare the weak spots against the master calendar's actual SQL requirement, practice only what is needed, then build the Rivertown SQLite schema with UNIQUE(external_id, source) and the duplicate/invalid-reference tests.

Stopping point: all planned DataCamp SQL coursework is complete. Next: whole-certificate retrieval diagnostic, then the applied Rivertown SQLite build.


## Wednesday 10.14.26 - Introduction to Python certificate completed; return to SQL

Finished DataCamp Introduction to Python. The personal gold-medal/podium motivation helped get the certificate finished, but the next project priority is not another certificate. Pause before Intermediate Python and return to Rivertown SQL readiness and the applied SQLite/idempotency build.

Covered basic Python expressions, variable assignments, lists, functions, methods, imports, NumPy arrays, 1D/2D selection, arithmetic, average, median, standard deviation, and correlation. On the final exercise, mean/median/standard deviation were completed quickly. Correlation initially produced an unhelpful huge matrix because np.corrcoef interpreted rows as variables; corrected by comparing height and weight columns separately. The wrong-looking output was a useful diagnostic clue. Earlier conversion exercise exposed a function-call parentheses versus list-brackets retrieval gap. Full details and future quiz procedure are in PYTHON_RETRIEVAL_HANDOFF.md.

Teaching lesson: I can complete exercises rapidly when the task is clear and I am allowed to try the whole code myself. Long explanations, supplying code before I attempt it, failing to explicitly say when to create a variable, and treating intentionally hidden instructions as knowledge gaps waste time. Present exact requirements in plain English, one task at a time, then diagnose only real errors. During practice, I may deliberately reconstruct the full script rather than fill in provided blanks.

Next: SQL readiness check from SQL_RETRIEVAL_HANDOFF.md, then small Rivertown SQLite build with UNIQUE(external_id, source), duplicate and invalid-reference tests, followed later by short mixed SQL/Python retrieval practice. No Intermediate Python certificate yet.


## Thursday 10.15.26 - Rivertown SQLite schema built; duplicate and invalid-reference tests passed

Installed the SQLite command-line tool (winget, version 3.53.4) and built the Rivertown database: Source, Company, Lead, WorkflowRun, and ReviewDecision, with primary keys, foreign keys, required columns, and UNIQUE (external_id, source_id). Claude wrote the SQL; I reviewed, approved the pass/fail rules before each test, ran everything, and judged the results.

Duplicate test passed: Dana resending FORM-10231 from the website form was refused; Pat's FORM-10231 from the event form was accepted, because the pair is different. Invalid-reference test passed: a lead pointing to source_id 9, which doesn't exist, was refused with foreign keys on. Gate 1 #7 re-scored to Pass. Evidence is in cases/rivertown-lead-intake/sqlite/README.md.

Independent: installing and checking SQLite, the UNIQUE logic (Pat gets in because the source differs), judging both tests, and spotting that a broken form reusing a number for a different person would be blocked too (already threat-model F2). With help: what each column stood for (lead_id vs source_id) and reading the terminal output the first time.

Teaching lesson: the session started with questions before anything was taught, and about 40 minutes went to untangling labels and shorthand, not SQL. I understood what UNIQUE does; I didn't understand the why or the variables. What worked: the real-life story (when would the same form number show up twice?), one rule stated in one line, the exact cell where an error happens, and a reading guide before running a test. Rules added to ASSISTANT_WORKING_CONTEXT.md and CURRENT_STATE.md.

Next: close Gate 1 #8 in n8n (execution ID on each row, explicit timeout).


## Thursday 10.15.26 (afternoon) - Gate 1 #8 closed; Gate 1 passed

Back in n8n for the first time since 9/30. Added a correlation ID to the Rivertown build: a new execution_id column on the Data Table, written by the four Insert nodes with {{ $execution.id }}. The row keeps the run that created it, because that run made every decision; a resend only adds to duplicate_count. Then set a 60-second workflow timeout (the worst normal run is about 30 s with AI retries) and set the workflow timezone to Chicago.

Six tests, rules approved before each one, all passed: a new rules-path lead (run #351), a resend that left the ID at 351 (#352), an AI lead sent to review (#353), a blank message (#354), an AI-routed lead (#355), and a forced timeout at 1 s (#356 canceled, Postman got 500, no row). Then I put the timeout back to 60 s. Gate 1 #8 re-scored to Pass. Gate 1 is PASSED: 9 of 10, all four mandatory items.

Independent: the design call (open #350, the run that made the ticket, not #400, the resend), grading all six tests, and running the last two Insert-path tests together instead of one at a time. With help: n8n navigation (Add Column, Refresh column list) and choosing the timeout value.

Teaching lesson: the opening was three pages for one question after two weeks away. It worked once we looked at the real thing in n8n: the Executions list, one run's green path, the table. Show it on screen, one short step at a time. Side issues get named when they appear, with a choice to handle now or log.

The bigger lesson is about gates. Gate 1 stopped my building for two weeks; the log shows the 9/30 build and then nothing but coursework until today. That is not what a gate is for. New rule: a gate is a snapshot, not a stop. Misses get folded into the next builds, skills get learned inside the build that needs them in short bursts at the level the build needs, and only a safety problem pauses anything. I learned SQL so the Rivertown model can be rebuilt in Dataverse; that build is next.

Next: Dataverse rebuild of the SQLite model (includes the UPDATE the SQL gate note asked for).


## Friday 10.16.26 - Dataverse rebuild, part 1: Source table and both keys Active

Started the reason I learned SQL: rebuilding the Rivertown SQLite model in Dataverse. Thursday night was only re-orientation (Lead's columns next to the SQLite Lead table: source_id and the UNIQUE rule were missing). Friday evening was the build.

Design, decided before any clicking: source is a Lookup to a new Source table (option A) because that is the SQLite model rebuilt, with both protections (duplicate and invalid reference). Honest client answer: for a small client with two forms, a dropdown (Choice) on Lead would be fine. The form sends its source name, the flow checks it against Source, and a missing source means website_form. Existing rows get updated, not deleted.

Built: the Source table with website_form and event_form and a key on name; the source lookup on Lead (Business required); all 12 existing leads updated to website_form by hand in the grid (my UPDATE); a check that all 12 external_ids are different (Holloway and Northline appear twice as repeat customers, different form numbers); external_id cut from 850 to 100 characters after the key was refused as too large (850 x 2 bytes = the whole 1,700-byte index limit), and made Business required; then the Lead key "Unique lead per source" on external_id + source. Active.

Independent: the Lead source column panel, the Lead key panel, the external_id fix (Required and length), and working out the three ways into a column's settings. With help: getting around Power Apps, the design choices (A vs B took two passes and a fifth-grader version), and reading Microsoft's errors.

What went wrong: the first source column landed on the Source table instead of Lead (the left panel had both tables open), and deleting it from the column list failed until we deleted the relationship instead. That is the same kind of link-cleanup hole that ate an hour last time and helped push me into two weeks of certificates. The fix wasn't more care; it was giving Claude eyes. Installed Claude in Chrome in the blue window. After that, directions matched my screen and the rest of the build went step by step.

Teaching lessons: button name first in bold, then where on screen (far left, middle, top, bottom) and it has to be accurate, then what I'll see, and the why at the bottom. Copy boxes right under the line that says paste. One click per message while navigating. Say whether a screenshot is needed. Label recommendations as build fit or client fit so I know if the advice is for the build or for a real client. Rules added to ASSISTANT_WORKING_CONTEXT.md.

Next: the flow learns to use the key. A resend bumps duplicate_count on the existing row instead of making a second one (the Gate 1 #7 UPDATE note), with pass/fail rules first.
