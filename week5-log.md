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
