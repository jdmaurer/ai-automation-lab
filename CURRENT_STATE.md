# CURRENT STATE — updated 2026-11-15 — RESUME HERE

Canonical baton under AI_HANDOFF_PROTOCOL.md. Active Week 8 case: `cases/driftless-inbox-triage/`. Scope frozen: evaluated/documented SME prototype; no added features or production-perfection work. Detailed history is in week8-log.md, test-cases.md and decisions.md.

## Exact stopping point — isolated frozen-30 helper WIRED AND SAVED AS DRAFT

**Driftless Frozen 30 Evaluation** now exists: b073b5f4-92ca-e6ad-e255-6a264c4891f0. [Open saved helper](https://make.powerautomate.com/environments/88301e40-6106-ee47-900c-67a24cbc121e/solutions/~preferred/flows/b073b5f4-92ca-e6ad-e255-6a264c4891f0?v3=true). Current browser5 / tab156966477 is marked for continuation.

Final save confirmed through “We saved your draft flow. You can test and run it after you publish.” Flow checker then showed **Errors (0), Warnings (0)**. Complete wiring is a SAVED DRAFT; it has NOT been published or runtime-tested. An earlier classic-editor Save published only the partial input/initializer skeleton; that is not the completed evaluator. No batch run, real score, model-quality pass or overall release is claimed.

**Single next action: publish the completed helper draft**, then perform the first formal frozen-30 batch with the prepared packet and capture actual results for Josh's owner review. Do not rebuild saved wiring or repeat earlier tests.

### Saved configuration inspected

- Required Text inputs batch_json/internal text and run_label/internal text_1, Peek-code checked. Initializers: evaluation_results Array []; needs_owner_review Boolean false.
- Evaluate - Frozen Batch contains Parse - Frozen Batch, For Each - Frozen Message, Export - Evaluation Results. Saved scope has 17 actions including nested actions. The temporary empty Scope was reused/renamed, not left as a duplicate.
- Parser content @json(triggerBody()?['text']); strict schema exactly matches the blueprint, array minItems/maxItems30, original normalized fields only, no expected labels.
- Loop @body('Parse_-_Frozen_Batch'); Concurrency control Off. UI explicitly states loops execute sequentially by default. Reset - Owner Review starts each case using that case's has_attachments Boolean; Normalize reuses the original email_record. No shared cross-case review state carries forward.
- Explicit-language resend rule retained. Run a prompt uses existing classifier 614118d4-6ca8-4344-b945-8659eb8bb3d8 with @outputs('Normalize_-_Email_Fields').
- Existing validation, 0.80 confidence, owner-review and draft predicates reused. The UI represents predicates as compiled compound expressions compared to actual Boolean @true; these saved expressions were compared to the source predicates after normalizing line endings. Three required review setters store Boolean true (policy, low confidence, invalid output).
- Draft - Generate Reply uses existing drafter e9c13e46-ec62-4cd4-b52f-b2f596db5821, original email_record and stringified actual classification_record. Existing Dataverse connection selected automatically; no shared connection or prompt edits.
- Collect - Actual Result appends one typed object to evaluation_results: ID, category, priority, confidence, needs_owner_review, possible_resend, draft_generated, draft_text, processing_status, classifier_status, drafter_status and raw classification. It runs after Validate succeeds, fails, times out or skips.
- Export - Evaluation Results follows the loop for all four statuses, returning scope isolated-batch, run label, real helper/flow-run IDs, frozen fingerprint, source/prompt IDs, actual submitted input_messages and collected results. setProperty expressions preserve JSON types and text without manually assembling escaped JSON.
- Saved Scope Code view read through UI and inspected: no unresolved action references, two AI Builder calls only, no Outlook action, row write or static/mock output. Limited configuration record: evaluation/saved-helper-scope-2026-11-15.json. This is not a complete flow export/recoverable baseline and does not replace later baseline preservation.

### Resume/test packet

Guide: cases/driftless-inbox-triage/evaluation/README.md. Prepared run: evaluation/runs/run-2026-11-14-frozen-v1/.
- batch_json = entire prepared batch-input.json.
- run_label = run-2026-11-14-frozen-v1.
- Original frozen v1 unchanged: LF SHA256 d3241136e45fc8c26ff935e63bcf5aee1637fa2f4b67e3449572ec64fa178f06.
- Preparation/scoring tools and 16 prior offline tooling/structure checks retained, not rerun here. No actual-results.json or real score exists. Josh's owner-review judgments remain blank/null.
- Preserve original senders/subjects/bodies/attachment-presence and DRI-10-before-15 order. Never feed the answer key or owner-review form to the prompts.
- Batch tests shared prompts/mirrored routing and generated text; mailbox markers, real Outlook drafts, Dataverse/alternate-key/concurrency and live resend behavior remain separate evidence.

### Browser recovery resolved

Josh reported that switching to Outlook made the prior clipboard dialog disappear. Assistant confirmed the helper fields survived and the block was only in My clipboard. Classic insertion did not reliably work; a display error was observed without proving a specific root cause. The assistant saved the partial helper, switched to the full-page new designer, and completed missing wiring through normal cards. Monaco schema entry required native paste; final saved parser schema was inspected and matches the blueprint. No pending clipboard dialog remains. Do not recreate the helper, paste the old clipboard block again, or resume the earlier stalled wizard.

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

1. Publish the saved complete helper draft; run and score frozen 30 once with actual shared prompt outputs and Josh's draft ratings. Inspect misses; only necessary ordinary defects. Batch pass does not establish Outlook/Dataverse side effects.
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
