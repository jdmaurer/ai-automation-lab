# Order-change policy v3 — both saved drafts published

Josh explicitly instructed publication of both saved drafts, input/status verification and GitHub closeout, preserving failed runs and accepted contact-update limitation. No tests.

## Observed result

**Driftless Inbox Triage: Published / ready.** Main Publish clicked once. Published completion-priority action matches the checked saved JSON exactly.

**Driftless Frozen 30 Evaluation: Published / ready.** Helper Publish clicked once. Full published helper Scope matches the checked saved JSON exactly, including effective priority, preserved raw classification and policy-v3/order-change-urgent-e metadata.

All four classifier/drafter input parameter sets match the canonical saved verification:
- Classifier prompt 614118d4-6ca8-4344-b945-8659eb8bb3d8 in both; email_record=@outputs('Normalize_-_Email_Fields').
- Other-reply drafter prompt e9c13e46-ec62-4cd4-b52f-b2f596db5821 in both; same normalized email and classification_record=@string(outputs('Run_a_prompt')?['body/responsev2/predictionOutput/structuredOutput']).

Read-back artifacts independently matched the saved files fetched from GitHub. No input repair, prompt/config edit, connection change, new node or schema work in this publication step. An initial main DOM-status capture timed out after Publish; fresh read-only AX confirmed Published. No repeated Publish or test followed that observation issue.

## Preserved evidence and limitation

The accepted contact-only update false positive remains documented: Support+change true can unnecessarily escalate it to Urgent, and existing eligible Support acknowledgment routing can apply. Acceptance is a bounded owner decision, not a revised test result. Targeted E remains 4/5 exact and 3/3 tested order changes; earlier formal FAILs, all failed runs/keys/scorers/contracts/owner forms remain unchanged.

**Zero new model/drafter calls, previews, manual workflow/mailbox/full30 tests or rescoring.** Publication activates the saved definitions; it does not establish a fresh runtime, quality, generalization or full release pass. Owner quality judgments remain pending; overall release NOT_ESTABLISHED.

## Artifacts and stopping point

authorization.json, publication-verification.json, input-references-verified.json, main-log-published.json and helper-scope-published.json preserve authorization and read-only evidence. These are limited configuration records, not full recoverable baseline exports. Screenshots are in the corresponding local evaluation-setup folder.

Publication work complete. Stop this publication task; no further tests, tuning of the accepted limitation or score changes. Remaining bounded owner-review/baseline/failure/handoff work follows the existing checklist only when separately requested.
