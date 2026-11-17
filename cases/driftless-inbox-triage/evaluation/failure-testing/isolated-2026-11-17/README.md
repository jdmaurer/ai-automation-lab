# Isolated failure checks — November 17, 2026

## Latest continuation — FI-01 scoped PASS; FI-02 Published, NOT RUN

Existing triage copy `bca4414b-abe2-f111-84ea-000d3a367f8a` is now manual-only and Published (On / Instant); no Inbox subscription. A source fixture is a new unsent lab draft whose actual ID is used for lookup/log/review marker. Replies are also unsent and lab-restricted. Originals/shared prompts/connections unchanged.

- **FI-01 scoped PASS, one execution:** [actual result and boundaries](execution/FI-01.md), cloud Failed run `08584066687962115280420875208CU04` retained. Division by zero before model/network; actual marker and same-row Failed/Unknown/no-reply recovery succeeded.
- **FI-02 Published, NOT RUN:** [preregistration](execution/fi02-preregistered.json), [pin data](execution/fi02-pin-data.json), [action definitions](execution/fi02-action-snapshots.json), [stopping status](execution/fi02-status.json). Compose with malformed confidence, original gate/recovery preserved. No runtime pass.
- **FI-03/FI-04 NOT RUN:** weekly copy not created.

Browser timed out opening Test after publication. Final editor snapshot showed Published/ready, no test panel; no Run flow submission. Stopped without further retries. Resume same copy, inspect run history, then FI-02 once if reliable. Gate runtime error without actual review/failure handling is FAIL and stop. Do not repeat FI-01, prior normal/full30 tests, change originals/shared prompts, or tune accepted contact limitation.

## Earlier setup attempts — historical


## Latest continuation — one disabled triage copy saved; no tests

Browser binding worked on Josh's explicit retry. Created **Driftless ISOLATED Failure Triage 2026-11-17**, ID `bca4414b-abe2-f111-84ea-000d3a367f8a`, using Save As. The creation dialog said copies are off by default; My flows showed this exact copy Disabled with its Enabled toggle false.

In its draft only, removed the copied Inbox trigger, added a manual trigger with fixture_json text input, set Normalize to `@json(triggerBody()?['text'])`, adapted the lookup filter and entered normalized Message ID/Received At bindings in the Start log. Code view confirmed the Normalize expression and lookup filter; Start fields showed the entered tokens. Replacing the trigger cleared original dynamic tokens in Normalize and some direct connector fields. Remaining bindings must be inspected/adapted before any run; the draft is **not ready for Publish/Test**.

The designer later behaved inconsistently: the Expand all action groups click left the Processing Outcome dropdown open rather than expanding branches. No option change was observed. Stopped configuration, dismissed the dropdown, saved Draft and observed the explicit saved banner. No Enable, Publish, Test, model call, mailbox/Dataverse write or fault injection. The older published definition of this disabled copy may still contain the Inbox trigger; **do not turn it on**.

**One triage copy exists; weekly copy not created; FI-01..FI-04 all NOT RUN.** Original published flows/shared prompts/connections and earlier evidence/accepted limitation untouched.

[Exact continuation record](copy-setup-retry.json). Resume this existing copy, not another duplicate. Verify the manual schema, remaining trigger references, exact source diff, fault boundaries and fixture destinations before publication/test. Then create the separate weekly copy and run only the pending four checks if control remains reliable. Initial blocked attempt below is historical and remains preserved.


## Initial attempt — historical

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
