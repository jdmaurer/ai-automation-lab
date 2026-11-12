# CURRENT STATE - updated 2026-11-12 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Resume point (2026-11-12, morning)

Week 8 technical build is in progress. Active case: `cases/driftless-inbox-triage/`.

The Power Automate flow `Driftless Inbox Triage` remains the same working published checkpoint from 2026-11-11. No flow logic was changed on 2026-11-12. It is not release-ready and the full frozen 30-message evaluation has not been run.

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

### Observed defect to fix next

A real Microsoft Power Automate notification email (`2 of your flow(s) have failed`) reached Inbox, was classified General, and caused an unnecessary reply draft.

The narrow requirement is now clear:
- Do not reclassify the inbox or move/delete/archive messages.
- Do not patch only one Microsoft sender.
- Obvious automated/system/vendor/marketing informational messages that do not call for a human reply must not create an ordinary reply draft.
- The likely existing control is `draft_candidate=false`; inspect the current classifier prompt before deciding the smallest wording change.
- The real Microsoft message from 2026-11-11 is evidence of the defect. A synthetic "automated notification / do not reply" message can verify the rule; it does not need to impersonate Microsoft.

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

### Browser/tooling issue found 2026-11-12

The normal Chat browser connector could read Outlook fully, including the real Microsoft Power Automate failure email, but Power Automate's center workspace became inconsistently exposed: the reader could see the shell/left navigation while Josh could see the actual center content.

New permanent guidance was added to `ASSISTANT_WORKING_CONTEXT.md`:
- read the live browser tab before browser directions;
- every click direction identifies screen region first;
- do not ask Josh to relay page state the browser can already read;
- if the connector cannot expose the actual page state, say so and do not guess.

For the next Power Automate build session, use ChatGPT Work in the current ChatGPT desktop app if available. OpenAI's current desktop app combines Chat, Work, and Codex. Work is the preferred mode for this browser-heavy Power Automate/Outlook task; Codex remains the better fit for repository/code/terminal work. In the desktop app, Work can use the built-in browser where Josh and ChatGPT can see the same page.

### Exact next session start

1. Start from this file and the active Driftless case files.
2. Use ChatGPT Work in the desktop app if available.
3. Open Power Automate and Outlook in Work's built-in browser and confirm the assistant can actually read the center Power Automate workspace before giving build directions.
4. Inspect `Driftless Inbox Classifier` without changing or saving it.
5. Make the smallest change needed so obvious automated/non-replyable informational mail yields no ordinary reply draft, using existing fields if possible.
6. After any prompt save, immediately inspect the linked `Run a prompt` input wiring before publishing.
7. Continue remaining required normal controls: correlation ID, review/audit logging, duplicate/resend protection, feedback capture, and weekly-summary path as required.
8. Build/use a repeatable harness for the frozen 30.
9. Export/preserve the finished normal baseline before deliberate break tests.

### Open items

- Automated/non-replyable mail draft suppression.
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
