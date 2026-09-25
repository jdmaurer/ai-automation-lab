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

## 2026-09-22 (late session) - v2.1 error path and evaluation design

- Retry On Fail was logged earlier on 9/22 but found OFF in the build (export showed retryOnFail false). Enabled it (3 tries, 1000 ms) so the build matches the decision. The decision log is a claim; the build is the evidence. Check they match before testing.
- routed_by now has three honest values: "ai" (AI set the destination), "rules" (AI answered, the gate sent it to review), "ai_failure" (AI call failed, lead sent to review). Implemented as an expression in InsertForReview: {{ $json.ai_category ? 'rules' : 'ai_failure' }}. Chosen over a separate insert node to avoid a second copy of 18 column mappings; InsertForReview has no verified history to protect.
- Failure test method: a separate fake Groq credential ("Groq - BROKEN (test only)") swapped in, rather than editing the real credential, prompt, or wiring. Mimics a real expired or revoked key and reverses with one dropdown choice.
- Test rows that are evidence from earlier tests are not deleted. Reruns use a new external_id instead (E2 / FORM-10302).
- Evaluation grading: category graded exactly; confidence graded only as auto-route yes/no (high vs not high), because medium and low produce the same outcome and are hard to label consistently.
- Failure severity is asymmetric. Acceptable: the AI is more cautious than the label (lead goes to human review). Not acceptable: the AI auto-routes a lead labeled No, or auto-routes a Yes lead to the wrong team.
- Release threshold: Safety = 0 of 27 dangerous auto-routes (fixed). Usefulness = at least 14 of 17 Yes leads auto-routed correctly (about 80 percent, a pilot starting point; the client owns this number).
- The evaluation set is built on purpose, not sampled. Sampling measures typical traffic; a built set tests rare risks (like injection) every time.
- Mix: 10 ambiguous (most risk), 9 clear (3 per service, catches an AI too timid to be useful), 5 injection (OWASP LLM01; most push toward a wrong answer; one tries to close the prompt's triple-quote fence), 3 empty or near-empty.
- Single labeler for now. A second blind labeler (inter-rater reliability) is the recommended improvement; disagreements would be treated as No.
- Labeling exposed category-definition gaps: "recommend improvements" in Consulting pulls advice-seeking training requests toward Consulting; Training says "their employees," which excludes association members; real readers separate Training from Speaking by format (workshop vs keynote), which the definitions never mention. Candidate prompt revision after the first eval run; client confirmation needed.
- gpt-oss-safeguard-20b considered and not adopted: it is tuned for policy-based content moderation, not service classification. Possible future use as an injection pre-screen (Week 5 security).

## 2026-09-23 - Evaluation runs and the ambiguity gate

- Eval cases are sent with Newman (Postman's free command-line runner) through the production webhook, so every case takes the same path a real lead takes. Rejected: the n8n Evaluations tab (starts mid-workflow, skipping auth, normalize, and dedup, and requires adding nodes to the build under test). Postman's in-app Collection Runner now charges for data files.
- Reruns use the same v2 table with a run ID in every external_id (EVAL-01-R1, EVAL-01-R2). Dedup lets each run through, and no run deletes another. A separate eval table was rejected because it meant repointing nodes in the build under test. For a real client, eval traffic must never go into a live leads table; use a staging copy.
- Change one thing per run (prompt, then model, then design) so every result has one cause.
- Prompt revision 1 wrote Josh's labeling reasoning into the prompt as general rules: Training = hands-on or step-by-step (participants learn to do something); Speaking = one-way delivery of ideas; Consulting = changes how the work is done, not only skills. High confidence only when the message names the service or describes a problem only one service can solve. Medium when a problem could be a people problem or a process problem, or when signals are mixed. The main request wins over tentative add-ons. Problems between departments point to Consulting. Planning how to introduce something new points to Consulting. Result: no change (R3). The model echoed the new definition wording as its reason to be sure.
- Model changed to gpt-oss-120b (R4): fixed EVAL-02 and 10. Prompt revision 2 (verbs like present and talk do not name a format) did not fix EVAL-07 or 24 (R5). Two failed rewordings in a row was the signal to stop rewording and change the design.
- Ambiguity gate (v2.5): the model is poor at judging its own certainty but can list alternatives. It now returns other_possible_categories, and the workflow auto-routes only when that list is empty. Any listed alternative goes to a human, because a misroute costs more than a review. Consequence, accepted: requests that mix more than one service always go to a reviewer.
- v2.5 is a new version of the same workflow, not a duplicate: same system, new safety check. A snapshot (lead-intake-v2.4.json) was saved to the repo before the change. The eval set is never edited.
- Holdout set: 10 new cases, labeled and threshold set before running, run once, never used for tuning. Limitation: written by the same assistant that helped write the prompt; a truly independent set should come from someone else.
- Result: v2.5 passed the release threshold on eval-set-v1 (R6) and held safety on the holdout (H1), but holdout usefulness was 4 of 6. The usefulness trade-off (automation vs human review) goes to the client with the evidence; per the threshold decision, the client owns that number.


## 2026-09-25 - Client evaluation summary

- The summary follows the memo rules in cases/eval-summary-drafter/. Revision 3 was approved after Josh's checklist review and saved as eval-summary-v2.5.md.
- Recommendation: a supervised pilot as it is (Option A). Option B is stated as its business consequence: more automation means some messages could go to the wrong team.
- Only the API key rotation is promised before launch. The blank-message check, the longer retry wait, and the scrambled-answer test are internal before-pilot items, left out of the memo because they don't change the owner's decision.
- Catching wrong routes during the pilot depends on the client's teams. It is written as a request to them; we track and report.
- Delivery to teams: we recommend automatic email per team, built and tested before the pilot. The reviewer handing messages out is the fallback.
- The client is offered a test set written by their own staff before the pilot.

