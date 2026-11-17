# Isolated failure checks — November 17, 2026

**Prepared, not executed. Browser blocked before copy creation. No new test result or pass.**

Josh authorized four outstanding failure paths using a separate copy, preserving the published flows, earlier failed runs and accepted contact-update limitation. The exported baseline at commit d82930b6bd244488a665f767f1c176131d31d6ea is the source checkpoint.

## Intended checks

| Case | Controlled fault | Required behavior |
|---|---|---|
| FI-01 | Classifier action fails after initialization | Owner-review marker and Failed/Unknown/no-draft log; no ordinary draft |
| FI-02 | Returned confidence has the wrong type | Invalid output cannot draft; actual review/failure recovery required, not merely a stopped run |
| FI-03 | Completion write fails after one unsent fixed Support draft | Independent review marker, same-row minimal fallback preserving draft-created status and owner fields; no duplicate draft |
| FI-04 | Weekly retrieval returns a continuation link | Completeness guard stops with IncompleteWeeklyLogRetrieval; no counts/explanation/report draft |

[Exact plan and fixture JSON](plan.json), [attempt status](attempt-status.json). At most one run per case; no completed smoke, normal report, full30 or model-quality replay. Stop on an unexpected safety result or unreliable control. No repair/tuning loop is authorized by this plan.

## Actual stopping point

The live browser inventory was available, but binding the Power Automate tab immediately returned **Debugger unattached**. No app mutation was issued. Consistent with Josh's instruction to stop unreliable browser work, no repeated binding or alternative automation was attempted.

**0 copies created; 0 tests/model calls; 0 original-flow/shared-prompt/connection edits; 0 mailbox/Dataverse writes.** There are no actual-results or scores for these cases. Earlier classifier-action failures in the formal frozen batch remain evidence for that helper only; they do not prove the main flow's intentional recovery paths.

## Resume safely

Restore live browser access, then create separate copies and record their new IDs. Replace copied Inbox triggering with manual-only synthetic fixtures before activation. Preserve the published originals and shared prompts. Record exact fault-injection changes and compare untouched downstream recovery logic before each run.

Use only fresh synthetic lab fixtures and uniquely identified test artifacts. Do not re-import the whole mixed baseline over the working solution. Inject at copied action boundaries and distinguish simulated faults from real provider outages, and stubs from actual connector evidence. Exact fixture adaptation and copy IDs remain pending UI inspection.

The accepted contact-only update over-escalation is unchanged. All prior runs/keys/scores/owner forms remain unchanged. No owner ratings or new release claim.
