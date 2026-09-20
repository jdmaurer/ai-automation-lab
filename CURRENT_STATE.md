# CURRENT_STATE

Project: AI Skills Intensive — 12 Week
Last updated: 2026-09-19

## Current objective

N8N103 — In Practice: AI, Testing and Best Practices is COMPLETE.

Completed:
- Section 1 — AI Introduction
- Section 2 — Testing & Debugging
- Section 3 — Workflow Organization & Best Practices
- Section 4 — 20-question final exam
- Course completion banner reached

N8N102 was already complete. N8N101 remains diagnostic-only; do not chase the
Foundations badge just for the credential.

Next curriculum item from the Master Calendar: **Week 6 — Microsoft access,
Power Automate, Dataverse or SharePoint Lists, and cross-platform translation.**

## Current build state

### N8N103 Section 2 — Testing & Debugging

Completed the retry, error-workflow, debugging, and broken-workflow exercises.

Key working patterns practiced:
- Retry On Fail for temporary failures, not permanent 4xx/configuration errors.
- Separate Error Workflow with Error Trigger for failed production executions.
- Production Error Workflows do not fire from manual test executions.
- Pinned/mock data is for safe manual testing; automatic executions use real data.
- Read the exact error first, inspect the failing node's input, then trace earlier
  in the workflow until the data/configuration changes.

Project 3 — Fix Broken Workflow finished successfully:
- repaired imported Academy credential references and restored X-Assessment-ID
  headers where required
- corrected MergeOrdersCustomers match field from `customerId` to
  `customer_id`
- recreated the missing `AggregateOrders` step using Aggregate → All Item Data
  (Into a Single List), output field `enriched_orders`
- restored the original SendToOrdersQueue expression:
  `{{ $('AggregateOrders').item.json.enriched_orders }}`
- final validator returned `status: success`,
  `enrichment_verified: true`, and `orders_queued: 10`
- full workflow then ran green end-to-end

Important process correction: when a course debugging exercise appears to
require unexplained advanced syntax, first test whether the intended fix is a
simpler structural repair supported by the error message and the course level.
The two-hour `.all().map(...)` detour was unnecessary; recreating the missing
Aggregate node was the clean course-level repair.

### N8N103 Section 3 — Workflow Organization & Best Practices

Completed quickly; the multiple-choice checks were mostly obvious from prior
work. The durable practices should be applied inside future builds rather than
studied as a separate block:

- Clarity — intent should be visible.
- Modularity — split only when reuse, complexity, or execution behavior earns it.
- Readability — meaningful names and clean visual flow.
- Maintainability — centralize repeated logic and document why decisions exist.
- Scalability — avoid monoliths and uncontrolled item accumulation as load grows.
- Production readiness — publish deliberately, inspect executions, plan failure,
  monitoring, disable, and recovery paths.

For serious builds, use a brief architecture checkpoint across those five
dimensions. Do not create sub-workflows prematurely.

### N8N103 Section 4 — Final Exam

Completed all 20 questions and reached the course-complete screen.

Notable reinforced concepts:
- RAG for grounded retrieval across many documents
- human review for borderline AI decisions
- standard AI node vs agent-with-tools distinction
- deterministic rules should stay deterministic
- automatic runs ignore pinned data
- Error Triggers fire on automatic/production failures, not manual runs
- Router + Worker for a single entry point with separated execution logic
- folders express primary organization; tags support cross-cutting discovery
- saved is not published
- unpublish to stop automatic executions while preserving logic/configuration

## Exact stopping point

- N8N103 is fully complete.
- N8N102 is fully complete.
- Rivertown Lead Intake v1 remains unchanged and unpublished after successful
  live verification.
- No new portfolio-case workflow change was made during the N8N103 course work.
- This closeout is being written directly to GitHub so the local Windows clone
  will need a fast-forward pull before local repo work continues.

## Exact next step

Begin the Master Calendar's Week 6 Microsoft-access work. Track completion, not
the calendar's assumed day/date.

1. Review the free Power Apps Developer Plan, Power Platform trial rules, and
   Copilot Studio trial limitations.
2. Inventory tenant, identity, admin, license, connector, and data-residency
   dependencies.
3. Attempt a separate development/trial environment using a work or school
   account. Do **not** use the university production tenant for experiments and
   do not add real data.
4. Create `microsoft-environment-decision.md` documenting:
   - environment obtained
   - blocked features
   - trial/cancellation/expiry dates
   - fallback architecture
5. If access is blocked, document the blocker instead of buying enterprise
   capacity impulsively. Test free routes first.

## Open items

- n8n Cloud trial showed 3 days remaining at the end of the 2026-09-19 session.
  Decide self-host vs paid before expiry; do not make an annual commitment just
  to finish the curriculum.
- Claude Code install remains pending and should be woven into real API/data/test
  work rather than studied as a separate subject.
- Rivertown Lead Intake v1 remains unpublished after successful live verification.
- Rotate the Rivertown Header Auth secret before any real client/production use.
- Microsoft access may be constrained by the university tenant; test free
  individual/developer routes before paying anything.

## Process rules reinforced this session

- State purpose and expected result before instructions.
- Teach in pieces alongside the clicking.
- For known/recombined tools, use case-study mode: requirement → Josh proposes
  the build/diagnosis → confirm or correct.
- During debugging, teach the diagnostic path before the fix:
  failing node → exact error → input → trace earlier data/configuration → rerun.
- Treat "this solution seems beyond what the course taught" as a diagnostic
  signal that the approach may be overengineered.
- In interactive study/quiz practice, do not place a KEY MESSAGE before Josh
  answers; it can give away the answer.
- Define unfamiliar shorthand/jargon immediately. Example: upstream = closer to
  the trigger; downstream = later in the workflow.
- Documentation should explain why, assumptions, constraints, and change context,
  not merely repeat obvious node settings.
- Architecture checkpoint for serious builds: clear, modular only when earned,
  readable, maintainable, scalable, and production-ready.

## Source hierarchy

1. `CURRENT_STATE.md` for where to resume
2. 12-week Master Calendar and tracker for decided sequencing
3. Relevant course/project instructions for exact build requirements
4. `n8n-patterns.md` for known gotchas and course defects
5. `cases/rivertown-lead-intake/` when portfolio-case context is needed
6. Current and earlier `weekN-log.md` files for history

## End-of-session note

This closeout was written directly to GitHub. Before continuing in Claude,
**Sync the GitHub project source**, then have Claude read `CURRENT_STATE.md`
first. Before any local repo work, fast-forward the Windows clone with
`git pull --ff-only`.
