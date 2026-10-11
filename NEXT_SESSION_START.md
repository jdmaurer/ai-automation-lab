# NEXT SESSION START

Updated: 2026-10-11

## Before local repo work

Because ChatGPT updated the GitHub repository remotely, fast-forward the local clone before editing anything locally.

```powershell
cd "$HOME\ai-automation-lab"
git status
git pull --ff-only
```

Expected result:
- git status should not show uncommitted work that would be overwritten
- git pull should bring down the 2026-10-11 closeout commits, including SQL_RETRIEVAL_HANDOFF.md

If git status shows local changes, stop before pulling and inspect them.

## Start the fresh SQL chat

Paste this:

Read CURRENT_STATE.md, ASSISTANT_WORKING_CONTEXT.md, and SQL_RETRIEVAL_HANDOFF.md from the live GitHub repository first. Run the bounded SQL retrieval diagnostic in SQL_RETRIEVAL_HANDOFF.md one problem at a time. Give me the table and column names; test SQL structure and logic, not name memorization. Do not teach beyond the 12-week program's applied SQL requirement. After the diagnostic, give me the short remediation list before we start the Rivertown SQLite build.

## After the diagnostic

Proceed to the Rivertown SQLite schema and the duplicate plus invalid-reference tests described in CURRENT_STATE.md.
