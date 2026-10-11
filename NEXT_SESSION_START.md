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

Read CURRENT_STATE.md, ASSISTANT_WORKING_CONTEXT.md, and SQL_RETRIEVAL_HANDOFF.md from the live GitHub repository first. Treat the SQL target as operational SQL literacy, not memorization. Do a short Rivertown-focused readiness check only, using at most 4-6 tasks and giving me the table and column names. Test whether I can choose the right SQL operation, understand the relational model, supervise the syntax, and predict duplicate/foreign-key behavior. Do not run a whole-certificate syntax exam. Then move into the Rivertown SQLite build.

## After the readiness check

Proceed to the Rivertown SQLite schema and the duplicate plus invalid-reference tests described in CURRENT_STATE.md.
