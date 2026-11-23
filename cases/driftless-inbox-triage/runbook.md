# Driftless operator and administrator handoff

Updated November 19, 2026. **Synthetic, human-supervised SME prototype; overall release NOT_ESTABLISHED.** This guide documents existing behavior and a proposed operating routine. It does not authorize activation for real clients, tests, imports, sends, deletions or connection changes. No runtime work was performed to write it.

## Start here: three original flows and two fault copies

Lab owner/operator: **Josh Maurer**. Lab mailbox: `josh@joshmaurer.onmicrosoft.com`; environment `88301e40-6106-ee47-900c-67a24cbc121e`.

| Flow | Purpose and last verified state | Identifier |
|---|---|---|
| Driftless Inbox Triage | Published; Inbox-triggered triage, review markers, eligible unsent replies and log. Includes the November17 FI-02 structure-check repair. | Runtime `53209c07-ca63-bcd9-c7f3-04b29c1f562a`; solution workflow `094af357-1cdd-f111-84ea-000d3a367f8a` |
| Driftless Weekly Inbox Summary | Published; on-demand selected-week counts, AI explanation and unsent report. | `5712f23d-44e0-f111-84ea-000d3a367f8a` |
| Driftless Frozen 30 Evaluation | Published, manual isolated batch; captures results, without Outlook drafts or Dataverse writes. Not the Inbox processor. | `9ca55e5e-afe0-f111-84ea-000d3a367f8a`; older designer alias `b073b5f4-92ca-e6ad-e255-6a264c4891f0` |
| Driftless ISOLATED Failure Triage 2026-11-17 | Last verified manual-only Published; **FI-03 fixture, seeded review values and completion-write fault remain installed**. Do not run as normal triage or change to Inbox triggering. | `bca4414b-abe2-f111-84ea-000d3a367f8a` |
| Driftless ISOLATED Weekly FI-04 2026-11-19 | Manual-only Published; **continuation fixture and fail-before-model tripwire remain installed**. Do not use for a normal report. | `b2c2285f-60e4-f111-84ea-000d3a367f8a` |

These are recorded verification states, not a fresh live status check during this documentation session. Shared classifier/drafter/explanation IDs and connection references are preserved in the [baseline](baselines/published-policy-v3-2026-11-17/README.md). Do not rebuild flows or remap working connections to address a slow interface.

## Owner quick reference

**Purpose:** the workflow helps find messages needing attention and prepares drafts. **Expected result:** the owner still checks the message, makes business decisions and sends manually.

1. Review Inbox messages carrying **Needs Owner Review** and messages concerning existing-order changes. Every identified actual/proposed/conditional/question-form order change requires **Urgent + manager review**, regardless of timing. Recognition depends on classifier flags; a quiet marker is not proof that an order is safe to print.
2. Open the original message and any associated Outlook draft. Verify recipient, facts, approved pricing, missing details and attachment claims. The flow detects attachment presence; it does not inspect attachment content or order-production status.
3. For an eligible Support reply, the fixed acknowledgment is: “Thank you for your message. The owner will review your concern and confirm the next step.” It promises no diagnosis, refund, reprint, order change or completion.
4. In the existing Dataverse inbox-log record (`jdm_table1s`), locate the exact Message ID and verify it matches the original. Record the actual Review Outcome, Reviewed At and Final Category. Keep Follow-up Open according to unresolved business work. Accept/Edited/Rejected describes the owner's decision about an actual draft; it does not describe sending or order completion. Do not invent an accepted-draft outcome when no draft exists.
5. The owner may edit, reject or manually send after review. **Recording acceptance never sends.** No reply was sent as part of this handoff.

Final Category affects weekly grouping only after Reviewed At is recorded; otherwise the suggested category is used. Processing Outcome, Draft Created, review decision and Follow-up Open are distinct. Do not erase a Failed processing result merely because a draft exists or a human later reviewed it.

**Accepted limitation, unchanged:** a contact-only update may be misclassified as Support/change true and unnecessarily made Urgent; existing eligible Support acknowledgment routing can still apply. Josh accepted this conservative false positive. It grants no authority to change records/orders or send. See [exact policy](policy-v3-order-change-2026-11-16.md) and [limitations](limitations.md).

## Weekly report: operating procedure and count meaning

This is an operating reference, **not an instruction to run it now**. In the original weekly flow, the owner selects the Monday reporting date; the input key is `date`, format YYYY-MM-DD. Central-time midnight boundaries are converted separately to UTC, start inclusive/end exclusive. The flow reads metadata, checks completeness and then creates an **unsent owner-review Outlook draft**.

| Column | What it counts |
|---|---|
| Category | Recorded Final Category after owner review; otherwise suggested category; null falls back to Unknown. Six categories include zero counts. |
| Processed | Completed or Possible Resend rows. Failed/in-progress rows are excluded. |
| Accepted unchanged / Edited / Rejected | Corresponding recorded review outcome AND an actual draft. These may include a draft whose later processing failed. |
| Awaiting owner review | Processed + Pending + (Draft Created OR Needs Owner Review). Includes eligible no-draft review cases. |
| Follow-up Open | Separate business-work state; not itself the report's pending-review test. |

Check the dates, all six count rows and AI explanation before manually sharing. AI receives dates and calculated aggregates; it does not calculate totals or establish revenue, sent replies, completed orders or time savings. The WS-02 report remains unsent and awaits Josh's final wording judgment.

If retrieval reaches the 100000-row limit or returns a continuation link, the original False branch stops with **IncompleteWeeklyLogRetrieval** and creates no report. In FI-04, the run's **Failed** label was expected: the Terminate action successfully issued that deliberate stop, while the enclosing Condition displayed Cancelled/Terminated. Counting, AI and draft actions were Skipped. Do not confuse this with a failed guard test. This proves only the [simulated continuation check](evaluation/failure-testing/isolated-2026-11-17/execution/fi04/fixture-fix/README.md), not a large-volume retrieval boundary.

## Failure monitoring and manual recovery

Proposed lab routine: before relying on a session's drafts, inspect main-flow run history, review-marked Inbox messages and Failed/in-progress tracking rows. When preparing a weekly report, investigate its stopped/failed run before relying on totals. This is an operator routine, **not an installed alert, scheduled monitor or support service**.

| Symptom | Existing behavior and operator response |
|---|---|
| Classifier unavailable/action failure or malformed structure | Main has the published type check plus review/failure recovery. FI-01 and FI-02 repair passed separate simulations. Inspect actual marker and same-row log; do not assume recovery always succeeds. |
| Completion log fails after a draft exists | Independent marker and minimal same-row failure update attempt recovery; FI-03 preserved Draft Created true and existing human-review values. Check Outlook for the actual draft before any replay. |
| Review marker or failure logging also fails | Treat as unresolved; record the run ID and original Message ID, inspect original/draft manually, and involve the administrator for access/connector failure. No automatic alert or guaranteed recovery is established. |
| Weekly run stops for incomplete retrieval | No report should be produced. Preserve the stop/run evidence; investigate retrieval with the administrator rather than sending partial counts or disabling the guard. |
| Missing/duplicate/unexpected draft, wrong recipient, missed order change or unsafe content | Pause reliance on automation, handle the message manually, preserve evidence and disable the affected original flow if needed. Do not delete evidence, retest automatically or broaden prompt wording while diagnosing. |

Do not press Resubmit to prove a failed case again. A failed run can already have created an Outlook draft or Start log. Match exact Message ID, correlation/run ID, existing log and draft before any separately approved replay. Exact-ID lookup/alternate-key enforcement under concurrency and live resend behavior remain unproven; do not promise exactly-once processing.

### Disable and recover

**Purpose:** stop new automation while retaining original messages and evidence. **Expected result:** manual Inbox handling continues while the cause is investigated.

For an actual incident, an authorized owner/admin opens the **affected original flow's details**, checks its name/ID against the inventory, uses its available **Turn off** control and verifies status **Off**. Stopping a trigger does not establish that already-running instances have ended; inspect active runs separately. Stop using report output too if its source data is unreliable. Do not disable unrelated flows or shared connections casually. No shutdown drill was performed for this handoff.

Preserve run IDs, error text, log/draft identities and the configuration revision. Continue triage and customer replies manually. Before re-enabling, the owner/admin confirms the root cause, approved correction, input references, connection ownership and possible duplicate side effects. Any new repair/retest requires its own bounded authorization.

The [November17 baseline ZIP](baselines/published-policy-v3-2026-11-17/README.md) is preserved **before the later FI-02 main repair**. [Published repair snapshots](evaluation/configuration/fi02-main-recovery-publication-2026-11-17/README.md) document that delta; they are not a complete new export. Restoring the original ZIP alone would revert that repair. Restore/import has not been demonstrated. Follow the existing recovery notes in an isolated environment only when separately authorized; do not import over the working solution. The mixed-solution/dependency boundary is already documented and needs no renewed investigation.

## Ownership, access and data handling

| Responsibility | Lab owner / real-client responsibility |
|---|---|
| Business policy, urgency, final category, replies, acceptance and stop decision | Josh in the lab; designated client process owner for a real pilot. No real-client owner has been appointed. |
| Daily review and manual fallback | Josh in the lab; named trained primary and backup reviewer before real use. Backup not assigned. |
| Tenant identity, connector scopes, consent, security policies, licensing, retention/deletion and access revocation | Client M365 administrator/IT provider; role dependency documented, no real-client approvals established. |
| Configuration changes and incident repair | Authorized maintainer with owner approval; preserve/export before risky changes and verify both prompt input references after any shared prompt save. No ongoing support contract or response-time commitment exists. |

The workflow's lack of a Send action is a behavior boundary, **not proof that connector permissions exclude sending**. Existing Outlook/Dataverse connections were retained. Before real use, administrator approval must establish least privilege, data-processing permission, role boundaries and ownership transfer; use [admin questions](admin-questions.md). Do not add grants or change credentials merely to finish this case.

Inbox normalization/classification can process message body content; personal/sensitive flags are not a guaranteed pre-model redaction layer. Draft-blocking and minimized operational logs do not prove that sensitive content never reaches a model. Only synthetic data is authorized for this demonstrated case.

Keep original messages/drafts in Outlook under approved mailbox rules. Do not create a shadow archive of bodies/attachments in tracking. Pilot tracking retention is **30 days after processing** in the charter; automatic purge/enforced retention was not demonstrated. The owner/admin must arrange and verify authorized retention/deletion before real use. Nothing is deleted during this closeout. Preserve synthetic frozen inputs and failed evaluation records as portfolio evidence; cloud run history is not a permanent archive.

The recorded Business Basic trial ends **December 8, 2026**. This is an existing lab-access assumption, not a live licensing check. Renewal, current entitlements, AI capacity/cost, tenant policy and ownership are not established for a client. No purchase or extension is authorized here.

## Adoption and measurement handoff

Suggested orientation using **existing evidence**, without running tests: show one saved quote draft, one owner-review/no-draft case, the fixed Support acknowledgment, WS-02 and FI-04's deliberate stop. Have the operator explain who sends, how to record review vs follow-up, and how to stop and fall back manually. Training delivery, independent operator use and backup coverage have **not** been demonstrated. No buyer feedback or training sign-off is invented.

Measured evidence available:

| Evidence | Observed result; interpretation |
|---|---|
| Frozen v1 | 25/30 primary; 26/30 exact category, 27/30 review, 28/30 priority; FAIL. |
| Frozen policy v2 | 27/30 primary; 28/30 category, 30/30 review, 29/30 priority; FAIL due to missed DRI-12 urgency. Fourteen replies: nine AI, five fixed Support. |
| Order-change v3 targeted E | 4/5 exact; 3/3 tested order-change outcomes. Contact-control false positive accepted; no new formal v3 score or runtime/generalization claim. |
| Owner draft quality / Sales pricing | All v2 owner judgments pending: 30 behavior/safety, 14 reply quality and 7 Sales checks. Usability, 80% threshold and 90% target not established. |
| Normal workflow/report | LOG-02 and WS-01/02 passed their documented limited cases. REVIEW-01 remains an automatic-logging failure with assisted recovery. |
| Failure checks | FI-01 scoped PASS; FI-02 original FAIL plus separate repair PASS; FI-03 scoped PASS; FI-04 scoped PASS. See [failure evidence](evaluation/failure-testing/isolated-2026-11-17/README.md). |
| Rates and slices (v2, offline) | Missed urgent 1/7, false urgent 0/23, required review missed 0/23, forbidden draft 0/16, review rate 23/30. [Full table](evaluation/README.md#rates-and-slice-analysis--policy-v2-computed-november-23-2026). |
| Effort and latency | Manual-vs-assisted effort reduction not measured. Batch about 2.5 s per message; one live Inbox-to-log run 15 s. Single observations, not an SLA or productivity estimate. |
| Operating cost | Desk scenarios below; assumptions, not measured spend. |

For a later separately approved pilot, measure comparable manual and assisted sorting/reply work, including review, corrections and recovery: reduction = (manual total - assisted total) / manual total. Retain observed minutes, workload and exclusions. The charter's 20% reduction is a target, **not an achieved result**. Actual usage/cost and license assumptions must be recorded rather than guessed. No measurement or new evaluation is authorized by this guide.

### Operating-cost scenarios (desk estimate, November 23, 2026)

**Purpose:** give a client an explicit range for what this design would cost to run each month. These are assumptions to confirm with the client's Microsoft 365 administrator or reseller, not measured spend. Prices change; recheck on the day of purchase.

**Licensing facts (checked November 23, 2026):**
- Power Automate Premium lists at **$15 per user/month** (paid yearly). This design needs it: the flows use Dataverse and AI Builder prompts, both premium. One license for the person who owns the flows.
- AI Builder credits are no longer seeded in new or renewed Premium licenses from **November 1, 2026**. Prompt runs then draw on **Copilot Credits**, at $0.01 per credit pay-as-you-go. If no credits are available, the prompt step is blocked. The classifier-failure path then applies: owner review, no draft (see FI-01).
- Rates per 1,000 tokens: basic model tier **0.1 credit**, standard tier **1.5 credits**. The classifier displays GPT-4.1 mini. Confirm its rate tier in the admin center; both tiers are shown.
- Mailbox: assumed to already exist. If not, Business Basic was **$8.40/month** month-to-month at Josh's November 9 checkout.

**Volume and usage assumptions:**
- Low: 15 messages per business day. Base: 40. High: 100. Each assumes 22 business days per month.
- About 4,000 tokens per message. This covers the classifier (about 7.8k characters of instructions plus email and output) and the drafter on roughly a third of messages (9 of 30 in v2), rounded up.
- The weekly report call is negligible.

| Scenario | Messages/month | AI tokens | AI cost (basic tier) | AI cost (standard tier) | Monthly total, basic | Monthly total, standard |
|---|---|---|---|---|---|---|
| Low | 330 | 1.3M | $1.32 | $19.80 | **$16** | **$35** |
| Base | 880 | 3.5M | $3.52 | $52.80 | **$19** | **$68** |
| High | 2,200 | 8.8M | $8.80 | $132.00 | **$24** | **$147** |

Totals are the $15 Premium license plus AI usage, on top of the existing mailbox.

**Excluded:** setup and implementation fees, maintainer time, owner review time, a support agreement, taxes, extra Dataverse capacity (tracking rows are assumed to fit the included entitlement), and any n8n alternative. The Week 6 [platform comparison memo](../rivertown-lead-intake/platform-comparison-memo.md) still covers n8n versus Power Automate licensing.

**Reading:** the license, not the AI, dominates at basic-tier rates. The model's rate tier is the largest uncertainty, roughly a 15× swing in the AI line. The administrator must also arrange Copilot Credit billing, or the AI steps stop.

### Incident tabletop (desk exercise, November 23, 2026)

**Purpose:** walk through two plausible incidents using only the existing runbook, and find the gaps before a real one does. No flow was disabled, run or changed; this is a written exercise. Status key: **Implemented** = built and evidenced; **Procedure** = documented, not drilled; **Recommended** = not in place.

**Scenario A — incorrect classification.** A customer writes "STOP, wrong phone number on the proof, don't print." The system marks it Routine, as it did in DRI-12, and the job prints.

| Step | Response | Status |
|---|---|---|
| Detection | Message still carries Needs Owner Review (DRI-12 did), so it is in the review queue but not marked Urgent. Owner notices on review, or the customer calls. | Implemented (review marker). No urgency alert: Recommended. |
| Owner | Process owner (Josh in the lab). | Procedure |
| Immediate action | Handle the message manually; contact the customer by phone; stop relying on priority markers until the cause is known. A single miss does not require turning the flow off; a repeated pattern does. | Procedure |
| Evidence | Run ID, exact Message ID, the tracking row, the classifier output (priority, confidence, flags). Preserve; do not resubmit. | Procedure |
| Communication | Owner speaks to the customer directly. No AI-drafted apology. | Procedure |
| Recovery | The v3 order-change rule (Urgent + review for any existing-order change) is the candidate fix. Published, but only targeted-tested (3/3), with no full-set acceptance. Add the incident as a new versioned test case; never edit the frozen set. | Implemented (v3 rule). Formal acceptance: not established. |

**Scenario B — sensitive data exposure.** A customer emails a card number or personal details to the shop inbox.

| Step | Response | Status |
|---|---|---|
| Where the data goes | The body goes to the AI Builder model for classification. The sensitive flag should block any draft. By charter design, the tracking log keeps the Message ID and review fields, not the body. Power Automate run history keeps action inputs and outputs for 28 days, visible to flow owners. Whether secure inputs/outputs are enabled on these actions was **not verified**. | Draft block: Implemented (tested in frozen set). Run-history exposure: open gap. |
| Owner | Process owner plus the Microsoft 365 administrator. | Procedure |
| Immediate action | Do not reply with or forward the data. Handle the message manually. Ask the administrator about run-history visibility and mailbox retention. | Procedure |
| Disable | Turn off the main flow only if sensitive content is reaching drafts or logs as a pattern. Use the Disable steps above. | Procedure (not drilled) |
| Communication | Whether customer notification is required is the business owner's decision, with advice. This prototype makes no legal determination. | Out of scope |
| Recovery | Before any real use: enable secure inputs/outputs on actions that carry message bodies; DLP policy and data-processing approval from the administrator. | Recommended, not implemented |

**What the tabletop found:**
- There is no urgency alert beyond the review marker.
- Run-history exposure of message bodies has not been checked.
- The disable path is documented but has never been drilled.
- None of these is fixed by this closeout. They are listed as limitations and real-use prerequisites.

### Gate 2 and remaining acceptance

The authoritative *AI Implementation Consultant - 12-Week Master Calendar* (verified September1,2026), section “Gate 2 - End of Week 8,” requires **at least 16/20 and zero critical failures**, using 0 absent / 1 partial / 2 demonstrated. This closeout provides a dossier map, not a fabricated Gate score:

| Gate area | Available evidence / unresolved boundary |
|---|---|
| Cross-platform reasoning | Prior n8n case exists; same-contract equivalence/access-blocker demonstration not adjudicated here. |
| Data model | Charter, field/key mapping, review semantics, minimization and retention decisions documented; retention enforcement not proven. |
| Permissions | Admin questions/role boundaries documented; real-client grants and permission verification unresolved. |
| Deterministic controls | Type validation/review rules documented and bounded recovery verified; exact-ID/concurrency/live resend still unproven. |
| LLM quality | Frozen30 and thresholds/results preserved; formal FAILs, pending owner ratings and no formal v3 acceptance remain. |
| Security | Adversarial smoke evidence and safety rules documented; no comprehensive security or real-client approval claim. |
| Reliability | Isolated failure/recovery evidence plus shutdown/restore procedure; real outages, retry limits and restore remain unproven. |
| Cost and licensing | Lab/trial assumptions identified; low/base/high operating-cost and licensing scenarios not completed in this handoff. |
| Adoption and handoff | This guide/admin questions/role matrix now exist; training delivery, backup assignment and support agreement unresolved. |
| Market evidence | Required five operator conversations, two confirmed pains and one pilot-design/buyer-feedback conversation are not established by this case's evidence; do not infer counts from build activity. |

**Gate 2 NOT SCORED / PASS NOT ESTABLISHED.** The original formal critical failure remains historical fact; later targeted policy changes cannot make that unchanged run pass. Do not silently weaken criteria or retest to complete paperwork.

Remaining work is now a disposition list, not an automatic build queue: owner quality/weekly-wording judgment; unproven exact-ID/concurrency/live resend and weekly Edited/Rejected/no-draft/final-category/empty/date-edge cases; current-version recovery package/restore boundary; effort/cost/adoption/market evidence and formal Gate decision. Those require owner decisions and, where relevant, separately authorized evidence collection. Documentation is complete for the present bounded prototype; routine client deployment is not approved.
