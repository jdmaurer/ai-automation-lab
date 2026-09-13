# CURRENT_STATE

Project: AI Skills Intensive — 12 Week
Last updated: 2026-09-13

## Current objective
N8N102 Section 2 (Order Webhook Processor) is fully complete and
tested. Before taking the Section 2 quiz: live hands-on demo of the
quiz topics that only got covered as text last session (cURL import,
Response Format options, node-level vs workflow-level error handling).
After the quiz: pivot to Lead Intake v1 for Rivertown Professional
Services.

## Current build
Both workflows complete, tested, and documented:
- `Section 2 - Order Webhook Processor` (main) — webhook, validation,
  calls sub-workflow, responds. Unpublished after testing.
- `Section 2 - Process Order (Sub-workflow)` — duplicate check, insert,
  processing API call, status update, converged result.

All Step 1/2/3 graded tests passed on first real run. Confirmation
code: N8N-FOUNDATIONS-N8N102-S2-3-2026-AIY169UH.

## Exact stopping point
Section 2 exercise fully done (build, tests, docs, cleanup). Section 2
quiz not yet taken — scheduled for today, 9/13.

## Exact next step
Add a scratch (disconnected) HTTP Request node. Use its Import cURL
button with a sample cURL block and observe the auto-filled
Method/URL/Headers/Body live in n8n. Then same live, hands-on treatment
for Response Format options and node-level vs workflow-level error
handling. Then take the Section 2 quiz. Then start Lead Intake v1.

## Working rules for AI assistants
- Explain WHY with a concrete everyday example before or alongside steps.
- Always spell out exact names, values, expressions, settings, and commands.
- Teach genuinely new tools directly, hands-on in n8n — not as text
  explanation, even for "just worth knowing for the quiz" asides.
- For portfolio work that recombines known tools, switch to case-study
  mode: state the requirement, ask what Josh would build first, then
  confirm/correct.
- After 2–3 reasoned attempts at an unclear or undocumented issue,
  verify instead of continuing to guess.
- Flag contradictions in course materials.
- Give one instruction at a time by default; expand to a few grouped
  steps only when they're one continuous task with no decision points
  in between.
- Match instructions exactly to what's on screen — use the same labels
  Josh reports seeing, not the exercise doc's wording, if they differ.
- Treat portfolio skill-building as more important than merely
  finishing certificates.

## Source hierarchy
1. `CURRENT_STATE.md` for where to resume
2. Relevant hands-on exercise for exact build instructions
3. Relevant course reading for concepts
4. 12-week Master Calendar for strategy and sequencing
5. Current `weekN-log.md` and earlier week logs for history
6. External documentation/web research only when verification is needed

## Repository convention
Keep the existing repository structure simple. Do not reorganize old files just for the handoff system.
Existing weekly logs such as `week1-log.md` and `week2-log.md` remain at repository root.
Continue using the current week's `weekN-log.md` for the running learning/build log.

## End-of-session requirement
Before ending a substantial session:
1. Update `CURRENT_STATE.md`.
2. Help write/update the current `weekN-log.md`.
3. Save/export relevant workflow or evidence files using the repository's existing structure.
4. Run:
   - `git status`
   - `git add .`
   - `git commit -m "..."`
   - `git push`

The assistant should help draft the log entry and walk through the Git commands when needed.
