# Rivertown Professional Services — Lead Intake v1

A webhook-driven lead intake, deduplication, and routing workflow built in
n8n. Portfolio case study; synthetic data only.

STATUS: built and live-tested against the published Production URL with Header Auth.
All ten Postman cases passed; the workflow was unpublished again after verification.

---

## The problem

Rivertown Professional Services is a 30-person B2B consulting and training
firm running on Microsoft 365. Leads arrive through a form on their website.
Today a person reads each submission, copies it by hand into a spreadsheet,
and forwards it to whichever consultant seems right.

The consequences, as described by the firm:

- Requests are **delayed** — nothing moves until someone checks
- Requests are **duplicated** — resubmissions become second entries
- There is **no turnaround metric** — nobody can say how long intake takes
- There is **no record of routing rationale** — a consultant cannot find out
  why a lead came to them

## What was built

```
Webhook (POST)
  └─ NormalizeLead                          trim, lowercase email, add received_at
       └─ ValidateRequiredFields            external_id + email present?
            ├─ false → RespondFail          400, nothing stored
            └─ true  → CheckLeadExists      Get row by external_id
                         └─ IsNewLead       did anything come back?
                              ├─ true  → RestoreLeadData
                              │            └─ RouteByEngagementType
                              │                 ├─ Training/Consulting/Speaking
                              │                 │    → InsertRoutedLead
                              │                 └─ Fallback → InsertForReview
                              │                        → RespondSuccess (200)
                              └─ false → IncrementDuplicateCount
                                           → RespondDuplicate (200)
```

Every path terminates in a response. No submission is silently dropped.

## Data contract

| Field | Type | Required | Source |
|---|---|---|---|
| `external_id` | string | yes | form tool |
| `email` | string | yes | prospect |
| `first_name` | string | no | prospect |
| `last_name` | string | no | prospect |
| `company` | string | no | prospect |
| `phone` | string | no | prospect |
| `engagement_type` | enum | no | prospect (dropdown) |
| `company_size` | enum | no | prospect (dropdown) |
| `message` | text | no | prospect |
| `submitted_at` | datetime | yes | form tool |
| `received_at` | datetime | — | workflow |
| `status` | enum | — | workflow |
| `routed_to` | enum | — | workflow |
| `duplicate_count` | number | — | workflow |

`engagement_type` is a fixed dropdown (Training / Consulting / Speaking /
Other) so routing can be deterministic — no model required.

`status` vocabulary: `new`, `incomplete`, `contacted`, `closed`. **The
workflow only ever writes `new`.** Everything past that is a human updating
the record. Automation that sets `qualified` is making judgments it has no
business making.

## What this proves

- Webhook intake with an explicit request contract
- Data normalization before validation
- Deduplication on a natural key, with a documented rationale for why that
  key and not email
- Deterministic routing with a fallback that catches unanticipated values
- Persistent state with both insert and conditional update operations
- A response with a correct status code on every path
- Deliberate handling of failure paths, not just the happy path

## What this does not claim

See `limitations.md`. In short: synthetic data, currently unpublished after
live verification, Header Auth configured, no alerting, form intake only.

## Files

| File | Contents |
|---|---|
| `lead-intake-v1.json` | Workflow export |
| `rivertown_leads_seed.csv` | 10-row seed data for the Data Table |
| `test-cases.md` | Pin-data test set and results |
| `decisions.md` | Every design choice with reasoning |
| `limitations.md` | What it does not do, and why |
| `runbook.md` | Operation, disable path, failure modes |

## Still to write

- As-is and to-be process maps
- Measurable baseline (current turnaround, duplicate rate) — requires real
  observation, not assumption
- Architecture diagram
- Operating cost assumptions
