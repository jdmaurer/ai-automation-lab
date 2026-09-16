# Start of Session — Next Session

This file is the start-of-day checklist. Rivertown Lead Intake v1 live verification
is complete. Do not repeat the Postman test run unless a new change requires it.

---

## Before opening a chat

1. **Confirm the repo is current.** In PowerShell:

   ```powershell
   cd "$HOME\ai-automation-lab"
   git status
   ```

   Expect a clean working tree after the 2026-09-16 session-close commit and push.

2. **Sync the GitHub source used by the AI Skills Intensive project.**

3. **Open N8N103 in n8n Academy.**
   N8N102 is complete. N8N101 remains diagnostic-only; do not chase the
   Foundations badge.

## Opening the chat

Start a new chat inside the AI Skills Intensive project.

Paste:

> Read CURRENT_STATE.md and NEXT_SESSION_START.md first. Rivertown Lead Intake
> v1 live verification is complete. Continue from the exact next step with
> N8N103. Explain the purpose and expected result before instructions, give one
> instruction at a time by default, group routine same-screen steps with no
> decision point, use one PowerShell command per copy block, and include pin
> data JSON only when the current test actually uses n8n pinned data.

## First work item

Begin **N8N103 — In Practice: AI, Testing and Best Practices**.

Use the same working style that succeeded on Rivertown:
- learn in the tool rather than reading long explanations first
- pause at real decision points
- capture any n8n documentation defects in `n8n-patterns.md`
- prefer portfolio evidence and working behavior over certificate chasing

## Rivertown state to preserve

- `Rivertown - Lead Intake v1` is **unpublished**
- webhook path is `rivertown/lead-intake`
- Header Auth is configured with a dedicated credential
- all ten Postman cases A-J passed against the published Production URL
- tested export is `cases/rivertown-lead-intake/lead-intake-v1.json`
- the credential secret is not in the repository
- live-test Data Table currently has 18 rows
- the canonical reset baseline is
  `cases/rivertown-lead-intake/rivertown_leads_seed.csv`
- do not reset the live table unless another test run requires the 10-row baseline

## Open items, not blockers for starting N8N103

- n8n Cloud trial: check remaining days and decide self-host vs paid before expiry
- Claude Code install remains pending and matters from around Week 4
- rotate the current Rivertown Header Auth secret before any real client or
  production use

## Source order

1. `CURRENT_STATE.md`
2. `NEXT_SESSION_START.md`
3. `cases/rivertown-lead-intake/` when Rivertown context is needed
4. Master Calendar for sequencing
5. current `weekN-log.md` for history
