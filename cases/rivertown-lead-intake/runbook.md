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
