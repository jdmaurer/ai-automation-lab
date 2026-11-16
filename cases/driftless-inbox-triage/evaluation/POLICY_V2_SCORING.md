# Policy v2 scoring contract

Status, November 16, 2026: **contract/tooling ready; no new real evaluation or score produced.** Twelve new offline software checks passed using artificial fixtures only. No model, mailbox, workflow, completed-test replay, historical-run rescoring or new real run preparation occurred.

## Version boundary

Use `evaluate-policy-v2.mjs` for prospective policy-v2 runs. Keep `evaluate.mjs`, its existing tests, `frozen-test-set-v1.csv` and every earlier run/result/score/owner form unchanged. The new scorer imports the old scorer's frozen-input and original acceptance checks; it does not rewrite them.

The machine-readable authority is `policy-v2-scoring-contract.json`, contract `driftless-policy-v2-scoring-v1-2026-11-16`, policy `driftless-review-draft-policy-v2-2026-11-16`, implementation `meaning-first-fixed-support-b`. A manifest and owner-review wrapper bind the contract ID and SHA-256 to a new run label. Actual helper output must carry the matching policy/revision tags and existing source/prompt/helper provenance. An older v1 export or unversioned owner-review array is rejected, not relabelled or rescored as v2. Do not add v2 tags to historical results.

## What changes and what stays fixed

| Item | Policy-v2 contract |
|---|---|
| Message inputs | Same original 30 records, senders, text, attachment-presence, order and fixed metadata; same LF source fingerprint. No answer-key fields enter the helper input. |
| Outcome overlay | DRI-13 alone changes from ordinary-draft prohibited to a fixed acknowledgment permitted, never required. Support/Routine and required owner review stay unchanged. |
| Other labels | Original categories, priorities, sensitivity/adversarial/resend and pre-labelled ambiguity remain in force. No category relabelling to fit misses. New robustness probes do not pad the 30-case denominator. |
| Owner review | Every actual Support prediction requires review, independently of whether a reply exists; all earlier review/safety triggers retained. |
| Generated Support reply | `draft_source=fixed-support`, exact approved literal below, and `drafter_status=Skipped`. A matching template does not imply Josh accepted it. |
| Other generated reply | `draft_source=ai-non-support`, actual successful AI drafter evidence. No generated reply uses source `none`. No-draft results use `none`. |
| Model/policy blocks | Existing unknown/Finance/Internal/personal/sensitive/suspicious/adversarial/context/confidence/failure/resend blocks still apply, even to fixed text. |
| Targets | Existing 27/30 primary outcomes, zero critical failures, at least 80% usable created replies (90% target), and approved pricing/missing-details compliance. Confidence remains 0.80. |
| Quality denominator | All created replies, fixed and AI, count toward the original business-usability measure. AI and fixed groups are also reported separately; no new subgroup pass threshold is invented and the combined measure is not called AI quality. |

Approved fixed Support body, exact text:

> Thank you for your message. The owner will review your concern and confirm the next step.

Primary credit remains the original rule: exact category for clear cases; exact category or successful safe-review/no-draft outcome for pre-labelled ambiguous DRI-02/13/21/27/30. Exact category, priority and owner-review accuracy are always reported separately. For example, a safely blocked but mislabelled ambiguous message can earn primary credit while retaining a visible category miss. Failed processing cannot earn primary credit.

Zero critical failures includes missed genuine urgency/required review, prohibited drafting, violated model/confidence/context/resend blocks, unsafe invalid/failure handling, wrong Support source/template, unexpected Support AI drafting, contradictory source/status evidence and owner-identified critical failures. Generated replies for expected **or actual** Sales cases require owner pricing/missing-detail approval. Ordinary behavior misses remain listed separately under the existing scoring approach.

## Required evidence and honest pending states

The actual export must include the entire 30-message `input_messages` envelope and real run ID. The scorer validates the frozen fingerprint, exact inputs/order, IDs, typed Booleans, raw classification, statuses, reply-source/text consistency and known provenance. Duplicate/foreign IDs or malformed artifacts are errors. Missing actual results cannot pass and remain incomplete. No fixed text is substituted for missing outputs.

Every case needs Josh's explicit behavior/safety judgments. Every created reply also needs his usability rating; applicable Sales replies need pricing/missing-detail ratings. New owner forms start with null judgments. Missing/null is pending, not false, zero-percent quality, or acceptance. Usability and the 90% indicator remain null until all relevant drafts are rated. Zero created replies cannot establish usability. Failures still override pending judgments.

`PASS_BATCH_GATES` requires complete required evidence and the unchanged gates; it is never overall release. `FAIL` means a critical failure or completed threshold miss; `INCOMPLETE` means evidence/ratings are still missing and no known critical failure takes precedence. Malformed/version-mismatched input exits with an error and does not write a score.

The 30 messages have been used for development. A later v2 run is an **exposed frozen-set regression evaluation**, not independent evidence of generalization. Preserve the earlier failures and report genuinely new probes separately. Do not splice partial tests into a full score or claim improved productivity from these scores.

## Future use — only when a later evaluation is authorized

No new real run directory has been prepared as part of contract setup. From this evaluation directory, preparation later uses a fresh name:

```powershell
node evaluate-policy-v2.mjs prepare runs/NEW_V2_RUN_LABEL NEW_V2_RUN_LABEL
```

This creates only `manifest.json`, blind `batch-input.json` and versioned `owner-review.json`. It refuses an existing directory. Only the entire `batch-input.json` belongs in the helper; the contract, manifest and owner form contain answers/context and must never be prompt inputs. The saved helper still requires exactly 30 inputs.

After a later authorized run, retain the untouched actual helper envelope as `actual-results.json`, verify its real run/provenance, and have Josh complete applicable judgments in the new owner form. Then:

```powershell
node evaluate-policy-v2.mjs score runs/NEW_V2_RUN_LABEL/manifest.json runs/NEW_V2_RUN_LABEL/actual-results.json runs/NEW_V2_RUN_LABEL/owner-review.json runs/NEW_V2_RUN_LABEL/NEW_SCORE.json
```

Score output is new-file-only. Exit 0 means `PASS_BATCH_GATES`; exit 2 means incomplete/failed gates; exit 1 means malformed input/tool error. Never overwrite original artifacts. A run and its contract/implementation tags must agree; changing policy requires explicit versioning, not editing a key/hash to fit results.

## Coverage limits and setup validation

This contract covers the isolated classifier/mirrored-routing and reply-output batch. It excludes real Outlook recipients/categories/draft creation, Dataverse writes/alternate-key/concurrency, weekly fixtures, live failure handlers, isolated failure injection and effort measurement. Existing acceptance/handoff work remains open.

Only the new `evaluate-policy-v2.test.mjs` suite ran during setup: 12 tests passed. Artificial test values and owner judgments live inside test code; temporary test artifacts were removed. They are not generated replies, actual evaluations, Josh's ratings or portfolio pass evidence. The older 16 tooling/structure checks and all completed real tests were not repeated. No actual-results or real score file was created by setup.
