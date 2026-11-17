# Order-change policy v3 candidate E — order cases pass, scope control fails; stopped

Josh clarified the business policy: every requested/proposed/question-form change to an existing order must be Urgent and manager-reviewed, regardless of timing. Ordinary new inquiries remain ordinary; unrelated record updates keep existing review handling. He authorized application, input/save verification and necessary targeted checks only, with preserve failures/no full30/stop first failure.

## Preregistered approach

Plan and five blind inputs committed before edits/calls in 9c4e009709e8a0c4e704c5b38a5cdf8ff752128a. Clarify four existing classifier paragraphs, retain11 output fields/context/quote/safety rules and input token. Proposed workflow shortcut: category Support AND record_change_requested true => effective Urgent; otherwise retain existing priority. Existing Support/change review predicates already require manager attention.

Proposed changes were limited to existing main tracking-priority expression and helper reported-priority expression plus prospective helper policy/revision tags. **These workflow fields were never changed.** Prompt candidate was tested unsaved. Raw classifier priority would have remained separate evidence. The old v2 scorer/contract would not be valid unchanged for a future v3 effective-vs-raw-priority run; no scoring revision or full batch was attempted.

## Actual targeted results

Five classifier prompt calls, each once, no drafter/workflow/mailbox calls. Evaluate exact preregistered proposed priority expressions and UI-read existing review predicates offline on actual responses; do not claim Power Automate execution of the proposed priority rule.

| Case | Recognition | Proposed effective priority / review | Scoped result |
|---|---|---|---|
| OC-E01 original DRI-12 stop-print | Support, change true, raw Urgent | Urgent /true |PASS |
| OC-E02 question about existing-order quantity, event next spring | Support, change true, raw Urgent | Urgent /true |PASS |
| OC-E03 requested wording replacement | Support, change true, raw Urgent | Urgent /true |PASS |
| OC-E04 ordinary new yard-sign price inquiry | Sales, change false, raw Routine | Routine /false |PASS |
| OC-E05 contact-record update, orders unchanged | Support, change true, raw Routine | Urgent /true; expected General/Routine |FAIL scope control |

All outputs had valid required types/enums. **All three tested order-change cases achieved the required Urgent/review result under the proposed expressions.** Failure was an unnecessary urgency escalation on an unrelated contact update. It was not a missed tested order change or a new live safety incident. The model's use of Support for this update shows the proposed two-field shortcut does not cleanly isolate order changes.

## Stop and saved-state facts

Stopped at the first failed check (case5), with no revision, retry, extra case, completed-test replay or full30 run. Cancel discarded unsaved classifier candidate. No prompt Save, flow field edit, Save draft, Publish, connection or schema change was issued. **Requested rule is not installed/saved. Published prompt/flows remain unchanged.** Do not describe the prospective v3 candidate as deployed or rerate prior FAILs.

Main and helper original classifier/drafter prompt IDs and normalized email/classification expressions were verified intact after cancellation. Helper full Scope exactly matched the read-before copy. No repair needed. No prompt/flow runtime or overall release pass follows from read-only verification.

## Preserved artifacts and limits

Individual actual response/check records plus combined classifier-results.json, instructions-before/candidate, original main logging/review/helper Scope, exact input-reference evidence, plan/input packet and offline expression-evaluation source are retained. The response-OC-E05-ui.txt preserves rendered UI text; JSON records preserve parsed values. Screenshot is local at evaluation-setup/order-change-policy-v3-targeted-2026-11-16-e/targeted-failure.jpg.

All earlier v1/v2/C/D runs/results/scores/forms, frozen key/scorers/contracts and pending owner judgments unchanged. No new score or productivity/generalization/release claim. This is targeted classifier/proposed-expression evidence only, not end-to-end Outlook/Dataverse verification.

Stop further implementation/testing under this attempt. Report separately that the order-change cases passed and the unrelated-record scope control failed; no additional correction is authorized by this stop condition.
