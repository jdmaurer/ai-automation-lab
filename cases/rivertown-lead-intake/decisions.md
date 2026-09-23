# Decision Log — Rivertown Lead Intake

Append-only. Every design choice with its reasoning. Newest at the bottom.

---

## 2026-09-15 — v1 build

### D1. `routed_to` stores a category, not a person
First draft wrote `"Josh"`. Changed to `training` / `consulting` /
`speaking` / `review`.

Staffing changes constantly at a 30-person firm. Storing a person means
editing the workflow on every reassignment, new hire, or leave. Who handles
a category is looked up elsewhere — a second table, or a person filtering
the view.

### D2. Three Switch branches collapsed into one Insert node
The Training, Consulting, and Speaking branches were identical apart from one
value. Replaced three nodes with one, and `routed_to` is derived:
`{{ $json.engagement_type.toLowerCase() }}`.

Building three identical nodes for hypothetical future divergence is
speculative complexity. If Speaking later needs a Slack alert, a node goes
between the Switch and the Insert in about a minute.

The Fallback kept its own Insert because it genuinely differs — it hardcodes
`routed_to: "review"` rather than deriving it. Deriving would store `other`
or `retainer`, and a consultant filtering for `review` would not find them.

### D3. Duplicates tracked with a counter column, not extra rows
`duplicate_count` (number) on the existing row, incremented with
`{{ ($json.duplicate_count || 0) + 1 }}`. The `|| 0` handles nulls, since
n8n Data Tables have no column default.

One row per lead. The main table stays clean. The count answers "how often
does this happen," which is a metric the case says Rivertown lacks.

*Rejected:* a separate duplicates table. A duplicate count has no lifecycle
of its own — it exists only as a property of a lead, which makes it a column.
A second table would mean two writes, two schemas, and a manual join
(n8n Data Tables cannot join).

*Accepted cost:* see limitations.md — a counter loses the detail.

### D4. Validation narrowed from six required fields to two
Initial contract required `external_id`, `email`, `first_name`, `last_name`,
`company`, `engagement_type`. Narrowed to `external_id` + `email`.

Frequency analysis: a missing system-generated `external_id` means the form
tool malfunctioned — rare. Missing optional fields is common and normal. The
original design treated the common case as an exception, which is backwards.

Only two fields carry hard requirements. No `external_id` means no duplicate
check is possible. No email means no follow-up is possible. Everything else
is convenience — Rivertown can work a lead without a last name.

Blank `engagement_type` is already handled correctly by the Switch fallback,
which routes it to review. A lead who did not say what they want needs a
human, which is exactly what the fallback provides.

This removed an entire branch (an IF, an Insert, and a Stop and Error) that
had been built to handle the normal case as an exception.

### D5. Normalization moved ahead of validation
Originally ran on the validation-true branch. Moved to sit directly after the
Webhook so one node serves every path.

Also fixes a real defect: `"   "` (three spaces) passed `is not empty` before
the move, and correctly fails after it. Trimming before testing for emptiness
is the correct order.

### D6. `RestoreLeadData` is required, not redundant
`CheckLeadExists` replaces the item with whatever it found — `{ }` on a miss.
Without restoration, everything downstream on the new-lead path works with an
empty object: the Switch finds no `engagement_type` and routes to Fallback,
and the Insert writes nulls.

`RestoreLeadData` reaches back to `NormalizeLead` by name and restores the
lead. Generalizable: any lookup node mid-flow destroys the data you had
before it.

This node was deleted once during a restructure on the assumption it was a
redundant copy. It is not. The bug it caused (a Training lead routing to
Fallback with a null row) is the evidence.

### D7. Get row(s) + IF chosen over the `If row exists` operation
`If row exists` is a gate — it passes the item forward and returns no row
data. The duplicate path needs the existing row's `status` (has anyone
already followed up?) and `duplicate_count` (what do I increment?).

The gate would be simpler and give less.

### D8. No alerting in v1
The review queue is pull-based: someone filters `routed_to = "review"`.

Alerting is an external action and out of scope for this phase. It is also
trivial to add later — one node between the Switch and the Insert. Deferred
pending a decision on who owns the queue.

### D9. Submissions with an email but no `external_id` are rejected with 400
Not recovered into the table.

A missing system-generated ID indicates upstream malfunction, not user error.
A recovery branch would quietly absorb a broken integration; a stream of 400s
makes it visible. Revisit if rejection volume becomes non-trivial.

### D10. Email should be enforced as required on Rivertown's form
Some problems are cheaper to solve upstream in the form than downstream in
the automation. A contact form that does not collect a way to make contact
is not doing its job.

The workflow's 400 is a backstop for a bypassed or misconfigured form, not
the primary control. This belongs in the client handoff.

### D11. `IsNewLead` tests `$json.id` for presence, not identity
`id` is the Data Table's own auto-generated row counter — a surrogate key.
The IF is not asking "is this row 11," it is asking "did anything come back
at all." Any field guaranteed on a real row would work.

Safe on migration because `id` never leaves the node. Storing or exporting a
surrogate key is what breaks when rows are renumbered; `external_id` is the
natural key and travels with the lead.

## 2026-09-16 — live verification

### D12. Webhook uses a stable path and dedicated Header Auth
Changed the webhook Path from n8n's generated identifier to
`rivertown/lead-intake` and changed Authentication from None to Header Auth
with a credential dedicated to this workflow.

The readable path makes the endpoint easier to document and configure, but
the path itself is not treated as a secret. Authentication provides the
actual access control.

*Rejected:* reusing the existing n8n Academy API Key credential. Credentials
should be separated by purpose so changing or revoking one integration does
not affect an unrelated one.

The workflow was published temporarily to run all ten Postman cases against
the Production URL, then unpublished after verification. This was live
integration testing, not a production deployment claim.

The credential secret is not documented or committed to the repository. The
exported workflow JSON was checked for the secret before it was staged.

## 2026-09-21 - Self-hosted migration

- Moved v1 from n8n Cloud to self-hosted n8n (npm, v2.39.10) on Windows. Docker migration expected later: n8n now flags non-container installs as deprecated.
- n8n AI Assistant deliberately deferred during verification: nothing that can change the workflow stays in the loop while proving it unchanged.
- Rebuilt the data table from the 10-row seed CSV, not an n8n export (exports carry test history and shift timestamps).
- Fixed the stray "=received_at" field name in NormalizeLead after verification (v1.1). Behavior identical.

## 2026-09-22 - Lead Intake v2: AI triage

- v2 is a separate workflow with its own webhook path (rivertown/lead-intake-v2) and its own table (rivertown leads v2), so v1's verified evidence is never touched.
- The model sees ONLY leads the rules cannot route (the Fallback path). Rules are already correct for Training/Consulting/Speaking.
- Auto-route only when confidence is high AND category is not Unclear. Everything else goes to human review.
- Confidence is a label (high/medium/low) defined by observable reader agreement, not a model-invented number.
- Four audit columns: routed_by, ai_category, ai_confidence, ai_rationale. ai_category is stored verbatim and separately from routed_to so the AI can be graded later.
- routed_by records who decided: "ai" when the AI's answer set the destination, "rules" when the gate did. Rules-path rows leave it blank to keep the verified InsertRoutedLead unchanged.
- needs_human_review is computed by the workflow, not asked of the model.
- Model: Groq openai/gpt-oss-20b at temperature 0. Smaller model suffices for narrow classification; temperature 0 keeps answers repeatable for evaluation.
- Output enforced by a JSON Schema parser (enums, all fields required, no extras). Auto-Fix off: a failed parse goes to human review rather than a second paid model call.
- Retry 3x at 1s for transient failures; on persistent failure the error output routes the lead to review. An AI failure must never lose a lead.
- Separate InsertAIRoutedLead node so the proven rules-path insert stays untouched.
- Category definitions are an ASSUMPTION for this synthetic case; in client work they come from the client and need their confirmation.
- Prompt treats the lead message as untrusted data: fenced in triple quotes with a data-not-instructions rule (prompt-injection defense, OWASP LLM01).
