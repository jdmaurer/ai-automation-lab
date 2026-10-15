# Python Retrieval Handoff — Introduction to Python completed

Updated: 2026-10-14

## Position in the 12-week program

DataCamp **Introduction to Python** certificate completed on 2026-10-14. This was partly motivated by a personal DataCamp gold-medal podium goal; it does not replace the scheduled applied lab work.

**Decision:** pause before DataCamp **Intermediate Python**. Return to the already planned Rivertown-focused SQL readiness check and SQLite data-model/idempotency build. The next Python course is potentially useful (especially dictionaries, pandas, control flow, loops), but is **not the next dependency**. After SQL applied evidence and a short cross-skill retention check, decide when to resume it. The end goal is reading, supervising, and adapting AI-generated code, not a Python programming career.

The SQL companion record already exists at `SQL_RETRIEVAL_HANDOFF.md`. Do not replace or redo its established readiness plan. Read both files when eventually combining practice.

## Skills covered in the Intro to Python course

- Basic expressions, variables, assignment, data types, `print()`, text conversion with `str()`.
- Python lists: creating, nesting, indexing, slicing, modifying, copying, and basic methods.
- Functions, methods, optional/keyword arguments, `import`, package aliases, and looking up documentation.
- NumPy: `import numpy as np`, `np.array(...)`, arithmetic, 1D and 2D indexing, slices, array shape, column extraction, broadcasting, mean, median, standard deviation, correlation.
- Introductory practice comparing mean vs median in the presence of extreme outliers.

## What the Oct 14 exercises actually demonstrated

**Shown accurately, not as assumed mastery:**
- Josh recalled the import `import numpy as np` and recovered the full-column selection `np_baseball[:, 0]` with minimal prompting.
- He completed mean, median and standard-deviation NumPy computations in a full exercise quickly; after the previous worked material, do **not** label all three as proven delayed independent recall.
- His first correlation attempt supplied only height. A later attempt selected both height and weight as `np_baseball[:, :2]`; this was syntactically valid but, with `np.corrcoef` defaults, computed correlations across rows/players rather than the two columns. He noticed the output looked wrong (a large matrix of ones) and then used separate height and weight columns. This is evidence of useful *output sanity checking*, with an API-input convention still worth revisiting.
- When creating conversion factors, he recalled the NumPy concept but wrote `np.array[0.0254, 0.453592, 1]`; the missing `(...)` function-call parentheses around the `[...]` list were not diagnosed independently from the vague 'not subscriptable' error. This is a **syntax retrieval and error-reading gap**, not a mathematical one.
- Some confusion around whether a sliced 1D result is a 2D one-column table and around `str(avg)`. Resolved distinction: a statistic stored in `avg` is one value because of the *calculation*; `print()` displays the value already stored; a variable's short name does not define its content. Check later only in a useful applied setting.
- Josh intentionally reconstructs code **without looking at DataCamp's instructions**. A variable mismatch under those conditions is not proof of poor data-input selection. Never score what he was not told to do as a skill failure.

## How to run future Python retrieval practice

**Checks match the read-and-supervise target (added 2026-10-15).**
SQL and Python checks show finished code and ask what it does, whether it's correct, what's wrong with it, or what will happen when it runs. Do not ask Josh to write code from a blank or fill in missing lines unless he asks to practice writing. Writing tasks test mastery, which is beyond the program's target.

Keep it applied and short. Offer one complete mini-business requirement at a time (Rivertown synthetic lead-response data is appropriate), let Josh construct the code rather than fill in DataCamp's blanks (only when he asks to practice writing; see the rule above). Test both previously provided scaffolding and independently authored lines when he requests the whole script.

For **each step**, explicitly state in simple English:
- the business purpose and expected observable result;
- which data already exists, its **exact name** and structure (rows/columns if relevant);
- whether he must **create a new variable**, give its exact name, and store a result;
- whether to display, save, or use that result in a later step;
- whether the line was **pre-provided by the exercise** or is a line the learner must write.

Do **not** put the Python solution inside the question, or use function names and syntax as hints during recall; e.g., ask to 'display the result' rather than 'use print()', and describe the needed grouping of numbers before asking him to choose the implementation. If a concept is new, teach it briefly first, then practice. If he asks for help, offer only the needed hint or a correct line. Do not make him reconstruct large boilerplate blocks repeatedly unless he wants that assessment.

After each answer: **correct/incorrect first**, compare his actual attempted code with the correct code side by side only if useful, distinguish syntax error vs task misunderstanding vs missing requirement vs voice dictation, and stop the explanation once the point lands. His own ability to finish several lines in ~40 seconds contrasted with a 20-minute detour around `avg`; avoid that failure mode. At his request, explain briefly at about a fifth-grade level. No lecture before work. Do not treat exposure to a demonstrated answer as independent retrieval.

## Suggested future combined SQL + Python check

**Not the next task.** After the short SQL readiness check and the Rivertown SQLite build/tests, use a few **interleaved** SQL/Python business mini-tasks to test retention. For example: understand a Lead table/schema and idempotency rule, decide which records a SQL operation would touch, then examine/summarize a small synthetic list of lead metrics in Python. Vary surface names, supply exact input data, and ask for intended behavior and small code pieces. Check understanding of function calls versus indexing, arrays versus scalars, 1D/2D selection, and sanity-checking correlation output only as needed. Track **independent / assisted / not yet tested** rather than awarding blanket mastery.

## Next actions

1. Resume from `CURRENT_STATE.md` and `SQL_RETRIEVAL_HANDOFF.md`; SQL readiness check first (4-6 tasks maximum).
2. Build and test the Rivertown SQLite schema, including `UNIQUE (external_id, source)`, duplicate tests and invalid foreign-key reference tests.
3. Add a brief combined SQL/Python retention check after the applied work, or sooner only if it solves an actual build issue.
4. Consider Intermediate Python later, after lab progress; do not commit to another certificate immediately.
