# CURRENT_STATE

Project: AI Skills Intensive — 12 Week
Last updated: 2026-09-16

## Current objective
Lead Intake v1 for Rivertown Professional Services is built and working end
to end with pinned data. Next is live testing: reset the table, configure the
webhook path and auth, publish, and run all ten test cases through Postman
against the Production URL.

## Current build
Workflow: `Rivertown - Lead Intake v1` (n8n Cloud, unpublished)
Data table: `rivertown leads seed` (14 columns)

```
Webhook (POST)
  └─ NormalizeLead                     trim, lowercase email, add received_at
       └─ ValidateRequiredFields       external_id + email present?
            ├─ false → RespondFail     400, nothing stored
            └─ true  → CheckLeadExists Get by external_id, Always Output Data ON
                         └─ IsNewLead  id is empty? (Number operator)
                              ├─ true  → RestoreLeadData
                              │            └─ RouteByEngagementType (Switch)
                              │                 ├─ 0/1/2 → InsertRoutedLead
                              │                 └─ Fallback → InsertForReview
                              │                        → RespondSuccess (200)
                              └─ false → IncrementDuplicateCount
                                           → RespondDuplicate (200)
```

Every path terminates in a response. Nothing is silently dropped.

N8N102 is COMPLETE — Section 2 quiz, full course final, certificate earned.

## Exact stopping point
Workflow built, all four paths tested with pinned data, nodes renamed to a
consistent PascalCase verb-first convention. Case study folder committed and
pushed to `cases/rivertown-lead-intake/` (commit 36b352f).

Table currently holds the 10 seed rows plus test output — Dana's
`duplicate_count` is at 3, Gwen `FORM-10259` was inserted as an extra row.

## Exact next step
1. Reset the table: clear all rows, re-import
   `cases/rivertown-lead-intake/rivertown_leads_seed.csv`
2. Change the webhook Path from the generated GUID to `rivertown/lead-intake`
3. Add Header Auth to the webhook
4. Publish the workflow
5. Run all ten cases from `cases/rivertown-lead-intake/test-cases.md` through
   Postman against the Production URL. Record status code, response body, and
   resulting table state for each.
6. Fill in the Postman column of the results table; commit
7. Unpublish
8. Export the workflow JSON to `cases/rivertown-lead-intake/lead-intake-v1.json`;
   commit

Then N8N103 (In Practice: AI, Testing and Best Practices).

## Open items
- `duplicate_count` seed values: rows 1-3 are deliberately null to exercise
  the `|| 0` fallback; rows 4-10 are 0
- The n8n Data Table cannot be renamed — it is called `rivertown leads seed`
  because n8n took the name from the CSV at import. Cosmetic only; nodes
  reference it by ID.
- Data Table reports 15 columns; expected count is worth verifying in case
  something stray was created at import
- Do NOT commit an n8n table export as the seed CSV — an export is live state
  including test rows. The seed file is the fixed reset baseline.
- n8n Cloud trial status: check remaining days, decide self-host vs paid
- Claude Code install still pending — matters from ~Week 4

## Working rules for AI assistants
- Explain WHY with a concrete everyday example before or alongside steps.
- State the purpose and expected result BEFORE the instruction — what he's
  about to do, what he should see happen, and why it matters.
- Give one step at a time by default. Group only routine steps with no
  decision points between them.
- Deliver teaching in pieces alongside the clicking, not stacked up in front
  of it. A page of reading before any doing is the failure mode.
- Teach genuinely new tools hands-on in n8n, not as text explanation.
- For portfolio work that recombines known tools, use case-study mode: state
  the requirement, ask what Josh would build, then confirm or correct.
- End each concept with a one-line KEY MESSAGE in bold.
- Always supply pin data JSON with any test instruction — don't make him
  switch between documents.
- Match instructions exactly to on-screen labels as Josh reports them.
- After 2-3 reasoned attempts at an unclear issue, verify instead of guessing.
- Flag contradictions in course materials.
- Josh pushes back when something doesn't track and he is often right —
  take his description at face value.

## Source hierarchy
1. `CURRENT_STATE.md` for where to resume
2. `cases/rivertown-lead-intake/` for the active portfolio build
3. Relevant hands-on exercise for exact build instructions
4. Relevant course reading for concepts
5. 12-week Master Calendar for strategy and sequencing
6. Current and earlier `weekN-log.md` for history
7. External documentation only when verification is needed

## Repository convention
Root-level files stay as they are: `README.md`, `weekN-log.md`,
`CURRENT_STATE.md`, `AI_HANDOFF_PROTOCOL.md`, `SESSION_LOG_TEMPLATE.md`,
workflow JSON exports.

Portfolio case studies live in `cases/<case-name>/` — added 2026-09-16. This
is not a reorganization; the master calendar's Week 1 repo structure already
specifies a `/cases` directory.

## End-of-session requirement
1. Update `CURRENT_STATE.md`
2. Update the current `weekN-log.md`
3. Save/export relevant workflow or evidence files
4. `git status` / `git add .` / `git commit -m "..."` / `git push`
5. Sync the GitHub source in the Claude Project
