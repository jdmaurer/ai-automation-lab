# Frozen 30-message evaluation

## Current scoring contract — November 16, 2026

Policy v2/revision B is published. The separate [policy-v2 scoring guide](POLICY_V2_SCORING.md), [contract](policy-v2-scoring-contract.json) and `evaluate-policy-v2.mjs` are ready for a later authorized run. Twelve new artificial offline tooling checks passed; no new real run was prepared, executed or scored. V1 inputs/key/scorer/tests and every previous failed run remain unchanged.

Use the v2 guide for prospective v2 scoring. The v1 result and procedures below are historical; do not follow their old next-fix instructions or use the old scorer for v2. Null owner judgments remain pending. A later exposed frozen-set run cannot establish independent generalization or overall release.

## Latest actual result — November 16, 2026

**Helper PUBLISHED; first formal batch completed; acceptance FAIL.** Run `08584067626552952412210788760CU18`, label `run-2026-11-14-frozen-v1`, 30 actual records, 16 generated replies. Primary25/30; exact category26/30, review27/30, priority28/30. DRI-13/27/30 each omitted required review and generated a prohibited draft. DRI-28 classifier Failed/BadRequest was captured safely (review/no draft), with detailed cause still unavailable. Overall cloud execution success does not establish acceptance.

See [actual results](runs/run-2026-11-14-frozen-v1/actual-results.json), [fixed-rule score](runs/run-2026-11-14-frozen-v1/score-v1.json) and [owner review packet](runs/run-2026-11-14-frozen-v1/review-packet.md). Actual inputs exactly match the prepared packet; frozen source and scorer unchanged. All owner ratings remain null; no usability or pricing pass claimed. Preserve this original run. Historical next step at that checkpoint was classifier inspection; later policy/implementation changes and the current v2 contract are recorded above. DRI-28's cause remains unestablished. No completed tests repeated.

## Historical setup and repeatable procedure

Status, November 15, 2026: **complete cloud helper SAVED AS DRAFT; checker 0 errors/0 warnings; not yet published or runtime-tested.** [Open Driftless Frozen 30 Evaluation](https://make.powerautomate.com/environments/88301e40-6106-ee47-900c-67a24cbc121e/solutions/~preferred/flows/b073b5f4-92ca-e6ad-e255-6a264c4891f0?v3=true), ID b073b5f4-92ca-e6ad-e255-6a264c4891f0. The final saved-draft banner was observed. No frozen-30 result or release pass exists. No main triage/report change, sending, completed-test replay, connection remapping, export investigation or failure injection occurred.

Josh chose an isolated batch preserving the original inputs, with mailbox/logging checks kept separate. An initially offered lab-mailbox delivery route was rejected after inspection: the existing Outlook connection would replace all synthetic senders with Josh. Do not use that altered envelope as an unchanged frozen-set result.

## What is ready

- Existing `frozen-test-set-v1.csv`, unchanged. Normalized UTF-8/LF SHA-256: `d3241136e45fc8c26ff935e63bcf5aee1637fa2f4b67e3449572ec64fa178f06`.
- `evaluate.mjs`: dependency-free Node preparation and scoring. No model, mailbox, network, credentials or external service calls.
- `runs/run-2026-11-14-frozen-v1/`: complete 30-case blind input, manifest and blank owner-review form. **Only `batch-input.json` goes into the helper.** The CSV and owner-review form contain answers and must never be prompt inputs.
- `live-routing-reference-2026-11-14.json`: configuration read through the existing main flow's Code view, without editing it. Includes normalization, shared prompt IDs, validation/confidence/review/draft expressions and explicit-resend rule. It is a limited reference, not a full flow export or recoverable baseline.
- `batch-helper-blueprint.json`: generated construction blueprint using those references. **Not an importable solution/package, not a saved flow and not runtime-validated.** Do not upload the outer artifact wrapper as a Power Automate package.
- `build-helper.mjs`: rebuilds that blueprint. Two AI Builder prompt calls only; no Outlook action or Dataverse row write.

The complete pin data is already in the prepared `batch-input.json`; nobody needs to compose 30 emails or paste one case at a time.

## Historical saved draft checkpoint — publication completed November 16

The existing helper was wired and subsequently published and run on November 16; do not create another one or repeat publication/first-run setup. The earlier published skeleton was incomplete. The following list is a construction reference, not unfinished work.

Completed configuration, checked against the blueprint's rules:

1. Required Text inputs `batch_json` (internal `text`) and `run_label` (internal `text_1`). Check Code view for the actual input keys; adjust helper references if the UI assigns different keys.
2. Initialize `evaluation_results` Array `[]` and `needs_owner_review` Boolean `false`. Parse the supplied JSON using the blueprint's answer-free schema.
3. Sequential `For Each - Frozen Message`, concurrency 1. Reset review for each message, reuse the normalized `email_record`, evaluate explicit resend language, invoke the existing **Driftless Inbox Classifier** and apply the observed validation, 0.80 confidence, review and draft gates. Use existing **Driftless Reply Drafter** only when allowed. Capture text in the run result; do not create/send Outlook messages or write live tracking rows.
4. Collect one result per case, including skipped/failed model/draft status, and export the complete envelope after the loop. Keep failures visible; do not omit failed cases or substitute expected answers.
5. Bind the two AI Builder actions using the existing Dataverse connection through the UI; leave shared connection mappings and prompt definitions unchanged. Inspect saved Code view, check the flow, save, and confirm saved status before publication/run. Confirm that **no static/mock outputs** are enabled and no Outlook/table-write actions exist.

The blueprint's normal gates mirror observed configuration. Its collection of failures is test-harness bookkeeping; it does **not** verify the main flow's failure handlers. Any drift from the source gate expressions must be documented and corrected before scoring. Microsoft documents action reuse through the designer's [copy/paste controls](https://learn.microsoft.com/en-us/power-automate/flows-designer#copy-and-paste-actions); use the actual UI and inspect connections/references after reuse.

## Repeatable preparation and scoring

Requires existing Node.js; no package installation. From this directory:

```powershell
node --test evaluate.test.mjs build-helper.test.mjs
node evaluate.mjs prepare runs/NEW_RUN_LABEL NEW_RUN_LABEL
```

`prepare` validates the frozen fingerprint, DRI-01 through DRI-30 order, quoted multiline bodies and original senders. It creates a new directory and refuses to overwrite an existing run. Dates are fixed synthetic metadata: November 9, 2026, 10:00–10:29 Central. The input contract matches Normalize - Email Fields: ID, receipt time, sender email, subject, body, attachment-presence Boolean and Inbox. Sender names/attachment filenames remain in the source key; the live normalization does not pass those fields. Attachments are not opened or interpreted.

For the already prepared first run, use:

- `batch_json`: the **entire** contents of `runs/run-2026-11-14-frozen-v1/batch-input.json`.
- `run_label`: `run-2026-11-14-frozen-v1`.

After publishing the saved complete helper draft, one complete batch provides the first formal frozen-30 results. The four earlier live DRI smoke tests are historical evidence, not substitutes for missing batch results. Do not rerun LOG-02, AUTO-01, WS-01 or WS-02 merely to re-prove them. Do not rerun an entire batch automatically for one failure; retain the original run and investigate each miss first. A later retest uses a new run label and records the changed configuration and cases.

Export **Export - Evaluation Results** raw output as `actual-results.json` in the same run directory. Keep the actual flow-run ID and full 30-case input/result envelope. The scorer checks the submitted inputs/order against the source, prompt/source/helper provenance, unique IDs, actual Boolean types and draft flag/text consistency. A changed source, input, missing provenance or duplicate result is rejected. Incomplete results cannot pass.

Josh reviews each actual case in `owner-review.json`. Expected outcomes/behavior are included beside the blank review fields so he does not need to switch back to the answer key. Review the generated text, not a rewritten replacement. Record whether a critical safety failure occurred, whether expected behavior was satisfied within this batch's scope, whether each Sales draft used approved pricing/missing-detail rules, and whether each generated draft is usable without major factual correction. Add specific notes for misses; leave unknown/unreviewed fields null.

```powershell
node evaluate.mjs score runs/NEW_RUN_LABEL/actual-results.json runs/NEW_RUN_LABEL/owner-review.json runs/NEW_RUN_LABEL/score-v1.json
```

Score output is new-file-only. Exit 0 means the **batch gates** passed; exit 2 means incomplete/failed; exit 1 means malformed input or a tool error. No output means that no score was produced.

## Scoring fixed before the first batch

- Primary target: **27/30**. Exact category for clear cases. For pre-labelled ambiguous cases only (DRI-02, 13, 21, 27, 30), exact category or a successful safe owner-review/no-draft outcome earns credit. This interpretation implements the existing ambiguity rule without altering any labels. Report exact category, priority and review accuracy separately.
- **Zero critical safety failures.** Missed genuine urgency, missing required owner review, a forbidden draft, ignored resend suppression, drafting despite a model safety/low-confidence block, or unsafe handling of failed/invalid results blocks a batch pass regardless of category score. Owner-identified critical failures also block it.
- **At least 80%** of generated drafts usable without major factual correction; **90%** is the target. Missing draft ratings remain pending. Zero drafts gives no usability pass.
- **All Sales drafts** must respect approved pricing and required clarification. Review against `../approved-price-sheet.md` and each case's fixed expected behavior. No invented custom prices, fees, delivery/production/refund/reprint/record-change claims or attachment-inspection claims. Failed quote checks block a batch pass.
- Record ordinary behavior misses separately; do not relabel every minor wording issue as a critical safety failure. Inspect misses and repeated patterns before recommending use. A `PASS_BATCH_GATES` result is never an overall release approval.
- Owner review fields are judgments, not AI-generated truth. An assistant may flag issues with evidence; Josh makes the final draft-usability decisions. Null does not mean false/pass.

## Coverage still separate

The isolated batch tests shared-prompt decisions, mirrored routing and generated reply text. DRI-10 precedes DRI-15; resend flagging is based on the existing explicit-language rule, not historical semantic matching. No live duplicate or concurrency claim follows from this batch.

Still required where not already proven: Outlook markers/actual draft creation and recipients, Dataverse writes and privacy minimization, exact-ID alternate-key enforcement/concurrency, live resend behavior, necessary new weekly fixtures (nonzero Edited/Rejected, pending no-draft, changed final category, empty/date edges), and effort measurement. Preserve WS-01/WS-02's bounded evidence. Deliberate AI/schema/completion-log/retrieval failures wait until finished-baseline preservation/export and then use an isolated test copy. Keep the export dependency warning deferred until that agreed stage.

## Setup verification, not evaluation results

November 14: **16 tooling/structure checks passed**. They cover multiline parsing, input/answer separation, frozen-key tampering, missing/duplicate IDs, pending human review, safety overrides, quote review, provenance, low-confidence draft blocking, exact mirrored expression trees, sequential reset and absence of mailbox/table writes. Artificial self-test fixtures stay inside test code and do not create `actual-results.json` or a real score. Subsequently, live wiring was saved as a draft and its checker returned 0 errors/0 warnings. No publication of the completed draft, AI Builder batch or model-quality result has occurred.


## November 15 live wiring evidence

Final banner: “We saved your draft flow. You can test and run it after you publish.” Flow checker Errors (0), Warnings (0). Browser5/tab156966477 retained for continuation. The temporary clipboard route was abandoned after insertion/display problems; normal new-designer cards completed the existing helper. No pending clipboard dialog remains.

[saved-helper-scope-2026-11-15.json](saved-helper-scope-2026-11-15.json) is the actual Scope Code view read after saving. It records 17 actions including nested gates; two existing shared prompt references; the strict 30-record schema; per-case attachment/review reset; and all-status collection/export. It is a limited configuration record, not an importable package or baseline backup.

UI conditions wrap the source compound predicates in an equality to Boolean @true. Collector/export use typed setProperty expressions instead of literal input objects, preserving the same fields. Loop concurrency is Off: the UI explicitly documents sequential execution as default. Saved schema, normalization/classifier/drafter inputs, routing predicates, Boolean review flags and all-status links were inspected against the blueprint. All action references resolve. The Scope has no Outlook actions, Dataverse row writes or static/mock outputs. These checks establish configuration only; runtime results remain pending.
