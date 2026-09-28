# Runbook — Rivertown Lead Intake v1

STATUS: DRAFT. Ownership and support terms are placeholders pending a real
engagement.

## What this does
Receives lead submissions from Rivertown's website form, normalizes and
validates them, detects resubmissions, routes by engagement type, and writes
every lead to a single reviewable table.

## Components
| Component | Where |
|---|---|
| Workflow | n8n Cloud — `Rivertown - Lead Intake v1` |
| Data store | n8n Data Table — `rivertown leads seed` |
| Trigger | Webhook, POST |

Note: the Data Table is named `rivertown leads seed` because n8n took the
name from the CSV filename at import and provides no rename. The name is
cosmetic; nodes reference the table by ID.

## Normal operation
A form submission POSTs to the webhook. The caller receives one of:

| Response | Code | Meaning |
|---|---|---|
| `status: received` | 200 | New lead stored and routed |
| `status: duplicate` | 200 | Already on file; counter incremented, no new row |
| `status: rejected` | 400 | Missing `external_id` or `email`; nothing stored |

## Daily check
Filter `rivertown leads seed` on `routed_to = "review"`. These are leads no rule
could categorize and require a human decision.

## Disable
Unpublish the workflow in n8n. The webhook stops accepting requests
immediately. Form submissions will fail at the form tool's end — check
whether that is visible to the person submitting.

## Kill switch — v2.6 (self-hosted)

Use when v2.6 is misbehaving: wrong routing, a flood of fake leads, a suspected leaked API key, or anything you can't explain yet.

### Stop it

1. Open the n8n editor at http://localhost:5678.
2. Open **Lead Intake v2.6** and **unpublish** it.
3. Confirm it stopped. In PowerShell:

   ```
   Invoke-WebRequest -Method POST -Uri "http://localhost:5678/webhook/rivertown/lead-intake-v2" -ContentType "application/json" -Body '{"external_id": "FORM-90002", "message": "kill switch test"}'
   ```

   Expected: a 404 error saying the webhook is not registered.

**If the editor won't open:** press Ctrl+C in the PowerShell window running n8n. This stops ALL workflows, not just v2.6.

**If the API key may be leaked:** also replace the key in the webhook's Header Auth credential and give the new key to the form tool. Unpublishing alone doesn't protect you once it's back on.

### While it's off

- The form tool gets a 404 for every submission. n8n stores nothing.
- Leads wait in the form tool's own submission history. Confirm the client's form tool keeps submissions before relying on this.
- Nothing already in the table is changed or lost.

### Turn it back on and catch up

1. Fix the problem and republish v2.6.
2. Re-send every submission the form tool received while it was off.
3. This is safe to do in bulk: CheckLeadExists matches on `external_id`, so any lead that was already stored gets its duplicate count bumped instead of a second row.

### Roll back to the previous version

Unpublish **Rivertown - Lead Intake v2.6**, then publish **Rivertown - Lead Intake v2.5 (evidence copy)**. Only one can be published at a time because they share the same webhook address.

### Verified

2026-09-27: unpublished-state test returned 404 (FORM-90002). No row created.

### Known issue

The 404 response includes a stack trace with local file paths (username and n8n install location). This is an n8n default. Recommended before any real client use: turn off detailed error responses for production.

## Failure modes
| Symptom | Likely cause | Action |
|---|---|---|
| Callers receive 400s in volume | Form tool stopped sending `external_id` | Check the form tool's payload; this is an upstream defect |
| No rows appearing | Workflow unpublished, or form pointing at the wrong URL | Check published state and the form's configured endpoint |
| Duplicate rows for the same lead | Submission arrived without `external_id` | Expected; see limitations.md |
| Caller times out | Respond mode not set to "Using Respond to Webhook Node" | Check the Webhook node's Respond setting |

## Owner
TBD.

## Support term
TBD.

## Escalation
TBD.

## Self-hosted operation (from 2026-09-21)

- Host: http://localhost:5678. Start with n8n.cmd in a normal PowerShell window. n8n runs only while that window stays open; closing it or laptop sleep stops it.
- Patch: npm.cmd update -g n8n
- Encryption key: C:\Users\joshu\.n8n\config. Backed up outside the repo. If lost, every saved credential becomes unreadable.
- Never allow Node.js through Windows Firewall for local n8n. Local traffic doesn't need it; allowing it exposes n8n to the network.
- Community license activated (debug in editor, execution search, folders, workflow history). License changes require an n8n restart.
- Groq key "n8n-local-rivertown" has an expiry date. If the AI step starts failing, check the key first.
- Credentials are kept in a password-protected file outside the repo.
- Testing: use the Postman desktop app (not browser), body raw -> JSON. Collections: "Rivertown Lead Intake v1" and "Rivertown Lead Intake v2".
- v1 production URL: http://localhost:5678/webhook/rivertown/lead-intake
- v2 production URL: http://localhost:5678/webhook/rivertown/lead-intake-v2
- Publish only for testing; unpublish when done.
- Reset v2 test data: delete the added rows so the table returns to the 10 seed rows, or re-import rivertown_leads_seed.csv. Same table either way; no nodes need repointing.

## Added 2026-09-22 (late session)

- Forcing an AI failure: switch Groq Chat Model's credential to "Groq - BROKEN (test only)" (fake key, kept for reruns of test K). Publish, send K, then switch back to "Groq account".
- After switching the credential back, RE-SELECT openai/gpt-oss-20b and confirm temperature 0. n8n resets the model on a credential swap.
- All v2 Postman requests now point at http://localhost:5678/webhook/rivertown/lead-intake-v2. New v2 requests: K (Error path) and E2 (low-confidence regression).
- To rerun a test whose row is evidence from an earlier session, do not delete the row. Duplicate the request and give it a new external_id.
- routed_by values in v2: ai, rules, ai_failure, or blank (rules path).
- Evaluation set: cases/rivertown-lead-intake/eval-set-v1.csv. Frozen. Never edit labels to improve a score; create a new version file instead.
- Data Table CSV exports shift timestamps by +5h. Never copy a timestamp from an export into a test body.

## Added 2026-09-28 (v2.6)

- n8n workflow names: **Rivertown - Lead Intake v2.6** (current) and **Rivertown - Lead Intake v2.5 (evidence copy)** (rollback). Only one may be published at a time.
- routed_by values in v2.6: ai, rules, ai_failure, blank_message, or blank (rules path).
- After publishing, confirm the address is live before a full Newman run: `newman.cmd run "Rivertown Abuse.postman_collection.json" --folder "A3 wrong API key" --env-var run_id=SMOKE` should return 403. A 404 means the workflow is not live.
- Security tests use IDs FORM-900xx (manual) and FORM-910NN-<run_id> (abuse runs). See threat-model.md.
