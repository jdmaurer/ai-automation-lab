# Classifier ambiguity diagnosis — November 16, 2026

Status: **inspection and proposed correction only; NOT applied or tested.**

## Evidence and preservation

Read the live shared **Driftless Inbox Classifier**, ID614118d4-6ca8-4344-b945-8659eb8bb3d8, from the main flow's Run a prompt → Edit UI. Displayed model GPT-4.1 mini. The prompt Save button remained disabled; exited with Cancel without entering/changing text. [Full instruction snapshot](classifier-instructions-inspected-2026-11-16.json) records the current UI text, not a full prompt export/version history or proof of model internals.

Original failed run08584067626552952412210788760CU18, actual-results.json, score-v1.json, manifest, owner-review.json and review-packet.md remain unchanged. No tests/model calls, saves/publications, connection or flow edits. This is not a repair/pass claim.

## What the current prompt says

- Unknown means not enough reliable context to determine business purpose.
- context_sufficient=false only when business purpose or safe meaning cannot be determined because essential prior context is missing or the message is too vague.
- Clear valid quotes may have context_sufficient=true despite missing quantity/artwork/size details that can safely be requested.
- draft_candidate may be true for a useful safe ordinary reply/acknowledgment; false when a useful response would require guessing a problem's cause, choosing an unapproved remedy or claiming an unperformed action.
- Urgent Support can receive a safe acknowledgment without claiming operational actions.
- confidence measures category/priority classification, not an independent guarantee of safe drafting.

## Three observed failures

| Case | Actual classifier and draft | Frozen requirement |
|---|---|---|
| DRI-13 | Support/Routine, confidence.95, context=true, draft_candidate=true; no owner-review flag. Reply discusses screen/lighting and offers a printing review. | Keep Support; unresolved cause requires owner review, no ordinary draft. |
| DRI-27 | Sales/Routine, confidence.80, context=true, draft_candidate=true; no owner-review flag. Reply asks what was ordered previously. | Unknown; missing prior context; review/no draft. |
| DRI-30 | General/Routine, confidence.90, context=true, draft_candidate=true; no owner-review flag. Reply asks which order/project is meant. | Unknown; missing prior context; review/no draft. |

The routing followed the returned flags in these cases. For DRI-27/30 the outputs conflict with the existing Unknown/missing-context rule. The broad clarification/acknowledgment allowance leaves room to treat “I can ask what this means” as sufficient context. For DRI-13, known category was treated as sufficient for a generic response, but the frozen contract requires owner assessment of the unresolved discrepancy first. Existing wording blocks replies that *require* guessing; it does not explicitly prohibit an ordinary acknowledgment for this owner-assessment ambiguity.

That interpretation is supported by instructions + actual outputs; it is not a claim to know the model's internal reasoning. The full prompt was read now; no save/version history was inspected to independently reconstruct an earlier prompt revision.

## Smallest proposed correction

Insert this short block immediately after the two context_sufficient paragraphs and before CUSTOM QUOTE RULES:

```text
Apply these ambiguity rules before deciding draft_candidate:
- If a repeat or follow-up request has no identifiable business purpose without missing prior correspondence, set category="Unknown", context_sufficient=false, and draft_candidate=false. Being able to ask for clarification does not make that context sufficient.
- If a complaint presents competing explanations that require owner assessment to determine whether a problem exists or what caused it, retain the supported business category, but set context_sufficient=false and draft_candidate=false, even if a generic acknowledgment could be written.
Keep the existing exception for clear quote requests missing routine product or artwork details.
```

This clarifies the existing contract using existing fields. context_sufficient=false already triggers owner review and blocks drafting. Unknown is used only when the business purpose cannot be determined; supported categories such as Support stay intact. Do not add output fields/actions, change confidence0.80, add case-ID/subject overrides, feed the answer key to the prompt, or rebuild routing. The quote exception protects established clear inquiries such as requests missing quantity/artwork; it does not authorize guessing unspecified prior work.

## Next action and limits

Josh requested inspection/explanation, so the shared prompt is unchanged. Next: apply only this bounded clarification when instructed. A shared-prompt save was previously observed resetting linked action inputs; inspect classifier email_record bindings in both main flow and helper after any future save before publication. Preserve the original run and use new-label targeted checks of these failures plus necessary exception-boundary cases only. No blanket/full30 replay and no pass claim until actual new evidence. Other category/priority/drafter wording misses and DRI-28 BadRequest remain separately open.
