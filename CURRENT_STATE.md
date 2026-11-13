# CURRENT STATE - updated 2026-11-13 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Resume point (2026-11-13, morning, approximately 10:30 Central)

Week 8 technical build remains in progress: `cases/driftless-inbox-triage/`.

On November 12, the shared AI Builder classifier prompt was saved with the general automated-mail draft suppression rule. Three targeted prompt-only tests passed. The linked Run a prompt input was immediately inspected and remained wired to `outputs('Normalize_-_Email_Fields')` (visible Body chip).

The flow was saved as a DRAFT, but Publish failed with a broken connection for `Trigger - New Inbox Email`. A broad Microsoft 365 service degradation was subsequently observed on the official status page. Do not assume a configuration defect before checking recovery. Josh reports on November 13 that Outlook now opens after being down for the rest of November 12.

The last successful flow publication remains November 11. However, the shared classifier prompt was saved November 12, so do not claim its live behavior is wholly unchanged. No end-to-end automated-mail regression or full frozen 30 evaluation has passed yet.

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

Important implementation gotchas:
- Comparing AI confidence to plain `0.8` produced a Float/String runtime error. Threshold uses `float('0.8')`.
- Editing/saving a shared AI Builder prompt can reset linked Power Automate action input wiring. After every prompt save, inspect the associated `Run a prompt` / drafter inputs before publishing.
- One combined owner-review expression became malformed as `@/@{...}`; direct field replacement fixed it.
- Publish is stricter than Save draft; action-name issues can surface only at Publish.

### Live tests already passed

Four representative end-to-end Outlook smoke tests passed on 2026-11-11:
1. DRI-01 standard yard signs.
2. DRI-07 permanent storefront sign with prompt injection.
3. DRI-03 urgent banner needed tomorrow.
4. DRI-04 500 business cards with attachment.

These are smoke tests only, not the frozen 30-message evaluation.

### Automated-mail fix and tests completed November 12

Added under the existing classifier section `Set draft_candidate to false for:`:
`- automated/system notifications, vendor notices, receipts, newsletters, or marketing messages that do not call for a human reply`

No taxonomy change or sender-specific patch. Three AI Builder prompt-only tests passed:
- AUTO-01 informational automated usage report: General/Routine, draft_candidate false.
- AUTO-02 same sender with a real vendor question: General/Routine, draft_candidate true.
- AUTO-03 automated failed-job alert with a real deadline: General/Urgent, draft_candidate false.

Inputs and observed results are in test-cases.md. These do not prove Outlook end-to-end behavior. Prompt Save was confirmed; wiring inspection followed immediately. A redundant literal email_record line survived alongside the dynamic input chip; do not redo the prompt for that cosmetic issue.

### Outage troubleshooting: preserve evidence, avoid repeating detours

Publish error: `You have a broken connection for 'Trigger - New Inbox Email'. Please fix connection.`

- Trigger's existing Outlook connection reference appeared disabled/unselectable in Change connection.
- Underlying `Outlook - jdmaurer Labs` connection showed Connected and listed Driftless Inbox Triage as using it. Healthy connection ID: `shared-office365-b5c0547a-cd9e-4973-99cb-d7aa40ff6718`.
- Save/reload and Publish retry did not fix it.
- Existing Bluffside Handbook Helper solution has two Outlook references: `new_sharedoffice365_9a16a` points at another connection; `new_sharedoffice365_a7390` points at Outlook - jdmaurer Labs. Which reference the trigger actually uses was NOT established. Trigger code's shared_office365 is an alias, not proof.
- No reference was changed or deleted. Do not speculate that the first reference should be changed/deleted.
- Switching to classic required removing or publishing the saved draft. Dialog was cancelled; no draft removed or classic switch completed.
- Attempt to add connection `Outlook - Driftless` stalled, then failed: `Failed to create OAuth connection: ClientError: Test connection failed. Details: An unexpected error occurred.` Cancelled; no replacement connection confirmed.
- Outlook refresh then hung. Official status.cloud.microsoft showed broad Microsoft 365 degradation including Exchange Online on November 12. This was consistent with the failures; exact causality was not proven.
- The solution-export dependency warning was not resolved and must not be revisited now.

### Testing and preservation order decided 2026-11-12

Josh explicitly wants to keep building instead of spending more time on export packaging now.

Order from here:
1. Finish the remaining normal build without deliberately breaking the working flow.
2. Test each normal addition as it is made.
3. Run the repeatable frozen 30-message evaluation; do not hand-compose 30 Outlook messages.
4. Fix ordinary defects found by the frozen evaluation.
5. Preserve/export the finished working baseline and put the recoverable artifact in the repo.
6. Only after that, run isolated deliberate failure tests such as model unavailable and wrong schema.
7. Finish governance/adoption handoff and Gate 2 evidence.

Do not inject deliberate failure into the only working version before step 5.

### Exact next session start

1. Read live GitHub CURRENT_STATE.md first, active case files, AI_HANDOFF_PROTOCOL.md and ASSISTANT_WORKING_CONTEXT.md.
2. Inspect current live browser and Microsoft service health before directing Josh. Confirm the actual Power Automate center workspace is readable; if not, say so immediately.
3. Inspect saved flow draft and current trigger connection state after recovery. Check for any partial new connection before creating another. Use current evidence rather than repeating yesterday's detours.
4. Resolve any remaining connection problem, then publish the saved normal draft. Do not discard draft changes.
5. Run a targeted synthetic end-to-end automated-mail regression with supplied test data. Confirm no ordinary reply draft, while attention-worthy alerts still receive required owner attention.
6. Continue required normal controls: correlation ID, audit/review log, duplicate/resend protection including DRI-10/DRI-15, feedback capture, required weekly-summary path.
7. Build/use the repeatable frozen-30 harness once the normal processing contract is settled; fix ordinary defects.
8. Preserve/export finished normal baseline before isolated deliberate breaks.

### Teaching and pacing

Read the live page after navigation. Every click direction begins with whole-screen region, then exact visible label. State purpose and expected result; give one instruction at a time except routine steps without a decision.

For prompt edits, supply a full copy/paste replacement. Do not make Josh search two pages for shorthand such as draft_candidate=false; the actual old heading was near the bottom and that poor direction wasted several minutes. If locating text is necessary, give exact beginning and location.

Check service health early when both OAuth/connector operations and Outlook fail. Do not spend another session on speculative connection fixes during a service outage. No log/harness implementation was done November 12. Harness implementation before the remaining contract settles risks rework; review logging is required work and is not inherently wasted. Do not claim either certainty of rework or certainty that retries will fix things.

Do not start Intermediate Python. Track independent versus assisted work honestly.

### Open items

- End-to-end verification of saved automated/non-replyable mail prompt fix; prompt-only tests passed.
- Duplicate/resend protection, including DRI-10 / DRI-15.
- Correlation ID and audit/review logging.
- Feedback capture.
- Full frozen 30-message evaluation and results.
- Weekly summary path and exact-count verification if not yet implemented.
- Clean solution/workflow export and repository copy after the normal build passes.
- Model-unavailable and wrong-schema verification after preserved baseline.
- Runbook/operator quick reference.
- Governance/adoption handoff, metrics, and Gate 2.

### Time / scope note

Week 8 is materially over budget. Add work only when required by Week 8, needed to fix an observed defect, or needed to pass frozen acceptance criteria. Avoid another all-day navigation/debugging session.
