# CURRENT STATE — updated 2026-11-14 — RESUME HERE

Canonical baton under AI_HANDOFF_PROTOCOL.md. Active Week 8 case: `cases/driftless-inbox-triage/`. Scope frozen: evaluated/documented SME prototype, no extra features or production-perfection work. This checkpoint supersedes earlier November 14 build-state notes; detailed historical evidence remains in week8-log.md, case test-cases.md and append-only decisions.md.

## Latest live wiring checkpoint — November 15, 2026; clipboard dialog handoff

Continue the existing Chrome helper tab, NOT a new flow. Current browser ID5 / tab156966477, titled Driftless Frozen 30 Evaluation, full-page classic designer. URL still ends in solutions/~preferred/flows/new?newFlowName=Driftless%20Frozen%2030%20Evaluation...v3=false&v3survey=true; no saved helper ID read yet. The main flow list was inspected before creation; no saved evaluation helper was listed then.

Configured in the UI: required batch_json/internal text and run_label/internal text_1 (Peek code confirmed required keys); Initialize - Evaluation Results / evaluation_results / Array / []; Initialize - Needs Owner Review / needs_owner_review / Boolean / false. Do not rebuild these. A “Your flow is ready to go. We recommend you test it” banner was visible on resume, but subsequent full wiring/save is NOT confirmed. No batch run occurred.

An empty Scope was added as a temporary wiring container. Classic My clipboard contains that Scope and the results initializer. The prepared blueprint's Parse/ForEach/Export block was packaged as Evaluate_-_Frozen_Batch and pasted through the supported clipboard UI. A Chrome JavaScript prompt appeared: “Copy to clipboard: Ctrl+C, Enter”, with the prepared action JSON selected. Do not paste/insert it again without checking whether it already exists. If the populated block is inserted successfully, remove only the unused empty Scope from this new helper and verify the existing AI Builder bindings; do not touch the main flow or shared connections.

Browser control stalled while accepting that clipboard prompt (focus commands timed out). Input stopped under Josh's existing rule. An async user question asks him to close the visible clipboard dialog with Enter, or report No dialog visible. The tab is marked for handoff. NEXT: after Josh answers, inspect this actual tab once, confirm whether the dialog/block is present, finish only remaining wiring, run checker, save and confirm status. No full helper save/checker/publication/runtime pass claimed. Existing evaluation pack/16 tooling checks unchanged; no completed tests rerun or mail sent.

## Prior pack checkpoint — superseded for live UI progress by November 15 above

Josh requested repeatable evaluation using the existing frozen 30 and no repeated completed tests. After a sender-fidelity limitation was explained, he explicitly selected an isolated batch preserving original inputs, with mailbox/logging checks separate. Do not send all cases from Josh and call that the unchanged frozen set.

GitHub `cases/driftless-inbox-triage/evaluation/README.md` is the setup/run guide. Prepared:
- Original frozen-test-set-v1.csv unchanged; LF-normalized SHA256 d3241136e45fc8c26ff935e63bcf5aee1637fa2f4b67e3449572ec64fa178f06.
- Dependency-free Node prepare/scoring tool, 16 passing offline tooling/structure checks. These are NOT model/workflow evaluation results.
- Complete answer-free 30-case batch input, manifest and blank owner review under `evaluation/runs/run-2026-11-14-frozen-v1/`. Original sender/body/subject/attachment-presence and DRI-10-before-15 order preserved; labels/expected behavior excluded from model input.
- Limited source configuration read in main flow Code view: normalization, classifier/drafter IDs, validation/confidence/review/draft expressions and explicit-resend rule. No main-flow edits.
- Rebuildable helper blueprint with two existing AI Builder prompt references, sequential per-case reset, result collection and provenance. NO Outlook operation or Dataverse row write. This is a construction blueprint, NOT an importable package, saved flow, verified baseline/export or runtime-proven definition.

Cloud creation stopped when browser editing could not reliably reach new helper controls. The unsaved wizard was named Driftless Frozen 30 Evaluation; no saved helper ID/checker/publication/run was confirmed. No main or weekly flow changes, mail sends, logging replay, connection changes, export investigation or failure injection occurred. No actual-results.json, real score or frozen-30 pass exists.

**Single next action:** inspect the live solution's flow list, then finish creating/saving the isolated on-demand **Driftless Frozen 30 Evaluation** helper from the blueprint. Check for a persisted wizard result first to avoid duplicates. Use required Text inputs batch_json and run_label; verify their actual internal keys in Code view. Follow the evaluation README; only batch-input.json goes to the model-side helper. Confirm saved status and checker before publication/run. Do not call setup complete until a live helper is saved.

## Established evidence — preserve, do not repeat

- Main triage published, ID 53209c07-ca63-bcd9-c7f3-04b29c1f562a. LOG-02 PASS, run 08584069378905225699918187276CU13: normal automatic completion logged full ID/draft, General/Routine, Completed, Pending. Do not replay LOG-02.
- Earlier DRI-01/03/04/07 representative end-to-end smoke tests passed. AUTO-01 automated informational mail passed live; AUTO-02/03 prompt-only. These are bounded evidence, not the formal frozen 30.
- REVIEW-01 remains FAIL for automatic logging, with actual draft plus assisted recovery preserved. Josh accepted its synthetic draft unchanged with unfamiliar-sender caveat; it was not sent. Never resubmit REVIEW-01 to re-prove storage.
- Correlation/minimal logging, exact-ID lookup/stop plus Active alternate key, explicit-language Possible Resend rule and completion-log recovery are published. Exact-ID enforcement/concurrency, live DRI-10/15 and intentional failure recovery are not runtime-proven.
- Message ID storage limit now 401; Draft ID 4000. Full 152-character IDs accepted after observed storage repairs. Do not truncate IDs or infer an unproven backend cause.
- Ordinary AI-failure setter handles Failed/TimedOut, not Skipped. Completion-log recovery independently marks review then attempts a minimal existing-row Failed update, preserves actual draft status and human review data. Runtime deliberate-failure verification deferred.

## Weekly report — published; WS-01/WS-02 PASS, bounded

Summary ID 5712f23d-44e0-f111-84ea-000d3a367f8a. On-demand Date input internal `date`; Central-midnight start-inclusive/end-exclusive window independently converted to UTC. Metadata-only paged Dataverse query, cap100000 and empty-nextLink completeness guard; False branch Terminate Failed / IncompleteWeeklyLogRetrieval. Accepted left expression was preserved; Boolean true comparison saved. Do not rebuild guard/counts/repaired sources.

Grouping uses final category after recorded owner review (Reviewed At), otherwise suggestion. Six categories include zero rows. Processed = Completed or Possible Resend. Accepted/Edited/Rejected counts require actual draft, regardless of later processing failure. Awaiting = processed + Pending + (draft or Needs Owner Review). Follow-up Open is separate.

WS-01 run 08584068931978893152198699997CU21, input {"date":"2026-11-09"}: exact two-record count PASS. General = processed1 / accepted1 / edited0 / rejected0 / awaiting1; all other categories zero. Ground truth: REVIEW-01 Failed + accepted actual draft; LOG-02 Completed + pending draft + Needs Owner Review false. Suggested-category fallback verified. REVIEW-01 Follow-up Open read false in this snapshot; no assistant edit or inferred cause.

WS-02 run 08584068916602989636218220553CU01, same date: new report-output path PASS. Existing connection Valid, no remapping. Formula table + aggregate-only AI explanation + ONE Outlook draft, HTTP200. Independently opened Outlook report and checked dates, recipient, six rows, counts and factual AI paragraph. General1/1/0/0/1, other categories zero. No invented revenue/orders/trends/time savings. Standard explanation rendered; adversarial HTML escaping not runtime-tested.
- Subject OWNER REVIEW - Driftless weekly inbox summary - 2026-11-09.
- To lab owner josh@joshmaurer.onmicrosoft.com; created 2026-11-15T04:00:31Z = Nov14 10PM Central.
- Outlook Drafts showed report + REVIEW-01 + LOG-02, three drafts. Nothing sent/edited/discarded/deleted.
- Report remains UNSENT awaiting Josh's final wording review. Do not claim he accepted it.
- Separate explanation prompt Driftless Weekly Inbox Explanation ID 93a1dc08-e7e4-484e-98c6-0da214657570, displayed GPT-4.1 mini; dates/calculated aggregates only. Existing classifier/drafter unchanged.

## Remaining work — agreed order

1. Finish/save helper; run and score frozen 30 once with actual shared prompt outputs and Josh's draft ratings. Inspect misses; only necessary ordinary defects. Batch pass does not establish Outlook/Dataverse side effects.
2. Necessary unproven normal integration checks: exact-ID/alternate-key/concurrency and live resend behavior; required new weekly fixtures (nonzero Edited/Rejected, pending no-draft review, changed final category, empty/date-boundary cases as needed). Preserve proven WS-01/WS-02 instead of repeating them.
3. Preserve/export the finished working baseline into the repo. Do NOT revisit solution dependency warning before this agreed stage; no new baseline/export exists.
4. Isolated deliberate model unavailable/wrong schema/completion-write/retrieval completeness failure testing, after baseline preservation. Never casually break the only working flow.
5. Essential operator runbook, governance/adoption/retention/ownership/disable-recovery handoff, measured metrics and Gate 2. No invented productivity gain; 20% effort-reduction target is not measured.

Release criteria: 27/30 category or pre-labelled ambiguous safe-review outcomes; zero critical safety failures; >=80% drafts usable without major factual correction (90% target); all quote drafts approved-price/missing-detail compliant; exact weekly counts. Full release remains unestablished.

## Live identifiers and working preferences

Environment 88301e40-6106-ee47-900c-67a24cbc121e. Existing solution Bluffside Handbook Helper, ID 90a43d55-5bd9-f111-a05d-000d3a367f8a. Dataverse jdm_table1s; row ID jdm_table1id.
Shared classifier 614118d4-6ca8-4344-b945-8659eb8bb3d8; drafter e9c13e46-ec62-4cd4-b52f-b2f596db5821.

Announce tab switches. Read actual UI. Explain purpose/result before meaningful changes; short grouped routine steps, Josh makes architecture/business judgments. He is colorblind: use action-first instructions and exact screen locations, not color cues. Assistant handles routine navigation/wiring; do not overstate independent implementation. Confirm saves before continuing. Stop on unreliable browser control; no long retry loops or invented progress percentages. Never edit working connections based only on slow UI.

Synthetic data only. No automatic send/forward/delete/archive/move/resolve or shadow body archive. Sensitive bodies excluded from operational tracking; frozen synthetic evaluation text is separately permitted. No new coursework/features.

GitHub updated remotely; fast-forward local C:\Users\joshu\ai-automation-lab before local repo work. Sync the GitHub source in Claude Project before switching assistants.
