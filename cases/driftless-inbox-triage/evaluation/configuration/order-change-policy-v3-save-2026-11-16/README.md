# Order-change policy v3 — accepted limitation, saved drafts

Josh explicitly authorized saving the existing candidate with the contact-update false positive documented as a limitation, verifying both flows' inputs/saved status and updating GitHub. **No more tests.**

## Saved configuration

- Shared classifier candidate E saved; reopened from the service and compared against the tested candidate. Normalized wording matches, with one intact dynamic email_record token. This shared prompt save applies wherever the prompt is used.
- Main flow **saved as Draft** with banner confirmed, checker **0 errors /0 warnings**. Only completion log's priority mapping changed: Support + record_change_requested=true => Urgent numeric choice; otherwise retain existing priority. Other completion fields unchanged.
- Helper **saved as Draft** with banner confirmed, checker **0 errors /0 warnings**. Only collected effective priority and policy/revision metadata changed. Raw classifier output remains separate, and parser/review/draft gates, fixed Support body and connections are unchanged.
- Both classifier action IDs/email_record expressions and both non-Support drafter IDs/email_record/classification_record expressions verified intact. Shared prompt Save cleared the main email input; it was restored to the exact original normalized-email reference, resaved and independently checked after reopening the saved prompt. No connection change.
- A main numeric-choice editor entry was initially plain formula text. It was corrected to the full @ expression, verified in Code view against the approved mapping with all other log fields identical, then saved. No invalid formula was knowingly saved as final configuration.
- **Not published:** flow priority overrides exist in saved drafts. The prior published flow definitions remain in force until these drafts are published, while the saved shared classifier wording already applies. Do not describe the deterministic overrides as live yet.

## Accepted limitation and preserved evidence

The rule uses the existing Support category plus change-request flag to identify order changes. The model can label an unrelated contact update Support/change true, causing unnecessary urgency and potentially selecting the existing eligible Support acknowledgment. Josh accepted this conservative over-escalation for the bounded prototype. It does not authorize changing records, producing work or sending replies. Recognition is still model-dependent; no universal detection guarantee.

Prior candidate E results remain **4/5 exact targeted checks,3/3 order changes**, with contact-control failure preserved. This acceptance decision is separate from those results. No original v1/v2/C/D/E file, score, key, scorer, contract or owner-review form was edited/rescored. Earlier formal runs remain FAIL; human quality judgments pending; overall release NOT_ESTABLISHED.

**Zero new model/drafter/workflow/mailbox/full30 tests, previews or rescoring.** Configuration checker/read-back is saved-definition verification only, not runtime evidence.

## Evidence and next step

authorization.json, save-verification.json, before/applied/reopened instructions, main log before/after, helper Scope before/after and input-reference evidence retained here. These are limited configuration records, not complete recoverable baseline exports. Screenshots remain in the local matching evaluation-setup folder.

Publication of both saved drafts is the next step when authorized. No additional test or repair cycle was initiated. A future formal v3 evaluation needs an explicit prospective scoring interpretation for effective priority versus raw model priority; do not relabel old exports or use the v2 scorer unchanged.
