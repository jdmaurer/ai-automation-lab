# NEXT SESSION START

Updated: 2026-10-15

## Before local repo work

GitHub was updated remotely on 2026-10-15 (readiness-check result, question-format rule, read-and-supervise rule). Fast-forward the local clone before editing anything locally.

```powershell
cd "$HOME\ai-automation-lab"
git pull --ff-only
```

Expected result: "Fast-forward" (or "Already up to date"). If git reports local changes or an error, stop and inspect before doing anything else.

## Start the Rivertown SQLite build chat

Paste this:

Read CURRENT_STATE.md and ASSISTANT_WORKING_CONTEXT.md from the live GitHub repo first, then cases/rivertown-lead-intake/README.md (data contract). The SQL readiness check is done (2026-10-15): ready for the build. Today we build the Rivertown SQLite schema: Lead, Company, Source, WorkflowRun, ReviewDecision, with primary keys, foreign keys, nullability, and UNIQUE (external_id, source_id). Then run the duplicate test and the invalid-reference test, with foreign-key enforcing turned on, and write pass/fail rules before each test runs. This is the applied evidence for Gate 1 #7.

How to run it: Claude Code (or you) writes the SQL; my job is to review it, approve it, run it, and judge the results, which is the read-and-supervise target. Don't ask me to write code from a blank or fill in blanks unless I ask to practice writing. Every question shows every table involved, labeled by name, with primary and foreign keys marked, the exact row going in, and the goal in one sentence. Define any term before asking about it. State purpose and expected result before each step, one step at a time. Track what I do independently vs. with help. Don't start Intermediate Python.

## After the build

Re-score Gate 1 #7 from the SQLite evidence, then close Gate 1 #8 in n8n (correlation ID on each row, explicit timeout). A short mixed SQL + Python retention check comes later, in review format.
