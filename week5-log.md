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
