# CURRENT_STATE

Project: AI Skills Intensive — 12 Week
Last updated: 2026-09-11

## Current objective
Complete n8n Academy N8N102 Section 2 hands-on work, then pivot to Lead Intake v1 for Rivertown Professional Services.

## Current build
Workflow: `Section 2 - Order Webhook Processor`
Current node: `WebhookNewOrder`

## Exact stopping point
Step 1.2 — configure `WebhookNewOrder`.

Required values:
- HTTP Method: `POST`
- Path: `course/n8n102/new-order`
- Authentication: `Header Auth`
- Credential: `n8n Academy API Key`
- Respond: `Using 'Respond to Webhook' Node`

## Exact next step
Open `WebhookNewOrder`, verify/configure the five values above, then continue to Step 1.3 and create `ValidateRequiredFields`.

## Remaining Section 2 sequence
- Finish secure webhook, validation, response nodes, publish, and tester
- Create `n8n102_course_orders` Data Table
- Build `Section 2 - Process Order (Sub-workflow)`
- Add duplicate checking/idempotency
- Refactor the main workflow to call the sub-workflow
- Test the full pipeline
- Add documentation
- Unpublish the webhook when finished
- Pivot to Lead Intake v1

## Working rules for AI assistants
- Explain WHY with a concrete everyday example before or alongside steps.
- Always spell out exact names, values, expressions, settings, and commands.
- Teach genuinely new tools directly.
- For portfolio work that recombines known tools, switch to case-study mode: state the requirement, ask what Josh would build first, then confirm/correct.
- After 2–3 reasoned attempts at an unclear or undocumented issue, verify instead of continuing to guess.
- Flag contradictions in course materials.
- Treat portfolio skill-building as more important than merely finishing certificates.

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
