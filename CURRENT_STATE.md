# CURRENT STATE — updated 2026-11-16 — RESUME HERE

Canonical baton under AI_HANDOFF_PROTOCOL.md. Active Week 8 case: `cases/driftless-inbox-triage/`. Scope frozen: evaluated/documented SME prototype, no extra features.

## November 16 — helper PUBLISHED; first formal frozen-30 run completed; acceptance FAIL

Josh finished the desktop Windows setup. Local/browser access then worked. Read LIVE CURRENT_STATE first, evaluation guide and prepared packet; inspected the existing helper, intentionally refreshed the saved cloud draft, and confirmed its parser/loop/export survived. No rebuild or connection changes.

**Driftless Frozen 30 Evaluation**: designer/solution ID b073b5f4-92ca-e6ad-e255-6a264c4891f0. Verified **Published** plus “Your flow is ready to go.” One manual submission of the full prepared batch_json and run_label `run-2026-11-14-frozen-v1`.

- Actual run **08584067626552952412210788760CU18**; scope duration **1m28s**, export completed Nov16 09:51:58 Central. [Open run](https://make.powerautomate.com/environments/88301e40-6106-ee47-900c-67a24cbc121e/flows/9ca55e5e-afe0-f111-84ea-000d3a367f8a/runs/08584067626552952412210788760CU18).
- Runtime/history ID 9ca55e5e-afe0-f111-84ea-000d3a367f8a differs from solution/designer ID above; both were observed through UI. Do not recreate the helper because of these IDs.
- **30/30 actual records captured**, actual submitted inputs exactly match live prepared packet including original senders/bodies/attachment flags/order. Existing scorer accepted source fingerprint, provenance, Boolean types, unique IDs and draft consistency. Frozen v1 SHA256 unchanged: d3241136e45fc8c26ff935e63bcf5aee1637fa2f4b67e3449572ec64fa178f06.
- **Acceptance FAIL:** primary25/30 (required27), exact category26/30, review flag27/30, priority28/30. **16 generated replies.**
- **DRI-13/27/30** each missed required owner review and generated a prohibited draft: six fixed-rule critical violations across three cases. Classifier marked context_sufficient=true and draft_candidate=true at confidence .95/.80/.90, and routing followed those flags. Investigate classifier instruction coverage/interpretation; do not blindly raise the confidence threshold or rewrite routing.
- DRI-26 Sales→Support and DRI-29 Unknown→Finance retained review/no draft. DRI-10/15 overcalled Urgent instead of Routine. DRI-15 safely flagged possible resend, review=true/no draft.
- DRI-28 classifier action **Failed / BadRequest**; fallback Unknown, confidence0, review=true/no draft. Existing iteration28 inspected. Detail panel then said “Error loading operation data”; exact cause unverified. Do not infer content-filter/connection failure. Overall run success does not mean every case's classifier succeeded.
- **Josh's owner-review.json fields remain null.** No draft-usability percentage, approved-pricing pass or overall release claimed. Review wording concerns in DRI-04/06/22 along with the rest of actual replies; assistant flags are not owner judgments.
- Evidence: `evaluation/runs/run-2026-11-14-frozen-v1/actual-results.json`, `score-v1.json`, `review-packet.md` (original messages + expected behavior + unchanged actual drafts together). No artificial outputs, scoring-code changes or relabeling.
- No completed smoke/LOG-02/AUTO-01/WS-01/WS-02 replay, sending, shared prompt edits, routing edits, remapping, export investigation or deliberate failure injection.

## November 16 follow-up — classifier ambiguity inspected; correction PROPOSED ONLY

Live classifier instructions (GPT-4.1 mini) were read through the main flow action's prompt editor and exited with Cancel; Save was disabled. No text, wiring, prompt version or flow publication changed; no model calls/tests. Original failed frozen run and its files are unchanged.

Diagnosis: DRI-27/30 outputs conflict with the existing Unknown/missing-prior-context rule; the generic clarification allowance can be overgeneralized. DRI-13 has a clear Support purpose but competing explanations requiring owner assessment, which the current no-guessing wording does not explicitly prioritize over a generic acknowledgment. This is an evidence-based interpretation, not known internal model reasoning.

[Diagnosis and exact proposed wording](cases/driftless-inbox-triage/evaluation/classifier-ambiguity-diagnosis-2026-11-16.md); adjacent JSON preserves the full live instruction text as inspected. Proposed addition after context_sufficient rules: missing-prior-context follow-ups → Unknown/contextfalse/draftfalse; complaints with competing explanations needing owner assessment → retain supported category/contextfalse/draftfalse. Preserve clear-quote missing-detail exception. Existing false-context routing already marks review and blocks drafts. No confidence threshold/schema/action changes.

**Next action:** Apply this bounded clarification only when instructed, then inspect classifier email_record inputs in both main and helper because prior prompt saves reset bindings. Use new-label targeted checks of the failures/necessary exception boundaries; do not overwrite/replay the failed first batch. Detailed DRI-28 error and Josh's owner ratings remain pending.


### Saved helper and scope boundaries

November15 saved wiring/checker0errors0warnings is historical configuration evidence; November16 publication/run supersedes draft-only status. Limited saved Scope record `evaluation/saved-helper-scope-2026-11-15.json` is not a full export/recoverable baseline. Two existing shared prompts only; sequential loop with per-case review reset; original normalized inputs; source validation/confidence/review/draft rules; all-status result collection/export. No Outlook action or live Dataverse row write. Details in evaluation/README.md. Frozen CSV/answer key/owner review never fed to prompts.

Isolated batch establishes shared-prompt/mirrored-routing outcomes only. Live Outlook/Dataverse/duplicate/concurrency, remaining weekly fixtures and main-flow failure handlers remain separate required evidence.

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

1. First frozen-30 batch is completed and acceptance FAIL. Review saved actual results/ambiguity misses, inspect the DRI-28 BadRequest details when available, resolve demonstrated ordinary defects only, and obtain Josh's final behavior/pricing/draft ratings. Any later targeted retest uses a new label and preserves the failed original. Do not rerun the entire batch automatically. Batch evidence does not establish Outlook/Dataverse side effects.
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
