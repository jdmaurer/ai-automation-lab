# Start of Session — Next Session

N8N103 Section 1 — AI Introduction is complete: both hands-on projects are
finished, the Practical Assessment is 3/3, and the knowledge check is complete.

---

## Before opening a chat

Because the 2026-09-17 closeout was written directly to GitHub, fast-forward
the local clone before doing local repo work:

```powershell
cd "$HOME\ai-automation-lab"
git pull --ff-only
git status
```

Expect a clean working tree after the pull.

## Opening the chat

Start inside the AI Skills Intensive project and have the assistant read
`CURRENT_STATE.md` first.

Key working rule for N8N103 Section 2:

> Before the hands-on work begins, map the Section 2 knowledge-check questions
> to the concepts in the practical. Ask the relevant question when I actually
> reach that concept in n8n. Do not save the questions for a post-project quiz.
> Group routine same-screen configuration when there is no decision point.

## First work items

1. In `Section 1 - Feedback Agent`, add the course documentation sticky note.
   Use the actual model `openai/gpt-oss-120b`. Correct the course template's
   Order Status description to use `order_id`, not `customer_id`.
2. Skip the optional Simple Memory stretch unless Josh explicitly wants it.
3. Begin **N8N103 Section 2 — Testing & Debugging**.
4. Map Section 2 knowledge-check questions into the hands-on work before
   starting the build.

Section 2 should cover pinned/mock data, test scenarios, execution data, error
messages/logs, error handling, and deciding when to troubleshoot independently
versus when to seek help.

## Section 1 state to preserve

- `Section 1 - Feedback Pipeline` completed and graded.
- `Section 1 - Feedback Agent` completed and graded.
- Practical Assessment: 3/3.
- Knowledge check: complete.
- Project 2 course model was unavailable; actual model used:
  `openai/gpt-oss-120b`.
- Agent tool tests passed for order status, customer info, and product info.

## Portfolio state to preserve

`Rivertown - Lead Intake v1` remains unpublished after successful live
verification. Do not rerun or reset it unless a new change requires another
evidence run.

## Open items, not blockers

- n8n Cloud trial: check remaining days and decide self-host vs paid before expiry.
- Claude Code install remains pending and matters from around Week 4.
- Rotate the Rivertown Header Auth secret before any real client/production use.
