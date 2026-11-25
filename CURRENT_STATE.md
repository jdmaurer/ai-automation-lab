# CURRENT STATE — updated 2026-11-24 — RESUME HERE

Canonical baton under [AI_HANDOFF_PROTOCOL.md](AI_HANDOFF_PROTOCOL.md). Active Week8 case: [Driftless Inbox Triage](cases/driftless-inbox-triage/README.md). **Scope frozen. Essential documentation complete; overall release NOT_ESTABLISHED.**

## Exact stopping point — Claude closeout, November 23

Claude's independent review (November 19) found the remaining Week 8 work was desk work, not more testing. Josh approved a bounded closeout: three desk items from saved evidence, a one-line acceptance verdict, then Josh's honest Gate 2 score. **No flows, prompts, connections, tests or exports were touched.**

Done November 23:
- **Rates and slices** from the saved v2 run, offline: missed urgent 1/7 (DRI-12), false urgent 0/23, required review missed 0/23, forbidden draft 0/16, review rate 23/30. Reproduces the official score. [evaluation/README.md](cases/driftless-inbox-triage/evaluation/README.md).
- **Low/base/high operating-cost scenarios** with current licensing. Since November 1, 2026, new Premium licenses carry no AI Builder credits; prompts bill through Copilot Credits. [runbook](cases/driftless-inbox-triage/runbook.md).
- **Incident tabletop** for a wrong classification and a sensitive-data exposure, with implemented, procedure and recommended controls separated. Gaps found: no urgency alert, run-history exposure unverified, disable path never drilled.

**Prototype acceptance verdict: FAIL** on the frozen v2 run's critical rule (DRI-12 missed urgency). The v3 order-change rule is a published candidate fix, targeted-tested only. The pending v2 owner ratings cannot change that verdict. They are closed as *not collected*.

DRI-12 is a failure of the charter's acceptance rule. It is **not** one of the Master Calendar's six Gate 2 critical failures.

**Gate 2 (Josh, November 23):** market evidence scores 0 because operator conversations are deliberately scheduled for December, not missing. Claude's proposed technical scores total 13/18; Josh has not finalized them. No calendar critical failure was identified.

**November 24 — guided walkthrough (read-only).** Claude opened the live main flow in the Claude desktop app's built-in browser (signed in as josh@joshmaurer.onmicrosoft.com) and taught it block by block. For each block it gave the Power Automate action name, the n8n equivalent and a plain two-line purpose. The whole main path is covered, from the trigger through Log - Complete. **Nothing was saved or published.** Three limitations were added to limitations.md: keyword resend detection, non-threaded drafts, and send-capable connection.

**New way of working:** Josh clicks, and Claude reads the page as text and explains, one block at a time. Short answers: one table row per block (Power Automate name, search term, n8n equivalent, what it does). No screenshots unless needed.

**November 24, later:** the Secure inputs/outputs change was **stopped**. The Outlook trigger offers no such setting in either designer. The run-history exposure is verified and logged as a limitation; the code-level route is untested. Nothing was saved or published.

**v3 fair-test rules approved by Josh (Nov 24), before any run:** [POLICY_V3_SCORING.md](cases/driftless-inbox-triage/evaluation/POLICY_V3_SCORING.md).
- Charter thresholds unchanged (27/30, zero critical, 80% usable drafts, Sales pricing).
- Effective priority scored, raw kept.
- Josh rates drafts only.
- One shot.
- DRI-22 second number is informational only.

Scorer `evaluate-policy-v3.mjs` passes 11 artificial-only tests. The v1 and v2 suites still pass 12/12 each. No run has been prepared or made.

**v3 fair test RAN, November 24, 2026: FAIL.** One run, no tuning; [results](cases/driftless-inbox-triage/evaluation/runs/run-2026-11-24-frozen-policy-v3/README.md).
- Primary 27/30 ✅, critical failures 0 ✅ (DRI-12 is fixed), Sales pricing 6/6 ✅.
- **Usable drafts 10/13 (77%) ❌.** AI drafts were 8/8; the fixed Support sentence was 2/5.
- Josh's finding: a canned acknowledgment is not useful for urgent customer problems; urgent order issues should be flagged, not drafted.
- Per the one-shot rule, **no further tuning or reruns.** The Driftless build is closed.

**Single next action:** rewrite the case README in plain English, in Josh's voice: what it does, what passed, what failed and what he learned. Then Gate 2 recording, the `week8-portfolio-v0.5` tag and the Weeks 9-12 branch choice.

## Verified build and evidence

| Item | Current recorded status |
|---|---|
| Main triage | Published, includes required-type Parse JSON/FI-02 recovery repair promoted November17. Original classifier/drafter inputs verified at publication. LOG-02 and earlier bounded smoke checks passed; REVIEW-01 remains an automatic-logging failure with assisted recovery. |
| Frozen30 helper | Published/manual isolated batch, no actual mailbox drafts/table writes. v1 primary25/30 FAIL; policy-v2 primary27/30 FAIL due to missed DRI-12 urgency. All original files/scores/blank forms preserved. |
| Order-change policy v3 | Main/helper Published, inputs verified. Every recognized actual/proposed/conditional/question-form existing-order change => Urgent + manager review regardless of date. E targeted4/5 exact,3/3 order cases; no new formal v3 score. |
| Accepted limitation | Contact-only update may be classified Support/change true and unnecessarily Urgent, with existing eligible fixed Support acknowledgment routing. Josh accepted it as noncritical. No tuning or relabelling. |
| Weekly report | Original Published. WS-01/WS-02 passed existing two-row count/output cases. Owner-review Outlook draft is unsent; final wording judgment pending. |
| FI-01 | Scoped classifier-action-failure recovery PASS, run `08584066687962115280420875208CU04`. |
| FI-02 | Original `08584066475931016390512579185CU11` remains FAIL. Separate repair `08584066464556424522963834692CU18` scoped PASS; main repair subsequently Published without retesting. |
| FI-03 | Scoped completion-write-failure recovery PASS, run `08584066443970741245268372506CU25`; one actual unsent fixed reply, review/same-row fallback retained actual draft and owner fields. |
| FI-04 | Scoped continuation/incomplete-retrieval stop PASS, one November19 run `08584064815087764006108930441CU17`,281ms. Original False stop `IncompleteWeeklyLogRetrieval`; counting/render/AI/report draft Skipped. Cloud Failed is intentional, not a failed FI-04 result. |
| Baseline | November17 original unmanaged ZIP/hash preserved. **Predates later FI-02 main repair**; published action snapshots document the delta. Not an exact current-version full recovery export. Restore/import untested. |
| Handoff | Runbook/operator reference, admin/ownership/retention/adoption guidance and acceptance/Gate evidence map complete as documentation. Operational training, client approval and Gate pass are not claimed. |

[Failure-test evidence](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/README.md), [FI-04 publication fix/result](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/execution/fi04/fixture-fix/README.md), [preserved baseline](cases/driftless-inbox-triage/baselines/published-policy-v3-2026-11-17/README.md), [published FI-02 delta](cases/driftless-inbox-triage/evaluation/configuration/fi02-main-recovery-publication-2026-11-17/README.md).

## What is still open — no automatic work authorized

1. **Owner judgments:** v2 packet still has30 behavior/safety,14 reply-quality and7 Sales judgments pending. Usability/80% threshold/90% target remain unestablished. Weekly report's final wording judgment pending. Historical failed full30 cannot be made a pass by later targeted results or owner ratings.
2. **Unproven runtime coverage:** exact-ID/alternate-key enforcement/concurrency, live resend handling, weekly nonzero Edited/Rejected, pending no-draft review, changed final category, empty/date-boundary cases. FI-01..04 are completed scoped simulations; do not repeat them as unfinished tests.
3. **Current-policy/recovery acceptance:** no formal v3 acceptance; future scoring would require prospective effective/raw-priority treatment and a new preserved run. Original ZIP alone would revert the later FI-02 repair; current-version full package and actual restore are not proven. No repeat export/import authorized now.
4. **Measured benefit/adoption/client readiness:** no measured20% effort reduction, completed operating-cost scenarios, training sign-off/backup, real-client identity/permission/retention approvals or support agreement. Thirty-day tracking retention is a pilot policy; automatic enforcement not demonstrated.
5. **Gate2:** authoritative standard is16/20 with zero critical failures. Evidence map exists; no full Gate score/pass or market-conversation counts invented. Wider curriculum evidence must be reconciled before a Gate decision.

These are disclosure/decision items. Documentation completion does not assert a clean release or require an open-ended production-hardening effort. Preserve agreed thresholds and all failed runs.

## Guardrails and live identifiers

Environment `88301e40-6106-ee47-900c-67a24cbc121e`; lab mailbox `josh@joshmaurer.onmicrosoft.com`; existing solution BluffsideHandbookHelper `90a43d55-5bd9-f111-a05d-000d3a367f8a`; log `jdm_table1s`, row ID `jdm_table1id`.

Original main runtime `53209c07-ca63-bcd9-c7f3-04b29c1f562a`; weekly `5712f23d-44e0-f111-84ea-000d3a367f8a`; evaluator `9ca55e5e-afe0-f111-84ea-000d3a367f8a`. Shared classifier `614118d4-6ca8-4344-b945-8659eb8bb3d8`; other-category drafter `e9c13e46-ec62-4cd4-b52f-b2f596db5821`; explanation `93a1dc08-e7e4-484e-98c6-0da214657570`.

**Fault copies remain manual-only Published with faults installed:** triage `bca4414b-abe2-f111-84ea-000d3a367f8a` (FI-03 fixture/completion fault); weekly `b2c2285f-60e4-f111-84ea-000d3a367f8a` (FI-04 continuation fixture/model-safety tripwire). Never use as normal originals or add Inbox triggering.

No automatic send/forward/delete/archive/move/resolve, order change, shadow body archive or real-client rollout. Synthetic data only. Baseline/export dependency and working connections are settled; do not revisit them.

Explain purpose/result before changes; concise steps, actual live UI, exact labels rather than color. Stop unreliable browser control; no retry loops. Shared prompt saves have reset input references: any separately authorized future prompt edit must verify both flows' classifier/drafter inputs before publication.

GitHub is updated remotely; fast-forward `C:\Users\joshu\ai-automation-lab` before local repo work. Sync GitHub source in Claude Project before switching assistants. Recorded lab mailbox trial end: December8,2026; no new entitlement check or renewal authorized.
