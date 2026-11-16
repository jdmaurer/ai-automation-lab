# Classifier clarification applied — targeted results, November 16, 2026

**Saved and references verified; ambiguity safety defect remains. No overall pass.**

## What changed and what saved

Shared Driftless Inbox Classifier614118d4-6ca8-4344-b945-8659eb8bb3d8, displayed GPT-4.1 mini. Added only the agreed ambiguity block after context_sufficient and before CUSTOM QUOTE RULES. First save reopened and verified word-for-word after ignoring editor paragraph spacing, with Save disabled. Original email_record input token retained; surrounding instruction text unchanged.

The five v2 checks below demonstrated that DRI-13 still failed. One bounded refinement replaced only the competing-explanations complaint sentence with a direct rule: an explicitly uncertain complaint cause or multiple possible causes requires owner assessment/contextfalse/draftfalse, with no generic-acknowledgment exception. It explicitly takes precedence over Support acknowledgment permission. A paragraph separator was repaired; final text reopened and verified against the intended words, Save disabled. No output fields, threshold0.80, normal routing, shared connections, drafter or weekly flow changed.

The resulting prompt is **not proven to solve DRI-13**. Saved v2/v3 instruction snapshots are in their separate targeted directories. Do not overwrite the original November16 instruction snapshot.

## Both flow references

A shared-prompt save again cleared the main flow editor's required email_record field. Restored the exact existing reference and inspected Code view:
- Main flow53209c07-ca63-bcd9-c7f3-04b29c1f562a: recordId614118d4-6ca8-4344-b945-8659eb8bb3d8; item/requestv2/email_record = @outputs('Normalize_-_Email_Fields'). Draft-save banner confirmed, then **Published** and “Your flow is ready to go.” Final prompt tests exited with Cancel; main still Published with the same expression.
- Helper: existing runtime9ca55e5e-afe0-f111-84ea-000d3a367f8a / designerb073b5f4-92ca-e6ad-e255-6a264c4891f0. Reference remained the same prompt ID and @outputs('Normalize_-_Email_Fields'). Read Code view initially and again after final prompt saves and a fresh reload; helper **Published**, no helper write or publication needed.
- UI canvas initially placed helper nodes offscreen after expansion; Zoom view to fit exposed them and allowed the saved Code-view check. No configuration rebuilt or connection changed.

Both targeted directories include limited classifier-action Code-view snapshots in classifier-bindings.json. These are input-reference evidence, not full flow exports/recoverable baselines.

## Planned targeted checks and actual results

The helper parser deliberately requires exactly30 inputs. Used the live shared prompt's Test panel for selected original email_record inputs, without altering its parser/schema or running30 again. No answer key was a model input. Case/input verified before each planned Test. UI JSON nonbreaking indentation spaces were normalized for parsing; displayed output text was also preserved.

### v2 — initial agreed block

Label targeted-2026-11-16-classifier-ambiguity-v2:
| Case | Purpose | Actual relevant output | Check |
|---|---|---|---|
| DRI-13 | Previously unsafe unresolved-cause complaint | Support/Routine, confidence.95, context=true, draft_candidate=true | **FAIL** |
| DRI-27 | Previously guessed missing prior context | Unknown/Routine, confidence.60, context=false, draft_candidate=false | PASS |
| DRI-30 | Previously guessed unspecified follow-up | Unknown/Routine, confidence.70, context=false, draft_candidate=false | PASS |
| DRI-02 | Protect clear standard quote missing routine details | Sales/Routine, confidence.95, context=true, custom_quote=false, draft_candidate=true | PASS |
| DRI-11 | Protect clear urgent Support acknowledgment | Support/Urgent, confidence.95, context=true, draft_candidate=true | PASS |

### v3 — one focused complaint refinement

Label targeted-2026-11-16-classifier-ambiguity-v3:
| Case | Purpose | Actual relevant output | Check |
|---|---|---|---|
| DRI-13 | Only still-failing ambiguity case | Support/Routine, confidence.95, context=true, draft_candidate=true | **FAIL again** |
| DRI-10 | Clear damage complaint boundary for changed complaint sentence | Support/Routine, confidence.95, context=true, draft_candidate=true | PASS |

The four v2 passing checks were **not repeated after v3**; report their exact tested version, not a fresh final-version pass. DRI-10's boundary check predeclared Support/contexttrue/drafttrue (confidence>=.80); its Routine priority also matched the frozen key, but this does not establish the overall priority issue is solved.

**Seven intentional targeted classifier calls total.** In addition, assistant clicked Test once before setting the first exact input. This accidentally reused persisted **AUTO-03** sample; captured in v2/unscored-preview.json and excluded from planned checks. This was a process error, not intentional extra coverage. Output General/Urgent confidence.95, contexttrue/draftfalse; do not present it as new required acceptance evidence. No concealed retries, model/drafter calls or full-batch rerun.

## Interpretation and limits

Missing-prior-context rule worked in the two v2 checks. Both quote and urgent-acknowledgment exceptions worked in v2; clear damage worked in v3. **DRI-13 still would be eligible for an ordinary draft under existing routing**, because its returned flags remain true. These were classifier-only tests: no actual drafter was invoked and no Outlook draft was created for the retests. Review/no-draft consequences are inferred from the already inspected unchanged routing, not fresh workflow runtime evidence.

Do not claim PASS_BATCH_GATES, a repaired30/30 score, usable-draft ratings or overall release. Original formal run08584067626552952412210788760CU18 remains FAIL25/30 with its actual outputs/score/key/manifest/owner ratings untouched. No LOG-02/AUTO-01/WS-01/WS-02/mailbox/end-to-end replay, sending, solution-export investigation or deliberate failure injection. The one accidental AUTO-03 prompt preview is disclosed above.

Stopped further prompt tuning after the focused refinement also failed. Next: read the structured-output definitions/any conflicting context_sufficient and draft_candidate guidance before proposing another change. Do not repeat DRI-13 without a new, explained correction. The exact cause of its persistent instruction failure is unverified; do not invent model reasoning. Other batch misses, DRI-28 BadRequest detail, owner judgments, unproven integrations/weekly fixtures, baseline/export, isolated failures and handoff remain open.
