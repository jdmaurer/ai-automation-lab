# Policy v2 — implementation, targeted results and read-only diagnosis

Date: November16,2026. Policy: driftless-review-draft-policy-v2-2026-11-16. **Implemented and Published; focused validation FAIL.** This is not a full-batch or overall release pass.

## Preregistration and preservation

Josh explicitly adopted the new policy: owner review and draft permission are independent. Clear concerns may receive neutral acknowledgments while awaiting assessment; missing meaning/history and existing safety blocks still prohibit ordinary drafts. Because this prototype has no verified existing-order lookup, all Support messages require owner review. DRI-13 therefore changes prospectively from v1 no-draft to v2 neutral-acknowledgment-permitted. The old no-draft expectation is not an objective fixture-defect claim.

Policy, expectation overlay and four blind inputs were committed **before** configuration/tests in d83beda4522297eb69b4eb159ec9a51d6aa3da51. The new probes were authored after the business rule was chosen. They are small robustness checks, not an independently held-out benchmark or generalization guarantee. No case IDs, original bodies or expected outputs entered prompt instructions.

Original frozen v1 CSV/key (LF SHA256 d3241136e45fc8c26ff935e63bcf5aee1637fa2f4b67e3449572ec64fa178f06), formal run08584067626552952412210788760CU18, FAIL25/30 score, original manifest, owner judgments and earlier targeted ambiguity-v2/v3 artifacts remain unchanged. No historical rerating or splice of partial retests into30/30. Existing evaluate.mjs remains **v1-only**; do not apply its no-draft DRI-13 rule to a future v2 evaluation and call that a v2 score. No full v2 score exists.

## Configuration actually saved

- Shared classifier614118d4-6ca8-4344-b945-8659eb8bb3d8: replaced the overlapping context paragraphs and test-shaped complaint block with a general policy-v2 context/review/drafting section. Unknown cause of an identifiable concern does not itself mean missing context. Missing prior meaning still blocks drafting. Eleven output fields, JSON schema and0.80threshold unchanged. Full word comparison confirmed only that section changed; input token retained. Saved, reopened and verified with Save disabled.
- Main and helper owner-review category predicate now contains Unknown/Finance/Internal/**Support**. Exact before/after Code-view comparison confirmed only Support was added; all other review tests retained. Draft blocker array does **not** include Support and remains unchanged. Helper compound predicate still compares to actual Boolean @true.
- Shared drafter e9c13e46-ec62-4cd4-b52f-b2f596db5821: existing rules prohibited guessing causes but did not clearly prohibit explanatory theories. Replaced only its Support section with a general neutral-acknowledgment/no-causes/no-remedy/no-promises rule, explicitly overriding the default no-owner-review-language instruction for Support. Pricing and all other sections unchanged. Both original input tokens retained; saved/reopened text verified.
- Prompt saves reset the main editor's required inputs. Restored classifier email_record=@outputs('Normalize_-_Email_Fields'); drafter email_record same, classification_record=@string(outputs('Run_a_prompt')?['body/responsev2/predictionOutput/structuredOutput']). Helper retained both actions' original same references. Code view inspected in both flows.
- Main flow53209c07-ca63-bcd9-c7f3-04b29c1f562a and helper runtime9ca55e5e-afe0-f111-84ea-000d3a367f8a/designerb073b5f4-92ca-e6ad-e255-6a264c4891f0 each showed the saved-draft banner, checker **0 errors/0 warnings**, then **Published** and ready banner. Published helper review Code view matched intended Support-only change. No working connection remap or weekly-flow change.
- Prompt test panels exited Cancel; temporary sample changes not saved. Limited Code-view/saved-instruction references in configuration.json and verification.json are not full flow exports/recoverable baselines.

## Exactly six planned model calls

The strict30 helper was left unchanged. Four live classifier prompt tests plus two live drafter prompt tests used the preregistered original/synthetic inputs. No unplanned preview, retries, full30 run, mailbox messages, actual Outlook drafts, send or deliberate failure injection. Prior LOG-02/AUTO-01/WS-01/WS-02 and earlier ambiguity regressions were not replayed.

| Case | Actual classifier | Review / draft-eligible from saved rules | Targeted outcome |
|---|---|---|---|
| DRI-13 | Support/Routine/.95, contexttrue, candidatetrue | true / true | Classifier and rule checks PASS **under v2 only**; actual draft FAIL below |
| PV2-U01 new clear concern, unknown cause | Support/Routine/.95, contexttrue, candidatetrue | true / true | Classifier and rule checks PASS; draft needs owner assessment |
| PV2-U02 new vague follow-up, missing conversation | Support/Routine/.90, contexttrue, candidatetrue, record_changetrue | true / true | **FAIL**: expected Unknown/contextfalse/candidatefalse/reviewtrue/no draft |
| PV2-U03 new clear standard quote, missing artwork details | Sales/Routine/.95, contexttrue, candidatetrue, customquotefalse | false / true | PASS |

Review/draft truth outcomes are **manual analysis of UI-read saved expressions applied to recorded outputs**, supported by main/helper expression equivalence. They are not fresh workflow runtime evidence. An initial working calculation incorrectly used category for the priority-membership validation check; it was discarded as an analysis error and not treated as a Power Automate failure. Raw model outputs were never changed. No additional model/test calls occurred during the subsequent read-only diagnosis.

### Actual generated replies

DRI-13's v2 draft still says color may appear different depending on screen/lighting and offers printing-detail investigation. **Assistant policy check FAIL**: it offers possible causes rather than the required neutral acknowledgment/owner deferral. No Outlook draft was created in this retest.

PV2-U01's draft repeats the customer's coating/adhesive hypotheses as a proposed investigation and promises team follow-up. It selects no cause and promises no remedy/deadline, but goes beyond a strictly neutral acknowledgment. **Owner assessment required**; do not invent a categorical safety/usability judgment or claim owner acceptance. All owner quality ratings remain pending.

Exact input/classification pairs and unchanged reply text are in classifier-results.json and draft-results.json; scoped analysis is in rule-analysis.json and assessment.json. No full v2 benchmark score or measured productivity improvement is claimed.

## Read-only diagnosis requested after the checks

### Vague follow-up

The record requests a change without identifying the object/business purpose and expressly lacks earlier communication. Actual output inferred Support, set record_change_requested=true and treated context as sufficient. Change intent is evidence that a change was requested; it is **not** evidence of what record/order/request exists. The saved classifier already contains the missing-context rule. The broad Support/change-request definitions and useful-acknowledgment guidance give a plausible route to this inference, but the model's internal reasoning is unverified. New Support-review routing correctly catches the output for review; it does not block an ordinary draft because context/candidate flags are wrong. Blocking every record change would break legitimate requests and is not recommended.

### Drafter causes

The saved Support section explicitly prohibits possible causes/explanatory theories and says customer-suggested causes remain unverified. Reopening verified those words; this is not merely a missing prohibition. The actual reply reused and generalized the sender's uncertain hypotheses. General helpfulness/clarification guidance may compete, but this is an observed instruction-following failure, not proven model causation, schema default, stale deployment or connector defect. Do not claim that adding another similar sentence will fix it.

## Smallest general recommendation — NOT applied

1. **Classifier: make abstention the first decision.** Establish from the supplied record that a business purpose and recognizable request/concern exist before category matching. A request to change something does not supply its referent. If meaning depends on unavailable prior communication, keep contextfalse/candidatefalse, and use Unknown when purpose cannot be established. Routine missing details of an identifiable request remain permissible. Reorder/consolidate existing guidance rather than adding test phrases, new fields or a higher confidence threshold. This is a hypothesis for a bounded correction, not a demonstrated fix.
2. **Support drafts: use a fixed neutral acknowledgment after eligibility gates**, rather than another free-form drafting-prompt patch. Policy v2 permits only a narrow acknowledgment here, so fixed text can satisfy the role without inventing causes. Candidate body: “Thank you for your message. The owner will review your concern and confirm the next step.” Keep the same human-review/no-send path and existing eligibility blocks; retain AI drafting where approved pricing/clarification adds value. This is a proposed implementation change for Josh's decision, not a silent architecture edit. Less personalization is the tradeoff for predictable wording.

These recommendations are based on distinct failure mechanisms, not on changing exact subjects/case IDs or matching known answers. The newly authored vague probe exposed generalization weakness; do not discard it or tune repeatedly against it. Any later validation should use new varied cases declared before testing, with frozen old evidence retained. No such tests or live changes were made during this inspection.
