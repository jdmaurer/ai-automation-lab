# FI-02 repair A — scoped malformed-output recovery PASS

Preregistered `029282c8aeddea2d9dd2cc5650461238d491f5e1` before the sole verification execution. [Exact fixture](pin-data.json), [saved action source](saved-action-snapshots.json), [gate diff](gate-source-diff.json), [result](result.json).

## Change and saved status

Only isolated manual flow **Driftless ISOLATED Failure Triage 2026-11-17**, `bca4414b-abe2-f111-84ea-000d3a367f8a`, was edited. Added **Validate - Classification Structure** (Parse JSON) after classifier success. Requires the existing11 fields with string category/priority, numeric confidence and Boolean safety/draft flags. Existing allowed-value/range/business/draft rules unchanged.

Normal Validate - AI Output now requires the structure check to succeed. The existing AI-failure setter/Outlook marker/same-row failure log chain is reused after the structure check Failed/TimedOut/Skipped. Skipped permits existing classifier-action failure to reach recovery through the skipped structure check; no FI-01 replay was performed. Recovery log still attempts after marker Succeeded/Failed/TimedOut.

Saved banner observed; checker0 errors/0 warnings; Published/ready confirmed before run. No original flow/shared prompt/connection/schema/business policy edit. Captured action snippets are change evidence, not a complete new flow export. Original baseline remains preserved.

## One actual runtime check

Run `08584066464556424522963834692CU18`, November17 about6:07PM Central,3seconds. Cloud **Failed**, because the deliberately malformed response failed schema validation. Acceptance **PASS_SCOPED_MALFORMED_OUTPUT_RECOVERY**.

- Compose response Succeeded. Structure check Failed: **Invalid type. Expected Number but got String**, path confidence, value invalid. This was the intended fault.
- Normal validation, reply body, AI drafter and Outlook reply creation **Skipped**.
- Owner-review setter **Succeeded**; Outlook Needs Owner Review marker **Succeeded** (0.3s), targeting the new fixture's actual message ID.
- Failure log **Succeeded** (1s). Returned row `1faab4ff-e3e2-f111-84ea-000d3a367f8a` matches the Start-row ID; marker message ID matches the log. Actual returned values: processing Failed832990002, category Unknown832990005, review Pending832990000, needsownerreview true, followupopen true, draftcreated false.
- One new unsent synthetic source draft; zero reply drafts, model calls or sends. Fresh source ID supplied automatically despite reusing identical pin data.

[Cloud run](https://make.powerautomate.com/environments/88301e40-6106-ee47-900c-67a24cbc121e/solutions/~preferred/flows/bca4414b-abe2-f111-84ea-000d3a367f8a/runs/08584066464556424522963834692CU18). No resubmit/retry or other tests.

## Preservation and bounds

Original failed FI-02 `08584066475931016390512579185CU11` and its evidence remain unchanged as FAIL; no relabelled result. FI-01 not repeated. FI-03/FI-04 NOT RUN. All formal/targeted failures, owner judgments, accepted contact-update limitation and published baseline preserved.

Repair remains **only in the isolated copy**, not deployed to published main/evaluator/weekly originals. This targeted check proves the tested malformed-confidence recovery, not every possible malformed field, valid-output regression coverage, actual provider outage, other pending failures or full release. Full release NOT_ESTABLISHED.

Task complete. Later deployment or additional checks require Josh's separate direction; do not silently copy this into originals or rerun completed tests.
