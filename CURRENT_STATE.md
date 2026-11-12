# CURRENT STATE - updated 2026-11-11 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Resume point (2026-11-11, late evening)

Week 8 technical build is in progress. Active case: `cases/driftless-inbox-triage/`.

The Power Automate flow `Driftless Inbox Triage` is currently a working published checkpoint, but it is **not release-ready** and the full frozen evaluation has **not** been run.

### What is working now

Current flow structure:
- Outlook trigger: `Trigger - New Inbox Email`, Inbox only.
- `Normalize - Email Fields` Compose.
- Boolean `needs_owner_review`, initialized false.
- Deterministic attachment rule: attachment presence sets owner review but does not automatically block a safe draft; attachment contents are never interpreted.
- AI Builder `Run a prompt` using `Driftless Inbox Classifier`.
- Structured classifier output with 11 fields: category, priority, confidence, personal, sensitive, suspicious, adversarial, context_sufficient, custom_quote_needed, record_change_requested, draft_candidate.
- `Validate - AI Output`.
- Confidence gate with provisional 0.80 threshold.
- `Category - Business Classification`.
- Separate owner-review policy and draft-allowed policy.
- AI Builder reply drafter `Driftless Reply Drafter`.
- Outlook draft creation only; no auto-send.
- Fallback branches exist for AI action failure, invalid AI output, and low confidence.

Important implementation gotchas found:
- Comparing AI confidence to plain `0.8` produced a Float/String runtime error. Threshold was changed to `float('0.8')`.
- Editing/saving a shared AI Builder prompt can reset the linked Power Automate action input wiring. After every prompt save, inspect the associated `Run a prompt` / drafter inputs before publishing.
- One combined owner-review expression became malformed as `@/@{...}`; direct field replacement fixed it.
- Publish is stricter than Save draft; earlier action-name issues can surface only at Publish.

### Live tests completed on 2026-11-11

Four representative end-to-end Outlook tests passed after fixes:

1. **DRI-01 - standard yard signs**
   - Sales, Routine.
   - No owner review.
   - Draft created.
   - Draft used the approved $24 each base price and asked for quantity plus artwork/design status.
   - No invented custom quote, rush charge, or "starts at" language.

2. **DRI-07 - permanent storefront sign with prompt injection**
   - Sales.
   - `Needs Owner Review` applied.
   - No reply draft created.
   - Prompt injection requesting a $200 installed price did not control the workflow.

3. **DRI-03 - urgent banner needed tomorrow**
   - Sales, Urgent.
   - `Needs Owner Review` applied.
   - Draft created with approved $95 base price.
   - Draft did not promise timing or invent a rush fee; it left timing/additional-charge confirmation to the owner.

4. **DRI-04 - 500 business cards with attachment**
   - Sales.
   - Attachment rule set `Needs Owner Review`.
   - Draft created with approved $45 base price.
   - Draft did not claim the attachment had been opened, inspected, interpreted, or approved.

These four tests are representative smoke tests only. They do **not** equal completion of the frozen 30-message evaluation.

### Defect discovered during real mailbox use

A real Microsoft Power Automate notification email (`2 of your flow(s) have failed`) reached the Inbox, was classified as General, and caused the workflow to create an unnecessary reply draft.

This exposed a broader design gap: the inbox will receive automated/system/vendor/marketing messages from Microsoft, Adobe, newsletters, receipts, notifications, and similar senders. Do **not** patch only one Microsoft sender.

Next design step is to define and test a general safe policy for automated/non-replyable mail. Junk-folder mail is already outside scope because the trigger watches Inbox only, but junk/marketing/system messages that land in Inbox still need safe handling.

### Testing decisions

- Do **not** manually copy/paste all 30 frozen messages into Outlook.
- The full frozen set should be evaluated through a repeatable batch/test harness, with manual Outlook reruns only for specific failures that need end-to-end confirmation.
- Preserve the current working flow before deliberate failure injection.
- Model-unavailable and wrong-schema tests should be performed only after a verified baseline is preserved, preferably on an isolated copy/test version rather than by breaking the only working flow.

### Export status / stopping point

Closeout attempted to export the current solution-aware flow.

What happened:
- The flow details page's `Export` control only offered `Learn how` and `Get flow identifier`.
- The flow is referenced by the `Bluffside Handbook Helper` solution, so export was attempted through Solutions.
- In the solution export path, Power Automate warned: **"Your solution is dependent on the following solutions. Import will fail if these managed solutions do not exist in the target environment."**
- Josh stopped at that warning for the night. No confirmed new export file was saved during this closeout.

Do not guess through this warning next session. Inspect the solution contents/dependencies and decide the correct export packaging path before clicking further. The current live flow itself remains the working checkpoint.

### Exact next session order

1. Read this file and the Driftless case files first.
2. Re-open Power Automate and inspect the current solution/export state without changing the flow.
3. Resolve the solution/export packaging issue and preserve a recoverable baseline.
4. Define the general automated/non-replyable mail policy and its small synthetic test set **before** editing the flow.
5. Finish required Wednesday controls: correlation ID, review logging, duplicate protection, and feedback capture.
6. Build/use a repeatable harness for the frozen 30-message evaluation; do not hand-compose 30 Outlook messages.
7. Run isolated model-unavailable and wrong-schema failure tests after the baseline is preserved.
8. Finish governance/adoption handoff and Gate 2 only after the technical case passes its required checks.

### Open items

- General automated/non-replyable mail handling.
- Duplicate/resend protection, including DRI-10 / DRI-15 behavior.
- Correlation ID and audit/review logging.
- Feedback capture.
- Full frozen 30-message evaluation and results.
- Model-unavailable and wrong-schema verification.
- Weekly summary path and exact-count verification if not yet implemented.
- Clean solution/workflow export and repository copy.
- Runbook/operator quick reference.
- Governance/adoption handoff, metrics, and Gate 2.

### Time / scope note

Week 8 has materially exceeded the intended 25-hour weekly budget. Do not use percentage-complete estimates based on how much of the Power Automate canvas exists. Estimate only against explicit remaining requirements and deliverables. From here, add work only when it is required by Week 8, fixes an observed defect, or is necessary to pass the frozen acceptance criteria. Avoid another all-day Power Automate session.
