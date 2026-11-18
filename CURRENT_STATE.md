# CURRENT STATE — updated 2026-11-17 — RESUME HERE

Canonical baton under AI_HANDOFF_PROTOCOL.md. Active Week 8 case: `cases/driftless-inbox-triage/`. Scope frozen: evaluated/documented SME prototype, no extra features.

## Latest November 17 checkpoint — isolated FI-02 repair saved/Published; one targeted recovery PASS

Josh authorized applying the explained format-check fix **to the isolated copy only**, verifying saved status and one necessary FI-02 check, preserving originals/failed run/accepted limitation and stopping on failure.

**Implemented only in manual copy** `bca4414b-abe2-f111-84ea-000d3a367f8a`: Parse JSON **Validate - Classification Structure** checks existing11 required field types after classifier success. Normal Validate requires this check Succeeded. Reused existing AI-failure setter/Outlook marker/same-row Failed log after check Failed/TimedOut/Skipped; skipped check retains a recovery route when classifier itself fails. Existing gate subtree unchanged except predecessor; downstream policy/drafting rules and marker/log payloads retained. Saved banner, checker0errors/0warnings and Published/ready observed.

**One preregistered verification run `08584066464556424522963834692CU18`, Nov17 about6:07PM Central,3seconds. Scoped acceptance PASS.** Schema rejected confidence invalid as String where Number required. Normal validation/body/drafter/reply creation Skipped. Review setter, actual Outlook Needs Owner Review marker and Dataverse failure update Succeeded. Returned row `1faab4ff-e3e2-f111-84ea-000d3a367f8a` matches Start; message ID matches marker. Actual Failed/Unknown/Pending, needsownerreview true, followupopen true, draftcreated false. One new unsent source fixture; zero reply drafts/model calls/sends.

Cloud status **Failed is expected for the injected schema failure**; successful recovery is the scoped pass. [Repair report and actual result](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/execution/fi02-repair-a/README.md), preregistration `029282c8aeddea2d9dd2cc5650461238d491f5e1`.

Original FI-02 failed run `08584066475931016390512579185CU11` and all its artifacts remain FAIL/unchanged. FI-01 not repeated; FI-03/FI-04 NOT RUN; weekly copy not created. **Published original main/evaluator/weekly flows and shared prompts/connections unchanged; repair NOT deployed to originals.** Accepted contact-update limitation, baseline, earlier failed runs/owner judgments preserved. No additional runtime or full30 tests. Overall release NOT_ESTABLISHED.

**Single next action:** this bounded repair task is complete; report the isolated result and await Josh's separate direction on carrying the repair into the main flow or remaining work. Do not deploy to originals, repeat FI-01/FI-02, or start FI-03/FI-04 automatically. Saved snippets are change evidence, not a new complete baseline export.

## Earlier November 17 checkpoint — FI-02 ran ONCE and FAILED; STOPPED, no repair

Josh authorized reconnecting and FI-02 once only, preserving originals/evidence/accepted limitation and stopping on failure. Read live baton and preregistered packet; copy run history initially showed only FI-01. Used existing manual-only **Driftless ISOLATED Failure Triage 2026-11-17**, ID `bca4414b-abe2-f111-84ea-000d3a367f8a`; no configuration edits.

**FI-02 actual run `08584066475931016390512579185CU11`, Nov17 about 5:48PM Central, 3 seconds, cloud Failed. Acceptance FAIL.** Copied Compose returned malformed confidence `invalid` and Succeeded; Validate - AI Output failed with InvalidTemplate: greaterOrEquals received String and Integer. Invalid-output review setter/category marker/failure log all Skipped, as did the separate classifier-action failure recovery. Validation threw before selecting the invalid-output branch; the other recovery depends on classifier failure, but that action succeeded. **No automatic review/failure recovery.**

Reply creation/body/non-Support drafter all Skipped. One new unsent synthetic source draft and successful Start log; zero reply drafts/model calls/sends. Final Dataverse row values not independently reopened; do not invent them. [FI-02 report](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/execution/FI-02.md), [actual result](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/execution/fi02-result.json). Failed cloud record retained, no resubmit.

**Stopped immediately after establishing failure; only read-only evidence inspection/closeout followed.** No repair/save/publication, FI-01 repetition, FI-03/04 or full30/completed-test replay. FI-01 scoped simulated-action recovery PASS remains unchanged; FI-03/04 NOT RUN, weekly copy not created. Test copy remains Published manual-only. Original main/evaluator/weekly flows, shared prompts/connections, baseline, all prior failed runs and accepted contact-update limitation unchanged. Owner judgments pending; overall release NOT_ESTABLISHED.

**Single next action:** stop execution work and present this demonstrated validation-recovery gap for Josh's decision. No further repair or testing under this authorization. Any later repair must address general wrong-type validation handling, preserve this failed run, use the isolated copy, and receive a separate bounded instruction before changes/tests.

## Earlier November 17 checkpoint — FI-01 scoped PASS; FI-02 setup Published, NOT RUN; browser stopped

Continued the existing isolated triage copy **Driftless ISOLATED Failure Triage 2026-11-17**, ID `bca4414b-abe2-f111-84ea-000d3a367f8a`. This supersedes the older disabled/incomplete-copy checkpoint below. Its published definition is now **manual-only**, not an Inbox subscription; publishing made it On / Instant. Original main, evaluator and weekly flows, shared prompts and connections were not edited.

**FI-01 ran exactly once and passed the scoped simulated action-failure acceptance check.** Cloud run `08584066687962115280420875208CU04` is Failed as deliberately injected: classifier input `@div(1,0)` failed before a model/network call. Actual recovery set owner review, applied Needs Owner Review to the new unsent synthetic source draft, and updated the same Start row to Failed/Unknown/Pending, follow-up open, draft-created false. Ordinary validation/reply/drafter paths were skipped. One source fixture draft, zero reply drafts/model calls/sends. This is not a real provider outage/timeout test. [FI-01 result](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/execution/FI-01.md), preserved result commit `9d7b2eb72eecb1d7f92a8b21fe0548fba61b562e`.

**FI-02 saved and Published; NOT RUN.** Replaced only the copied classifier with a Compose boundary named Run a prompt, retaining the response envelope but confidence string `invalid`. Restored the category input cleared by the designer and the copied AI-failure dependency (Run_a_prompt Failed/TimedOut). Full Validate subtree matches FI-01 source after status-capitalization normalization; recovery semantics unchanged. [One-run preregistration, fixture and action snapshots](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/execution/fi02-preregistered.json), commit `6cb6e8b6abf1ba6e9d11743c00cfd3cdde091555`. Saved banner then Published/ready observed. Opening Test timed out; final snapshot still editor, no test panel. No Run flow submission or FI-02 execution/model call/mailbox/Dataverse write occurred.

Stopped further browser work after control timed out. FI-03 and FI-04 remain NOT RUN; weekly isolated copy not created. Preserve all earlier failed runs, baseline and accepted contact-update false positive unchanged. Owner judgments still pending; full release NOT_ESTABLISHED.

**Single next action:** when control is reliable, inspect this same manual-only copy's run history for any unexpected run, then execute preregistered FI-02 once with its saved pin data. Require actual review/failure logging and no reply draft; validation error without recovery is FAIL and requires stopping. Do not repeat FI-01, resubmit old runs, rebuild copies, change shared prompts/original flows or repeat completed normal/full30 tests. FI-03/FI-04 follow only if FI-02 passes and control remains reliable.

## Earlier November 17 checkpoint — disabled isolated triage copy SAVED; failure checks NOT RUN

Josh explicitly requested reconnecting and continuing the same four pending failure checks. Browser binding initially recovered. Created **Driftless ISOLATED Failure Triage 2026-11-17**, ID `bca4414b-abe2-f111-84ea-000d3a367f8a`; My flows showed Disabled / toggle false.

**Saved draft only:** copied Inbox trigger removed, manual trigger added with fixture_json input, Normalize adapter `@json(triggerBody()?['text'])` and escaped lookup filter verified in Code view, Start log Message ID/Received At fields entered as normalized-reference tokens. Other copied trigger references/required fields still need adaptation/verification; **not ready to Publish/Test**. Do not enable its older copied published Inbox definition. No fault injection installed yet.

Designer control became inconsistent while expanding branches; stopped further configuration, saved Draft and verified “We saved your draft flow. You can test and run it after you publish.” [Continuation evidence](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/copy-setup-retry.json), [same four-check plan](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/plan.json).

**One copy created; weekly copy not created; FI-01..FI-04 all NOT RUN.** Zero Test/Publish/Enable/model calls/mailbox or Dataverse writes. No original-flow/shared-prompt/connection edit. All failed runs, exported baseline, accepted contact-update limitation and owner judgments preserved.

**Single next action:** resume this existing disabled copy only after reliable browser control; verify manual trigger schema/internal key and all adapted references/source diff before any activation/run. Do not create another duplicate, repeat completed tests, edit the original/shared prompt, or call setup progress a failure-test pass.

## Earlier November 17 checkpoint — isolated failure tests BLOCKED before copy creation

Josh authorized isolated failure testing in separate copies, preserving published originals, all failed runs and the accepted contact-update limitation; no completed-test replay.

Read the live baton, baseline source definitions and existing failure evidence. Prepared [four-check plan and pin data](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/plan.json): FI-01 classifier-action failure; FI-02 wrong-typed output; FI-03 completion-write failure after one unsent draft; FI-04 weekly continuation/incomplete-retrieval stop. [Attempt record](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/README.md).

**Browser blocked before creation:** inventory succeeded, but the first Power Automate tab binding reported Debugger unattached. Stopped UI work without retries. **0 test copies, 0 tests/model calls, 0 published-flow/shared-prompt/connection edits, 0 mailbox/Dataverse writes.** No result/pass claimed. Baseline and all prior failed runs remain unchanged; accepted contact-update limitation retained.

**Single next action:** restore live browser access; then create/verify separate manual-only copies, record exact injection/source diffs and IDs, and run only the four pending checks under the existing authorization. Do not activate an unmodified copied Inbox trigger, edit shared prompts, repeat completed checks or resubmit old runs. Exact injection configuration remains pending live UI inspection.

## Earlier November 17 checkpoint — published baseline EXPORTED and preserved; no tests

Josh authorized preserving/exporting the published baseline and GitHub update, preserving all failed runs and the accepted contact-update limitation; no tests.

**Completed:** exported the existing BluffsideHandbookHelper solution as unmanaged at retained version 1.0.0.1. Export success observed; original 126,545-byte ZIP downloaded and preserved, SHA-256 `8ce49ef52feab9aa19539749735785620f72a23f7c5461e9b4b929f7e8d88de5`. All 130 members read/hashed. Includes all three Driftless flows, all three shared AI prompts, inbox-log schema/alternate key and connection references; also includes existing synthetic Bluffside components because this is the existing mixed solution.

[Baseline ZIP/inventory/recovery notes](cases/driftless-inbox-triage/baselines/published-policy-v3-2026-11-17/README.md), [manifest](cases/driftless-inbox-triage/baselines/published-policy-v3-2026-11-17/baseline-manifest.json), [configuration verification](cases/driftless-inbox-triage/baselines/published-policy-v3-2026-11-17/configuration-verification.json). Main priority action/helper Scope and all four classifier/drafter input parameter sets match published references (export host-key serialization normalized); classifier wording matches saved/reopened record. No config, prompt, connection or business-policy edits.

**Dependency:** export UI lists AI Solution default templates `msdyn_AISolutionDefaultTemplates` version 202608.1.4.1. This is a configuration recovery package, not a tested portable restore or backup of live mailbox/Dataverse rows/authenticated connections. Import/restore NOT performed/proven. Browser control reset after Download; stopped UI actions. Archive was recovered from the completed download and verified on disk; no repeated export.

All 72 prior evaluation run files and all other existing evaluation artifacts remain unchanged. Contact-update over-escalation remains an accepted noncritical limitation; no tuning or failed-check relabelling. Prior formal v1/v2 FAILs, E 4/5 exact / 3/3 tested order changes and pending owner judgments retained.

**Zero new model/flow/mailbox/full30/scorer tests, previews, imports or failure injections.** No new release pass. Preservation/export is complete; overall release NOT_ESTABLISHED.

**Single next action:** stop this export task. Later isolated failure work requires its own bounded authorization; never break the only working flow or shared live prompt. Remaining owner-review, unproven integration/weekly coverage and essential handoff items stay open.

## Earlier November 16 checkpoint — BOTH order-change v3 flow drafts PUBLISHED; inputs verified, no tests

Josh explicitly authorized publishing both saved drafts and checking inputs/status, updating GitHub and preserving failed runs/accepted contact-update limitation. Published main and helper once each through their existing tabs.

**Verified Published /ready in both flows.** Main completion-priority action exactly matches the checked saved JSON; full helper Scope exactly matches its checked saved JSON. Both classifier and non-Support drafter prompt IDs plus original normalized-email/classification input expressions match the canonical saved input verification. No input repair/configuration/prompt/connection/schema change during publication.

The deterministic effective-priority override is now in the **published definitions**: Support + record_change_requested=true => Urgent; existing Support/change review rules require manager attention. Shared classifier wording was already saved. Helper retains raw model output separately and policy-v3/order-change-urgent-e metadata.

[Publication evidence](cases/driftless-inbox-triage/evaluation/configuration/order-change-policy-v3-publication-2026-11-16/README.md), [verification](cases/driftless-inbox-triage/evaluation/configuration/order-change-policy-v3-publication-2026-11-16/publication-verification.json), [current policy/accepted limitation](cases/driftless-inbox-triage/policy-v3-order-change-2026-11-16.md). Contact-only update can still be over-escalated; Josh's accepted limitation remains. E's4/5 exact/3of3 order evidence and all earlier failed runs/results/scores/owner forms are unchanged.

**Zero new classifier/drafter/manual workflow/mailbox/full30 tests, previews or rescoring.** Published status is not a new runtime/quality/release pass. Owner judgments pending, overall release NOT_ESTABLISHED. Limited snippets are not complete baseline exports.

**Single next action:** publication is complete; stop this publication task. Continue only separately requested bounded owner-review/baseline/failure/handoff work. Do not rerun tests, tune the accepted false positive, relabel prior failures or use v2 scoring unchanged for v3 effective/raw-priority differences.

## Earlier November 16 checkpoint — order-change policy v3 SAVED; limitation accepted; no new tests

Josh explicitly authorized saving existing candidate E with contact-update false positive documented, verifying both inputs/status and GitHub closeout; **no more tests**.

**Saved and confirmed:** shared classifier candidate E saved/reopened, exact normalized wording matched with dynamic email_record token intact. Main and helper **saved as Draft**, both saved banners observed and **checker0 errors/0 warnings**. Main logged priority and helper effective priority force Urgent for Support+change true; existing review rule already requires manager attention. Helper raw classification retained and metadata tagged policy-v3/order-change-urgent-e. No other routing/draft/schema/connection/node changes.

Both classifier/drafter prompt IDs and original email/classification expressions verified. Designer cleared main classifier email input after prompt Save; restored exact original normalized reference, resaved and checked again after reopening saved prompt. Main numeric-choice field read-back verified as actual @ expression before final save, other log fields unchanged.

**Publication status:** flow overrides are **saved drafts, NOT PUBLISHED**. Shared prompt Save applies everywhere the prompt is used, including existing published flows; deterministic flow overrides require publishing both drafts. No runtime pass inferred.

[Policy/accepted limitation](cases/driftless-inbox-triage/policy-v3-order-change-2026-11-16.md), [save evidence](cases/driftless-inbox-triage/evaluation/configuration/order-change-policy-v3-save-2026-11-16/README.md), [verification](cases/driftless-inbox-triage/evaluation/configuration/order-change-policy-v3-save-2026-11-16/save-verification.json). Contact-only update may be mislabeled Support/change true and unnecessarily marked Urgent; Josh accepts it as noncritical prototype limitation. Prior E remains4/5 exact,3/3 order cases; all old failures preserved unchanged.

**Zero new classifier/drafter/workflow/mailbox/full30 tests, previews or rescoring.** Owner judgments unchanged/pending. Full release NOT_ESTABLISHED. Limited snapshots are not complete baseline exports.

**Historical next action (now completed):** publish the two saved drafts; no additional tests requested. Do not repeat E checks/full30, repair the accepted contact false positive, change old keys/scores or silently use v2 scoring for effective/raw-priority divergence.

## Earlier November 16 checkpoint — order-change v3 candidate:3 order cases PASS, contact scope control FAIL; STOPPED, NOT SAVED

Josh authorized every existing-order change (including proposed/question-form changes) => Urgent + manager review, independent of production timing. Five-check plan preregistered in `9c4e009709e8a0c4e704c5b38a5cdf8ff752128a`, [E evidence](cases/driftless-inbox-triage/evaluation/runs/order-change-policy-v3-targeted-2026-11-16-e/).

**Five classifier calls:4 targeted passes,1 scope failure.** Original DRI-12, fresh future-dated quantity question and wording replacement all Support/change true/raw Urgent => proposed effective Urgent + review. Ordinary new quote Sales/change false/Routine => ordinary handling. Contact-only update with orders unchanged was wrongly Support/change true/raw Routine; proposed Support+change shortcut would make it Urgent instead of expected General/Routine. All tested order-change cases passed; failure is unrelated-record over-escalation, not a missed tested order change.

Effective-priority/review results are **offline execution of preregistered proposed expressions and existing UI-read review predicates on actual classifier outputs**, not workflow runtime. The proposed priority fields were never installed.

**Stopped at first failure (case5), no rewrite/retry/extra tests/full30/drafter/mailbox/workflow run.** Cancel discarded unsaved prompt candidate. No prompt Save, flow edit/Save/Publish, connection/schema change. **Rule not saved/deployed; published baseline unchanged.** Both flows' classifier/other-drafter IDs/email/classification references verified intact after cancellation; helper full Scope unchanged.

[Report](cases/driftless-inbox-triage/evaluation/runs/order-change-policy-v3-targeted-2026-11-16-e/README.md), [results](cases/driftless-inbox-triage/evaluation/runs/order-change-policy-v3-targeted-2026-11-16-e/classifier-results.json), [status](cases/driftless-inbox-triage/evaluation/runs/order-change-policy-v3-targeted-2026-11-16-e/attempt-status.json). Before/candidate wording, original flow snippets, input evidence and offline expression source preserved. Earlier failed runs/key/scorers/contracts/owner forms unchanged. V1/v2 formal failures remain; human ratings pending; no overall release claim.

**Historical stopping point (superseded by Josh's explicit save-with-limitation authorization above):** stop implementation/testing and report the scope finding. No second correction or full30 authorized here. Distinguish successful tested order-change handling from the false Urgent contact-update control. V3 is a prospective candidate, not an installed policy; do not use the v2 scorer unchanged for effective/raw-priority divergence.

## Earlier November 16 checkpoint — consolidated review candidate FAILED first check; STOPPED, NOT SAVED

Josh confirmed Cancel on prior urgency-C, clarified all changes require manager review regardless of timing, reviewed final consolidated wording, then authorized application/input verification/only targeted checks with stop-on-failure. Exact wording +6 blind inputs preregistered in `e57e16f16b131910664a9a4cbd4527bfd511980c`, [D evidence folder](cases/driftless-inbox-triage/evaluation/runs/consolidated-review-targeted-2026-11-16-d/).

Candidate applied only in prompt editor, input token retained and exact normalized wording verified. **One classifier call only: CRD-01 uses original DRI-12. Actual Support/Routine/confidence1, change_requested=true, context=true, adversarial=false, draft_candidate=false. Expected Urgent: FAIL.** Change recognition now true and existing rules require owner review/no draft, but urgency still wrong. No workflow execution inferred.

**Stopped immediately:** remaining5 cases not run, no wording iteration/retry/drafter/workflow/full30/completed-test replay. Cancel discarded unsaved candidate; no prompt Save, flow edit/Save/Publish or connection change. **No saved/deployed correction.** Both flows' original classifier and other-drafter prompt IDs/email/classification expressions verified intact in live Code views after cancellation.

[Report](cases/driftless-inbox-triage/evaluation/runs/consolidated-review-targeted-2026-11-16-d/README.md), [actual targeted result](cases/driftless-inbox-triage/evaluation/runs/consolidated-review-targeted-2026-11-16-d/classifier-results.json), [status](cases/driftless-inbox-triage/evaluation/runs/consolidated-review-targeted-2026-11-16-d/attempt-status.json). Before/candidate wording and input-reference evidence preserved. All prior runs/key/scorers/contracts/owner forms unchanged; original v1 and full-v2 remain FAIL. Human ratings pending, overall release NOT_ESTABLISHED.

**Historical stopping instruction (superseded by Josh's later order-change-policy authorization above):** stop implementation/testing and retain the urgency limitation for closeout. No further repair/model call/full30 rerun under this authorization. Manager review was already present for DRI-12 in the full-v2 run; formal urgency correctness remains unresolved. Do not silently change acceptance criteria or save the failed candidate.

## Earlier November 16 checkpoint — bounded urgency attempt STOPPED by browser control; zero tests, no save

Josh authorized one general urgency correction, necessary targeted checks only, preserve failures, no full30/features, stop on failure. Plan and five blind inputs preregistered before editing in `219acea16c2d5d12ed0e21eac4d554d81095f176`, [new folder](cases/driftless-inbox-triage/evaluation/runs/urgency-targeted-2026-11-16-c/). One known DRI-12 regression +4 fresh probes: two operational holds, two routine future-change controls. Max5 classifier calls, zero drafter calls; stop on first failed check. Candidate would be tested unsaved and saved only if all scoped checks pass.

Live shared classifier editor opened from main flow's Run a prompt. Original saved meaning-first revision B/urgency paragraph confirmed and full instruction text preserved. Input email_record token/reference observed intact before edit. Existing record-change/safety/price/attachment/no-commitment rules already cover common risks; no speculative extras planned.

**Browser control blocked completion:** selectText/type block timed out and kernel reset; single recovery getTab reported Debugger unattached. No Test or Save action was issued. **0 classifier/drafter calls;0 workflow/full30 runs;0 checks completed.** No candidate-save/deployment/targeted-pass claim. Final editor state unobserved; it may contain a selection or unsaved partial edit. No further UI retries or alternative automation.

**Historical next action (completed by Josh):** click Cancel without saving; Josh subsequently confirmed this. Later consolidated D attempt above supersedes urgency-C. Resume only after browser access works, starting by reading saved instructions and reusing this same preregistered attempt. Do not add another revision/test set or rerun full30. This is a tool blockage, not an observed failed model check.

[Status evidence](cases/driftless-inbox-triage/evaluation/runs/urgency-targeted-2026-11-16-c/attempt-status.json) and original instructions preserved. Original full-v2 run08584067370291608645194199559CU22 remains FAIL (DRI-12 urgency); v1 and every failed run/score/owner form unchanged. Pending human judgments unaltered. No new flow features/connections/model change. Overall release NOT_ESTABLISHED.

## Earlier November 16 checkpoint — policy-v2 full30 complete; FAIL, owner judgments pending

Josh authorized a fresh packet/full30 evaluation only. Packet preregistered in `cdfa2deed28320096b1f83c405a2877f94173546` before execution. Label `run-2026-11-16-frozen-policy-v2-b`; actual helper run `08584067370291608645194199559CU22`. Published helper ran once; cloud execution/loop/export Succeeded. Original30 blind inputs/order/hash and policy/revision/source/prompt/helper/run provenance validated by the separate v2 scorer.

**Fixed-rule result: FAIL.** Primary27/30 (target27); exact category28/30, review30/30, priority29/30. One machine-detected critical failure: **DRI-12 genuine urgency missed** — explicit stop-print/wrong-proof message classified Support/Routine instead of Urgent. Review/fixed reply do not erase this failure. DRI-26 expected Internal/actual Support and DRI-29 expected Unknown/actual Finance remain category misses, both review/no draft. DRI-28 classifier Failed/empty classification was safely captured review/no draft; fallback category matches but earns no primary successful-processing credit. Cause unestablished from export.29 classifier actions Succeeded, one Failed.

14 replies collected:9 AI non-Support +5 exact fixed Support (DRI-09/10/11/12/13), with source fixed-support and actual AI drafter Skipped;16 no reply. DRI-13 conforms to prospective v2; DRI-27/30 review/no draft. This is isolated helper runtime evidence, not new main Outlook/Dataverse proof.

All Josh judgments remain null:30 behavior/safety,14 reply quality,7 Sales pricing/clarification. Usability and90% target null; zero replies rated. Known critical failure overrides pending ratings; owner ratings cannot make this unchanged run pass. Overall release NOT_ESTABLISHED. Exposed regression evidence, not independent generalization.

[Actual export](cases/driftless-inbox-triage/evaluation/runs/run-2026-11-16-frozen-policy-v2-b/actual-results.json), [fixed-rule score pending owner](cases/driftless-inbox-triage/evaluation/runs/run-2026-11-16-frozen-policy-v2-b/score-policy-v2-pending-owner.json), [review packet](cases/driftless-inbox-triage/evaluation/runs/run-2026-11-16-frozen-policy-v2-b/review-packet.md), [original blank form](cases/driftless-inbox-triage/evaluation/runs/run-2026-11-16-frozen-policy-v2-b/owner-review.json). Preserve original files; later owner edits/scores use new filenames. All earlier runs/v1 remain unchanged. No prompt/flow/connection edits, resubmit, extra probes, completed integration/weekly/tooling replay, sends or failure injection.

Screenshot saved locally as evaluation-setup/run-2026-11-16-frozen-policy-v2-b/run-completed.jpg. GitHub screenshot blob upload did not complete; text evidence/results are sufficient to resume. The warning occurred after run/scoring and did not alter cloud flows or result files.

**Next action recorded at that earlier checkpoint (superseded by bounded urgency attempt above):** Josh reviews the packet and supplies his actual behavior/safety, quality and applicable pricing judgments. Keep original blank form/score. Any urgency diagnosis/fix/targeted check is a separate later step; do not repeat full30 or other completed tests.

## Earlier November 16 checkpoint — policy v2 scoring contract READY; no new evaluation run

Josh authorized a separate prospective scoring contract, with v1 and all failed runs preserved, no completed-test replay and no full evaluation.

- Added [machine-readable contract](cases/driftless-inbox-triage/evaluation/policy-v2-scoring-contract.json), [v2 scorer](cases/driftless-inbox-triage/evaluation/evaluate-policy-v2.mjs), [guide](cases/driftless-inbox-triage/evaluation/POLICY_V2_SCORING.md) and a separate 12-test offline tooling suite. Contract ID `driftless-policy-v2-scoring-v1-2026-11-16`; binds policy `driftless-review-draft-policy-v2-2026-11-16` and published revision `meaning-first-fixed-support-b`.
- Original frozen inputs/order/hash, v1 CSV/scorer/tests, prior manifests/results/scores/owner forms and all failed runs remain unchanged. Only DRI-13 draft permission has an explicit prospective outcome overlay; original Support/Routine/review expectations remain. This is the adopted policy change, not a retroactive fixture correction.
- All actual Support predictions require review; any created Support reply must exactly match the fixed acknowledgment with source `fixed-support` and AI drafter Skipped. Other generated replies require `ai-non-support` and successful AI status. All original safety/context/confidence/resend blocks remain.
- Targets unchanged: 27/30 primary, zero critical failures, >=80% usable created replies (90% target), compliant Sales pricing/clarification. Report exact-category/review/priority separately; all-created-reply usability plus AI/fixed subgroups. Fixed matching never supplies Josh's ratings. Null judgments remain pending and usability/90% target null until rated.
- New manifest/owner wrapper binds contract hash/version/run label/frozen input; actual output must have matching policy/revision and known provenance. Old v1 output is rejected, not relabelled. New-file-only preparation/scoring protects prior artifacts.
- **12/12 new offline tooling checks PASS**, artificial fixtures only. No old suite rerun, model call, flow run, prior-run rescore, new real run directory, actual-results or real score created. Existing published flows were untouched.
- A later frozen-set run is exposed regression evidence, not an independent generalization benchmark. The prior vague-follow-up category miss and all failure history remain visible. Overall release is NOT established.

**Next action at that earlier checkpoint (now completed):** when Josh authorizes the next evaluation, prepare a fresh v2 run packet with the new scorer, before any helper execution. Obtain his actual behavior/safety/quality/pricing judgments for that new run; never copy ratings or outputs from earlier runs. No run authorized by this contract-only checkpoint.

## Earlier November 16 checkpoint — meaning-first/fixed Support revision B PUBLISHED; verified after Josh's manual publication

Josh authorized applying the general meaning-first classifier and fixed Support acknowledgment, verifying both flows' references/saves, and only necessary targeted checks. Policy remains v2, implementation revision `meaning-first-fixed-support-b`. Plan+blind inputs preregistered before changes/tests in619528489847d697ad25f3a623b0943bd8b4d16c. [Run plan/evidence folder](cases/driftless-inbox-triage/evaluation/runs/policy-v2-meaning-first-fixed-support-2026-11-16-b/).

**Implemented, saved and now published:**
- Shared classifier meaning check consolidated/moved before category definitions, with no sample phrases/IDs. Saved/reopened text verified.11fields/schema/0.80/other safety and quote rules unchanged. This shared prompt Save already applies to shared usage.
- Both published flows keep existing eligibility gates. Within them, Support → fixed Compose acknowledgment; other eligible categories → existing shared AI drafter. Shared reply-body selector feeds existing Outlook draft or helper collection. Old unconditional AI action removed.
- Fixed body: “Thank you for your message. The owner will review your concern and confirm the next step.”
- Main failure handling follows selected reply body timeout/skipped/failure. Completion logging still uses actual Outlook draft success/ID. Recipients/subject/DraftEmail/no-send behavior retained.
- Helper honestly records actual AI drafter Skipped for fixed Support, typed draft fields/source, and adds policy/revision provenance. Strict30 parser unchanged; no mailbox/table-write action.
- Both flows' classifier and other-drafter prompt IDs/email/classification inputs verified in Code view. Matching selector/body definitions and unchanged eligibility gates checked. Existing connections retained.
- Both draft-save banners/checker **0errors/0warnings** were confirmed. Josh then manually published both flows. Assistant independently verified **Published/ready** in each live tab; main draft-selection definition and full helper Scope exactly match the checked revision. Classifier and other-drafter input references remain intact in both. **New routing is now published**, without a fresh runtime-pass claim.

**Publication hold resolved:** Automatic approval review had rejected the assistant's main publication attempt. Josh chose manual publication, clicked Publish in both flows and reported completion. Assistant performed read-only UI/Code-view verification; no publication retry/workaround, prompt/configuration edit, model call or workflow test. Separate evidence: evaluation/runs/policy-v2-meaning-first-fixed-support-2026-11-16-b/publication-verification.json.

**Targeted results:** four actual classifier prompt tests only; no Support/other drafter calls, no unplanned preview, mailbox/full30 run, send, completed integration/report replay or failure injection.
- Prior PV2-U02 vague follow-up now contextfalse/candidatefalse → review/no draft, but still category Support rather than expected Unknown: **remaining category miss**, retained.
- New MF-U01 missing history → Unknown/contextfalse/candidatefalse/review/no draft.
- New MF-U02 clear Support → Support/contexttrue/candidatetrue; configured/local source fixed-support; exact literal; AI drafter Skipped; processing Succeeded.
- New MF-U03 clear quote → Sales/contexttrue/candidatetrue/customquotefalse; no review, ai-non-support source.
- **3/4 exact classifier expectations; 4/4 scoped review/draft/source decisions** in local execution of UI-read expressions. Not fresh Power Automate runtime; non-Support text used an explicitly labeled offline wiring fixture, not a generated reply. No overall pass/full-v2 score/generalization claim. No tuning after the remaining miss.

[Full implementation/results/approval report](cases/driftless-inbox-triage/evaluation/meaning-first-fixed-support-results-2026-11-16.md). Raw results, before/after definitions, saved instructions, input verification and local logic checks stored in the new run folder. Limited references are not complete baseline exports.

**Preserved:** frozen-v1 CSV/key/hash, formal08584067626552952412210788760CU18 FAIL25/30/manifest/owner form, earlier ambiguity-v2/v3 and policy-v2-targeted-a failures unchanged. No rerating/spliced scores. evaluate.mjs still v1-only; owner judgments pending.

**Next action at that earlier checkpoint (now completed):** establish the explicit policy-v2 scoring contract before any later full evaluation (existing evaluate.mjs remains v1-only). Keep the remaining category miss, Josh's pending quality judgments and other required integration/weekly/baseline/failure/handoff work open. Do not repeat these checks or claim publication establishes release.

Browser2 main156966424 Published, classifier Code view; helper156966477 Published, full helper Scope Code view. Both marked for continuation. No tests/model calls during publication verification.

## Earlier evaluation evidence — retained, not rerun

- Formal frozen-v1 run08584067626552952412210788760CU18: FAIL25/30 primary,26/30 exact category,27/30 review,28/30 priority;16 replies awaiting owner ratings. DRI-13/27/30 each violated v1 review/no-draft requirements. DRI-26/29 category misses and DRI-10/15 overcalled urgency remain historical. DRI-28 classifier Failed/BadRequest safely captured review/no draft; exact cause unavailable. Original key/input/manifest/results/score/owner form unchanged.
- Earlier ambiguity prompt-v2/v3 targeted failures remain in their original folders. No JSON-schema conflict was found: schema specifies types only. Repeated prohibitions did not repair DRI-13; do not claim knowledge of model internals.
- Owner adopted policy v2 prospectively: all Support review; neutral acknowledgments permitted for identifiable concerns. Preregistered implementation-A run policy-v2-targeted-2026-11-16-a: new vague PV2-U02 wrongly draft-eligible, and DRI-13 reply still offered causes. Four classifier/two drafter calls, saved/published-A configuration preserved. [A results/diagnosis](cases/driftless-inbox-triage/evaluation/policy-v2-targeted-results-and-diagnosis-2026-11-16.md).
- Meaning-first implementation B and fixed Support routing were subsequently manually published by Josh and verified by the assistant. Earlier A and draft-stage snapshots remain historical evidence, not current publication status.
- Limited action/Scope snapshots are configuration references, not full recoverable baselines. Prior clipboard/classic insertion problems are obsolete; do not rebuild/paste the old block.

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

1. Order-change policy v3 is Published in both flows and inputs verified; no publication work remains. Prior formal v1/v2 FAILs and pending owner draft-quality judgments remain. Any future formal v3 evaluation needs explicit prospective scoring for effective/raw-priority differences; no full30 or model tests authorized by this publication step. Preserve all failed evidence.
2. Necessary unproven normal integration checks: exact-ID/alternate-key/concurrency and live resend behavior; required new weekly fixtures (nonzero Edited/Rejected, pending no-draft review, changed final category, empty/date-boundary cases as needed). Preserve proven WS-01/WS-02 instead of repeating them.
3. Published configuration baseline exported/preserved on November 17; see the latest checkpoint. Restore/import is untested and the managed dependency/mixed-solution scope must be respected. No repeat export needed.
4. Isolated deliberate model unavailable/wrong schema/completion-write/retrieval completeness failure testing, after baseline preservation. Never casually break the only working flow.
5. Essential operator runbook, governance/adoption/retention/ownership/disable-recovery handoff, measured metrics and Gate 2. No invented productivity gain; 20% effort-reduction target is not measured.

Release criteria: 27/30 category or pre-labelled ambiguous safe-review outcomes; zero critical safety failures; >=80% drafts usable without major factual correction (90% target); all quote drafts approved-price/missing-detail compliant; exact weekly counts. Full release remains unestablished.

## Live identifiers and working preferences

Environment 88301e40-6106-ee47-900c-67a24cbc121e. Existing solution Bluffside Handbook Helper, ID 90a43d55-5bd9-f111-a05d-000d3a367f8a. Dataverse jdm_table1s; row ID jdm_table1id.
Shared classifier 614118d4-6ca8-4344-b945-8659eb8bb3d8; drafter e9c13e46-ec62-4cd4-b52f-b2f596db5821.

Announce tab switches. Read actual UI. Explain purpose/result before meaningful changes; short grouped routine steps, Josh makes architecture/business judgments. He is colorblind: use action-first instructions and exact screen locations, not color cues. Assistant handles routine navigation/wiring; do not overstate independent implementation. Confirm saves before continuing. Stop on unreliable browser control; no long retry loops or invented progress percentages. Never edit working connections based only on slow UI.

Synthetic data only. No automatic send/forward/delete/archive/move/resolve or shadow body archive. Sensitive bodies excluded from operational tracking; frozen synthetic evaluation text is separately permitted. No new coursework/features.

GitHub updated remotely; fast-forward local C:\Users\joshu\ai-automation-lab before local repo work. Sync the GitHub source in Claude Project before switching assistants.
