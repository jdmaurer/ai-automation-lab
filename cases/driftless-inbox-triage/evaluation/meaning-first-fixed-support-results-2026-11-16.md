# Meaning-first classifier and fixed Support drafts — implementation revision B

Date: November16,2026. Policy remains driftless-review-draft-policy-v2-2026-11-16. Revision: meaning-first-fixed-support-b. **Shared classifier saved; both flow revisions SAVED AS DRAFT, NOT PUBLISHED.**

## Authorization and publication stop

Josh authorized applying the meaning-first rule and fixed Support acknowledgment, checking both flows' inputs/saves, and necessary targeted checks while preserving failures/avoiding overfitting. Plan and blind inputs were committed first in619528489847d697ad25f3a623b0943bd8b4d16c.

Both flow drafts saved with **checker0errors/0warnings**. An attempt to publish the main flow was rejected by automatic approval review: it stated that publication of this new revision was not explicitly authorized. The rejected tool block did not execute its later UI actions. No publication retry or workaround occurred. Helper publication was not attempted; it is also held for explicit approval. Publishing would activate the new reply-source routing in the live flows. **Next required action: explicit user approval to publish both checked saved drafts.**

The shared classifier prompt Save did complete and was reopened/verified. That prompt is shared with existing published flow versions. The fixed Support routing exists only in the saved flow drafts until publication; do not claim it is already live.

## Exact bounded changes

### Classifier

Replaced the prior context section and moved the consolidated meaning-first check **before category definitions**. The record must identify a business purpose and recognizable request/concern without unavailable prior communication. A requested action is not evidence of its referent. Do not use a guessed category as evidence of sufficient context. Missing essential meaning blocks drafts; clear requests may ask routine missing details. Unknown cause alone does not make a clear concern insufficient. Keep separate Support owner review and neutral-acknowledgment permission. No case IDs/test phrases/answer examples added. All11fields,0.80threshold, JSON schema and other safety/category/price rules unchanged. Saved/reopened text matched intended words; original input token retained.

### Main flow draft

Inside the **unchanged** Rule - Draft Allowed gate:
1. Rule - Use Support Acknowledgment checks actual classifier category equals Support.
2. True: Compose Draft - Support Acknowledgment returns the fixed literal below.
3. False: existing configured AI action was copied as Draft - Generate Other Reply with the same shared drafter and classification/email references.
4. Draft - Reply Body selects the fixed Compose output or actual non-Support AI text.
5. Existing Create - Outlook Draft uses that selected body. Recipient, subject, importance, connector and DraftEmail operation unchanged; no send action.
6. Draft-failure setter now follows selected reply-body timeout/skipped/failure, preserving prior recovery semantics without treating the deliberately skipped Support AI action as failure. Completion logging still uses actual Create - Outlook Draft success/ID, not the AI action. Code view verified no old unconditional drafter reference there.

Old unconditional Draft - Generate Reply removed after replacement. The exact body is:

> Thank you for your message. The owner will review your concern and confirm the next step.

No model can add causal explanations to this literal selected body. Less personalization is the intentional tradeoff. This does **not** solve semantic classifier errors or establish a workflow runtime pass.

### Evaluation helper draft

Copied the checked Support selector and shared reply-body step using normal designer copy/paste. Kept the strict30 parser and existing eligibility/review/validation/confidence gates. Only non-Support eligible cases invoke the existing drafter. No Outlook or table-write action introduced.

Collector uses selected reply-body success/text to record draft_generated/draft_text and processing/review outcomes. drafter_status records the **actual non-Support AI action status**, so Support truthfully records Skipped. Added draft_source fixed-support/ai-non-support/none. Export adds policy_version and implementation_revision so future outputs identify their governing rules. These are additive provenance fields, not classifier-output changes or actual run evidence.

## Input/reference and save verification

- Classifier in both flows: existing prompt614118d4-6ca8-4344-b945-8659eb8bb3d8; email_record=@outputs('Normalize_-_Email_Fields').
- Other-reply AI in both: existing prompt e9c13e46-ec62-4cd4-b52f-b2f596db5821; email_record same; classification_record=@string(outputs('Run_a_prompt')?['body/responsev2/predictionOutput/structuredOutput']). Existing connections retained.
- Support selectors/reply-body expressions match between flows. Original eligibility gates unchanged. Fixed body exact. Main selected-body failure statuses are timeout/skipped/failed, not successful. Typed helper collection/source/version tags inspected; no old unconditional-drafter reference remains in the helper.
- Main and helper each showed the saved-draft banner and checker0errors/0warnings. Status is **Draft**, not runtime-passed or published. UI snapshots are limited configuration evidence, not full recoverable baseline exports.

## Only the preregistered checks

Exactly **four classifier prompt calls**, no drafter-model calls, unplanned previews, full30 run, mailbox/Outlook draft creation, send or replay of completed integration/report tests. Temporary prompt sample edits exited Cancel. Existing drafter prompt text was not edited this revision.

| Case | Actual model output | Saved-rule/local result | Outcome |
|---|---|---|---|
| PV2-U02 prior failed vague follow-up | Support/Routine/.90, contextfalse, candidatefalse, record_changetrue | Reviewtrue; no draft/source none | **Category still FAIL** vs expected Unknown; previous unsafe drafting eligibility corrected in this retest |
| MF-U01 new missing-history probe | Unknown/Routine/.80, contextfalse, candidatefalse | Reviewtrue; no draft | PASS specific expectations |
| MF-U02 new clear Support concern | Support/Routine/.95, contexttrue, candidatetrue | Reviewtrue; fixed-support body; AI drafter Skipped; processing Succeeded | PASS specific expectations/local wiring |
| MF-U03 new clear standard quote | Sales/Routine/.95, contexttrue, candidatetrue, customquotefalse | Reviewfalse; ai-non-support source | PASS specific expectations/local wiring |

**3/4 exact classifier expectations; 4/4 preregistered review/draft/source decisions.** Preserve the category miss; do not quietly accept Support as Unknown or change the plan. These counts are scoped checks, not30-case quality scores or overall release.

Local checks executed the UI-read WDL reply/collector expressions with recorded classifier outputs and source statuses. They verified actual Boolean types, correct fixed text, truthful Skipped AI status and non-failure processing for Support. The non-Support branch used a clearly labeled offline AI-text wiring fixture; it is **not a generated reply**, model-quality evidence or actual workflow run. No such fixture is placed in classifier-results.json or a formal actual-results.json. Local checks do not establish Power Automate execution, Outlook creation, logging or failure-handler runtime behavior.

Files beside this report: main-draft-before-after.json, helper-scope-after.json, classifier-instructions.json, references-and-verification.json, classifier-results.json and logic-checks.json. No full-flow baseline export claimed; no deliberate live failure injection performed.

## Avoiding overfitting and preserving evidence

The existing general missing-context rule was reorganized, not patched with sample keywords, case IDs, new fields or a higher confidence threshold. Three fresh synthetic probes were committed before tests, alongside the prior failed probe. They provide limited robustness evidence, **not an independently held-out benchmark**. No iterative tuning or repeat model calls followed the remaining category miss. Fixed text applies to every eligible Support message, not particular subjects.

All frozen-v1 inputs/key/hash, formal run08584067626552952412210788760CU18 and FAIL25/30 score, owner judgments, earlier ambiguity-v2/v3 failures, and policy-v2-targeted-2026-11-16-a failures remain unchanged. No retroactive pass or spliced full score. Existing evaluate.mjs remains v1-only. Owner quality review/full v2 evaluation and unproven integration/weekly/baseline/failure/handoff work remain open.

## Resume

Ask Josh to explicitly authorize **publishing both saved flow drafts**; explain the automatic-review rejection and that publication activates live reply-source routing. Do not retry publication without approval. After approval, publish each existing draft and confirm status/references; do not repeat these model checks merely to re-prove them. Preserve category miss as open, along with other original batch misses/DRI-28 details and owner judgments. No overall release claim.
