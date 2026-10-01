# Rivertown Professional Services — Lead Intake

A lead intake, deduplication, and routing workflow built in n8n. Straightforward leads are routed by rule; unclear ones are read by an AI that can only suggest a team, and anything uncertain goes to a person.

*Portfolio case study by Josh Maurer. Rivertown Professional Services is a fictional firm created for this case; all data is synthetic.*

| | |
|---|---|
| **Current version** | v2.7 (2026-09-28) |
| **Stack** | n8n (self-hosted), n8n Data Table, Groq `openai/gpt-oss-120b` (classifier) and `qwen/qwen3.8-27b` (second opinion), both at temperature 0, Postman and Newman for testing |
| **Deployment** | Runs on a local development machine; not deployed as a live service |
| **Operating it** | [runbook.md](runbook.md): normal operation, kill switch, rollback |

## Results at a glance

| | |
|---|---|
| **Safety** | 0 wrong routes in 37 test messages, including 10 held back until the final test (v2.7, runs R9 and H2; [test-cases.md](test-cases.md)). The earlier single-model design sent one ambiguous message to the wrong team in 2 of 3 runs; v2.7's second opinion was added to catch exactly that |
| **Usefulness** | 18 of 23 straightforward requests routed without a person (78%), against an 80% target: 14 of 17 on the main set, 4 of 6 on the held-back set. The rest went to review by design |
| **Prompt injection** | Every injection test case resisted, in every evaluation run and in a live attack test |
| **Security** | Threat model with live abuse tests: 17 of 19 checks passed; both failures were predicted gaps, documented with fixes ([threat-model.md](threat-model.md)) |
| **Client summary** | Pilot-readiness summary written for the owner for v2.5 ([eval-summary-v2.5.md](eval-summary-v2.5.md)). **Outdated:** it describes the single-model design, which later slipped in runs R7 and R8. A v2.7 summary is planned |

Safety and usefulness figures come from evaluating v2.7 (runs R9 and H2). v2.5 scored the same on its first runs (R6 and H1), but reruns on 2026-09-28 (R7, R8) showed that design could let one ambiguous message through, which led to v2.7.

---

## The problem

Rivertown Professional Services is a 30-person B2B consulting and training
firm running on Microsoft 365. Leads arrive through a form on their website.
Today a person reads each submission, copies it by hand into a spreadsheet,
and forwards it to whichever consultant seems right.

The consequences, as set out in the case brief:

- Requests are **delayed** — nothing moves until someone checks
- Requests are **duplicated** — resubmissions become second entries
- There is **no turnaround metric** — nobody can say how long intake takes
- There is **no record of routing rationale** — a consultant cannot find out
  why a lead came to them

## What was built

```
Webhook (POST, API key required)
  └─ NormalizeLead                          trim, lowercase email, add received_at
       └─ ValidateRequiredFields            external_id + email present?
            ├─ false → RespondFail          400, nothing stored
            └─ true  → CheckLeadExists      Get row by external_id
                         └─ IsNewLead
                              ├─ true  → RestoreLeadData
                              │            └─ RouteByEngagementType
                              │                 ├─ Training/Consulting/Speaking
                              │                 │    → InsertRoutedLead            (rules)
                              │                 └─ Fallback → HasLeadMessage
                              │                      ├─ blank → InsertBlankForReview
                              │                      └─ has text → ClassifyMessage (AI, 3 tries)
                              │                           ├─ error → InsertForReview
                              │                           └─ answer → ConfidenceGate
                              │                                ├─ sure → SecondOpinion (second model)
                              │                                │           → MergeSecondOpinion → SecondOpinionGate
                              │                                │                ├─ agrees and sure → InsertAIRoutedLead
                              │                                │                └─ otherwise → InsertForReview
                              │                                └─ unsure → InsertForReview
                              │                 every insert → RespondSuccess (200)
                              └─ false → IncrementDuplicateCount
                                           → RespondDuplicate (200)
```

Every path ends in a response, and no submission is silently dropped.

**Where the AI fits.** The AI only reads leads the dropdown can't route: engagement type "Other," or any value the rules don't recognize. It returns a suggested category, a confidence, other possible categories, and a rationale. It cannot send, delete, or change anything. The workflow auto-routes only when confidence is high, the category is not Unclear, and no other categories are listed. Everything else goes to a person. Before any automatic route, a second model from a different company answers the same question; the lead is routed only if it agrees, is sure, and lists no alternatives.

**How it was evaluated.** A frozen set of 27 labeled test messages, plus 10 held back until the final run. Messages included straightforward requests, vague ones, empty ones, two-service requests, and prompt-injection attempts. Runs R1–R6 tuned the design; the holdout run checked it on messages it had never seen. Regression runs R7 and R8 caught the single-model design failing; R9 and H2 tested the fix. Release thresholds were written before each run.

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
| `routed_by` | enum | — | workflow (who decided the destination; see below) |
| `ai_category`, `ai_confidence`, `ai_rationale`, `ai_other_categories` | text | — | AI answer, stored for audit |

`engagement_type` is a fixed dropdown (Training / Consulting / Speaking / Other), so most leads are routed by rule with no model involved. The AI is used only for "Other" or any value the rules don't recognize.

`routed_by` records who decided where a lead went:

| Value | Meaning |
|---|---|
| *(empty)* | The dropdown rule routed it; the AI was not involved |
| `ai` | The AI's answer set the destination |
| `rules` | The AI answered, but the confidence gate (a rule) sent it to review |
| `ai_failure` | The AI call failed; the lead was kept and sent to review |
| `blank_message` | The message was empty; the AI was skipped and the lead sent to review |
| `second_opinion` | The second model did not confirm the route (it disagreed, was unsure, or failed); the lead went to review |

The `status` field uses four values: `new`, `incomplete`, `contacted`, `closed`. **The workflow only ever writes `new`.** Everything past that is a person updating the record. Deciding whether a lead is qualified is a business judgment, so the workflow does not make it.

## What this demonstrates

- Webhook intake with an explicit request contract and API-key authentication
- Deduplication on a natural key, with a documented rationale, safe to re-send after an outage
- Rules first, AI only where rules can't decide, and a person wherever the AI is unsure
- AI output constrained to allowed values and stored separately for audit
- Evaluation against a frozen test set with a holdout, and explicit safety and usefulness thresholds
- Regression testing that caught a failure with no code change, and an independent second-model check that fixed it
- A threat model tagged to OWASP and NIST, with controls tested by live attacks
- A kill switch, rollback path, and runbook
- Results translated into a plain-language summary for a business owner

## What this does not claim

See [limitations.md](limitations.md) and [threat-model.md](threat-model.md). In short:
- Synthetic data only; the test messages were written and labeled by one person.
- Runs locally; not deployed or load-tested as a live service.
- Usefulness is below the 80% target (78%; 4 of 6 on held-back messages vs 5 of 6).
- Routing is recorded in the table; nothing yet delivers leads to the teams.
- No before-and-after metrics (turnaround time, duplicate rate). Those require a real client's process to measure.
- Not ready for real client leads until three security items are closed (threat-model.md, *Recommendations*).

## Files

| File | Contents |
|---|---|
| `lead-intake-v2.7.json` | Current workflow export (second opinion; evaluated in R9 and H2) |
| `lead-intake-v2.6.json` | Previous version (blank-message check; failed R7 and R8) |
| `lead-intake-v2.5.json` | Version evaluated in runs R6 and H1 |
| `lead-intake-v1.json`, `lead-intake-v2.json`, `lead-intake-v2.4.json` | Earlier versions |
| `eval-set-v1.csv`, `eval-set-holdout-v1.csv` | Frozen evaluation sets (27 and 10 messages) |
| `eval-runs/` | Newman logs for each evaluation and abuse run, plus a table export |
| `test-cases.md` | Test cases and results for every run |
| `eval-summary-v2.5.md` | Pilot-readiness summary for the owner |
| `summary-inputs/` | Inputs used to draft the owner summary |
| `threat-model.md` | Threats, OWASP/NIST tags, controls, abuse-test results, findings |
| `decisions.md` | Every design choice with reasoning |
| `limitations.md` | What it does not do, and why |
| `runbook.md` | Operation, kill switch, rollback, failure modes |
| `rivertown_leads_seed.csv` | Seed data for the v1 Data Table |
| `power-automate/` | Power Automate rebuild (v1): solution export, flow diagram, n8n-to-Power Automate terms, field map |

## Planned next

- Refresh the owner summary for v2.7, and ask the client how two held-back messages (H-04, H-06) should route
- Close the three security items required before real client data: random form IDs, a form note plus a retention limit, and disabled detailed error responses ([threat-model.md](threat-model.md), *Recommendations*)
- As-is and to-be process maps
- Architecture diagram
- Operating cost assumptions
- Delivery of routed leads to each team (email), with the threat model revisited first
