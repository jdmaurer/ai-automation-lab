# Driftless Print and Sign — Inbox Triage

Updated November 19, 2026. **Published, evaluated synthetic prototype; overall release NOT_ESTABLISHED. Essential handoff documentation complete.**

Driftless is a fictional owner-operated print/sign shop. This Microsoft 365 prototype classifies Inbox messages, flags owner review, prepares eligible **unsent** reply drafts and produces an on-demand weekly activity report. The owner makes business decisions and sends manually. Attachments and production/order status are not inspected; no automatic send, order change, delete, move or archive is authorized.

## Start here

- [Operator/administrator runbook](runbook.md): flow inventory, review/report procedures, failures, disable/manual fallback, recovery boundary, roles, retention, adoption and Gate 2 evidence.
- [Current session baton](../../CURRENT_STATE.md): verified state and exact stopping point.
- [Charter](charter.md), [administrator questions](admin-questions.md), [limitations](limitations.md) and [append-only decisions](decisions.md).
- [Accepted order-change policy v3](policy-v3-order-change-2026-11-16.md): identified existing-order changes require **Urgent + manager review** regardless of timing. Contact-only over-escalation is an accepted noncritical limitation, unchanged.
- [Approved synthetic pricing](approved-price-sheet.md), [frozen30 evaluation](evaluation/README.md), [test history](test-cases.md).

## What the evidence establishes

| Workstream | Current evidence and boundary |
|---|---|
| Main triage | Published; four representative live smoke cases, AUTO-01 and LOG-02 passed. REVIEW-01 remains an automatic-logging failure with assisted recovery. |
| Repeatable frozen30 | Isolated helper published; v1 FAIL25/30 primary, policy-v2 FAIL27/30 despite meeting the numeric target because DRI-12 urgency was missed. Neither result is relabelled by later changes. |
| Current order-change v3 | Published main/helper override, inputs verified; targeted E4/5 exact and3/3 tested order changes, with accepted contact false positive. No formal v3 full-set acceptance established. |
| Weekly summary | WS-01/WS-02 passed the two-record week, calculated counts, AI explanation and one unsent report draft. Josh's final report-wording judgment remains pending. |
| Isolated failure checks | FI-01 scoped PASS; original FI-02 FAIL preserved plus separate repair PASS and published main repair; FI-03 scoped PASS; FI-04 scoped PASS. [Exact evidence and simulation bounds](evaluation/failure-testing/isolated-2026-11-17/README.md). |
| Baseline/recovery | [Original solution ZIP and hashes preserved](baselines/published-policy-v3-2026-11-17/README.md); predates the later [FI-02 main repair](evaluation/configuration/fi02-main-recovery-publication-2026-11-17/README.md). Import/restore untested; repair snapshots are not a new full export. |
| Handoff | Operating guide, admin questions, roles, retention boundary, manual fallback, measurement status and Gate 2 evidence map now documented. Training delivery and client approvals are not implied. |

FI-04's cloud **Failed** status is the intended incomplete-retrieval stop: `IncompleteWeeklyLogRetrieval`, with counting, AI and report drafting Skipped. It is a scoped acceptance PASS. Historical failed tests remain FAIL in their original records.

## What remains open

Owner judgments are still pending: policy-v2 behavior/safety, 14 reply-quality and7 Sales checks, plus final weekly-report wording. No draft-usability or quote-compliance percentage is invented.

Exact-ID/alternate-key/concurrency and live resend behavior remain unproven. Normal weekly coverage beyond the tested two-record week remains incomplete: nonzero Edited/Rejected, pending no-draft review, changed final category, empty/date boundaries. Failure tests are simulations, not proof of real provider/database outages or high-volume pagination. No new tests are authorized by this closeout.

Formal current-policy acceptance, current-version full recovery package/restore demonstration, measured effort reduction, operating-cost scenarios, operator training/backup, real-client admin approvals and broader Gate 2 market evidence remain unresolved. **Gate 2 pass is not established.** These are disclosed limits and owner decisions, not permission to reopen a build/tuning cycle.

The lab mailbox's recorded trial end is December8,2026; current entitlements are not newly checked. The prototype is portfolio evidence of supervised implementation and evaluation, not a production-readiness or client-deployment claim.
