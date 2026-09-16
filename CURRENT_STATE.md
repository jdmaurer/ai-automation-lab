# CURRENT_STATE

Project: AI Skills Intensive — 12 Week
Last updated: 2026-09-16

## Current objective
Lead Intake v1 for Rivertown Professional Services is built, secured, and
live-tested end to end. All ten Postman cases passed against the published
Production URL using Header Auth. The workflow was unpublished after
verification and the tested workflow JSON was exported to the case folder.

Current task is session close: update the project log and next-session baton,
commit and push the remaining documentation, then move to N8N103.

## Current build
Workflow: `Rivertown - Lead Intake v1` (n8n Cloud, unpublished)
Webhook: POST `/webhook/rivertown/lead-intake`, Header Auth configured
Data table: `rivertown leads seed` (14 imported columns + n8n-generated `id`)

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
Live verification completed 2026-09-16.

- Reset the Data Table to the fixed 10-row seed baseline before testing.
- Changed the webhook path to `rivertown/lead-intake`.
- Added a dedicated Header Auth credential rather than reusing the Academy key.
- Published temporarily and ran all ten cases A-J through Postman against the
  Production URL. All ten passed.
- Updated `cases/rivertown-lead-intake/test-cases.md` with live results
  (commit `a99f288`).
- Unpublished the workflow after verification.
- Exported the tested workflow to
  `cases/rivertown-lead-intake/lead-intake-v1.json`, checked the export for the
  credential secret, and committed it (commit `aa2f695`).
- Updated case README, limitations, and decision log, including D12 for the
  stable path + dedicated Header Auth decision (commit `b389e6d`).

The live-test Data Table now contains 18 rows. Dana `FORM-10231` has
`duplicate_count = 1`; cases B-G and I-J added eight rows; case H was rejected
and stored nothing. The fixed seed CSV remains the reset baseline.

The workflow remains unpublished. The Header Auth credential remains stored in
n8n; its secret is not in the repository.

## Exact next step
1. Update the current `weekN-log.md` with today's live verification and commits.
2. Update `NEXT_SESSION_START.md` so the next session begins with N8N103 rather
   than repeating Rivertown live testing.
3. Run `git status` and verify only the intended session-close files changed.
4. Commit the session-close documentation and push `main`.
5. Sync the GitHub source used by the project.
6. Begin N8N103 (In Practice: AI, Testing and Best Practices).

Do not reset the live-test-mutated Data Table unless another test run needs the
10-row baseline; the canonical seed CSV is already preserved in the repo.

## Open items
- `duplicate_count` seed values: rows 1-3 are deliberately null to exercise
  the `|| 0` fallback; rows 4-10 are 0.
- The n8n Data Table cannot be renamed — it is called `rivertown leads seed`
  because n8n took the name from the CSV at import. Cosmetic only; nodes
  reference it by ID.
- The Data Table shows 15 columns because n8n adds its own generated `id` to
  the 14 imported columns; this is expected, not a stray column.
- Do NOT commit an n8n table export as the seed CSV — an export is live state
  including test rows. The seed file is the fixed reset baseline.
- The current Header Auth secret was used during this chat-based test session.
  Rotate it before any real client or production use.
- n8n Cloud trial status: check remaining days, decide self-host vs paid.
- Claude Code install still pending — matters from ~Week 4.

## Working rules for AI assistants
- Explain WHY with a concrete everyday example before or alongside steps.
- State the purpose and expected result BEFORE the instruction — what he's
  about to do, what he should see happen, and why it matters.
- Give one instruction at a time by default. Group routine fields/actions that
  are on the same screen and have no decision point between them, then use one
  screenshot checkpoint before save/send.
- For PowerShell, give one command per copy block. Use `git --no-pager` when
  showing diffs so the terminal does not get stuck in the pager.
- Deliver teaching in pieces alongside the clicking, not stacked up in front
  of it. A page of reading before any doing is the failure mode.
- Teach genuinely new tools hands-on in n8n, not as text explanation.
- For portfolio work that recombines known tools, use case-study mode: state
  the requirement, ask what Josh would build, then confirm or correct.
- End each concept with a one-line KEY MESSAGE in bold.
- Supply pin data JSON when the current test instruction actually uses n8n
  pinned data. Do not include pin-data JSON for Postman-only tests.
- Match instructions exactly to on-screen labels as Josh reports them.
- After 2-3 reasoned attempts at an unclear issue, verify instead of guessing.
- Flag contradictions in course materials.
- Josh pushes back when something doesn't track and he is often right — take
  his description and screenshots at face value.

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
4. `git status` / stage intended files / commit / `git push`
5. Sync the GitHub source in the project
