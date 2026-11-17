# Consolidated manager-review wording — targeted failure, stopped

Josh approved the final consolidated wording (writing block78136): every requested change to existing work/records/arrangements requires manager review regardless of timing; hypothetical inquiries remain distinct; operational prevention can establish urgency without a deadline; preserve all Support review and existing safeguards. Earlier urgency-C was never tested or saved; Josh confirmed Cancel. This authorized D revision superseded that unrun attempt.

Plan, exact wording and six blind inputs were committed **before editing/testing** in e57e16f16b131910664a9a4cbd4527bfd511980c. One bounded candidate, maximum6 classifier calls, zero drafter calls; fixed order/expectations, stop first failure, save only if all scoped checks pass. No case IDs/test phrases added to prompt.

## Applied in editor, not saved

Preserved the existing dynamic email_record input token. Inserted the exact approved block and removed7 overlapping review/urgency/change/acknowledgment/attachment paragraphs. Normalized full-text comparison confirmed no other wording changes; categories, meaning-first context instructions, detailed custom-quote rules,11-field output/schema/confidence and fixed Support behavior retained. Before/candidate texts preserved.

**Only CRD-01 ran.** It uses the exact original DRI-12 input, including original message ID/text/attachment presence. Prompt test duration5988ms, UI0.4Copilot credits. Actual output:

- Support / **Routine** /confidence1.
- record_change_requested=true, context_sufficient=true, adversarial=false, draft_candidate=false.
- Other personal/sensitive/suspicious/custom flags false.
- Typed11-field output valid. Required review follows existing Support/change predicates; no draft follows candidatefalse. These routing conclusions are predicate analysis of actual output, not a workflow run.
- Preregistered expected Urgent; **priority remains wrong**. This is the scoped failure. Corrected change recognition does not erase that miss.

**Stopped at first failure.** CRD-02 through06 not run. No second wording revision, retry, drafter call, workflow/mailbox/full30 run, completed-test replay, owner rating or prior-run rescoring.

Cancel discarded the unsaved candidate; the prompt dialog closed and original flow input controls returned. No prompt Save, flow Save/Publish, connection change or deployed correction. Original shared saved classifier remains the pre-attempt version. A future run must not treat candidate D as deployed.

## Both flows' input references verified after cancellation

Read main classifier/drafter action Code views and helper full Scope through the actual UI. Both classifier inputs keep prompt614118d4-6ca8-4344-b945-8659eb8bb3d8 and email_record=@outputs('Normalize_-_Email_Fields'). Both other-reply drafters keep prompte9c13e46-ec62-4cd4-b52f-b2f596db5821, the same normalized email input, and classification_record=@string(outputs('Run_a_prompt')?['body/responsev2/predictionOutput/structuredOutput']). No repair was needed. Published state observed; no new publication/runtime claim.

## Evidence and stopping point

classifier-results.json contains the one actual result, input, expectations and mismatch. response-CRD-01-ui.txt preserves the UI response text (rendered nonbreaking whitespace); parsed field values are retained separately. instructions-before.txt, instructions-candidate.txt, input-references-verified.json and helper-scope-readonly.json are read/edit evidence, not full recoverable exports. Screenshot remains locally at evaluation-setup/consolidated-review-targeted-2026-11-16-d/targeted-failure.jpg.

Every earlier run/result/score/owner form, v1 key/scorer and v2 scoring contract remains unchanged. Full-v2 run08584067370291608645194199559CU22 still FAIL; it is not replaced by this prompt test. Human quality judgments remain pending. Overall release NOT_ESTABLISHED. One known-case response cannot establish generalization; no model-weight training occurred.

**Stop implementation/testing here, as requested.** No further prompt repair or full30 rerun is authorized by this attempt. Manager review was already present for DRI-12 in the failed full run; formal urgency correctness remains unresolved. A closeout decision must disclose that limitation.
