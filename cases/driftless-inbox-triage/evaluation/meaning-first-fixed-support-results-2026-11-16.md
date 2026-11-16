# Meaning-first classifier and fixed Support drafts — implementation revision B

Date: November16,2026. Policy remains driftless-review-draft-policy-v2-2026-11-16. Revision: meaning-first-fixed-support-b. **Both flow revisions now PUBLISHED by Josh and independently verified. No additional tests or runtime-pass claim.**

## Authorization and publication history

Josh authorized applying the meaning-first rule and fixed Support acknowledgment, checking both flows' inputs/saves, and necessary targeted checks while preserving failures/avoiding overfitting. Plan and blind inputs were committed first in619528489847d697ad25f3a623b0943bd8b4d16c.

Both flow drafts initially saved with **checker0errors/0warnings**. An attempt to publish the main flow was rejected by automatic approval review: it stated that publication of this new revision was not explicitly authorized. The rejected tool block did not execute its later UI actions. No publication retry or workaround occurred. Helper publication was not attempted; it is also held for explicit approval. Publishing would activate the new reply-source routing in the live flows. Josh subsequently chose manual publication and reported both complete. Assistant verified Published/ready in both live tabs, exact main draft-selection/full helper Scope match against the checked revision, and intact classifier/other-drafter references. See publication-verification.json; the hold is resolved.

The shared classifier prompt Save did complete and was reopened/verified. That prompt is shared with existing published flow versions. The fixed Support routing was draft-only at that checkpoint and is now published after Josh's manual action.

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
- Main and helper each showed the saved-draft banner and checker0errors/0warnings. Those draft-status snapshots are historical; separate later publication verification confirms Published. No runtime pass is inferred. UI snapshots are limited configuration evidence, not full recoverable baseline exports.

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

## Resume after verified publication

No publication work remains. Establish the explicit versioned policy-v2 scoring contract before a later full evaluation; existing evaluate.mjs is v1-only. Keep the remaining category miss, owner judgments and required integration/weekly/baseline/failure/handoff work open. Do not replay completed checks merely to re-prove publication, and do not treat publication as release.

## Publication verification — no tests repeated

Josh manually clicked Publish in both existing flow tabs. Assistant verified Published/ready; main draft-selection JSON exactly matched checked main-draft-before-after.json, and full helper Scope exactly matched helper-scope-after.json. Both classifier email_record and non-Support drafter email_record/classification_record inputs retain their original expressions and shared prompt IDs. No edits, model calls, flow runs or new test results during this read-only verification. Publication-verification.json is additive; earlier draft/failed-run records remain unchanged.
