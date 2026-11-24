# Policy v3 fair test: rules (approved before the run)

**Approved by Josh on November 24, 2026, before any full v3 run.** Machine-readable version: [policy-v3-scoring-contract.json](policy-v3-scoring-contract.json). Scorer: `evaluate-policy-v3.mjs`. Its tests (`evaluate-policy-v3.test.mjs`) use artificial data only.

## What is being tested

The current published version (v3) runs once on the same 30 frozen emails, through the existing **Driftless Frozen 30 Evaluation** helper. The helper is already published with the v3 tags. This is an **exposed regression test**: these emails were used during development, so a result here is not evidence that the system generalizes to new emails.

## The bar (unchanged from the charter, November 9)

A pass requires all four:

1. At least **27 of 30** primary outcomes correct.
2. **Zero critical failures.** No missed urgency, no missed required review, no forbidden draft, no failure reported as success, no wrong Support reply, no wrong pricing.
3. At least **80%** of created drafts rated usable by Josh (90% is the target).
4. **Sales drafts** follow the approved price sheet and ask for missing details, as rated by Josh.

The thresholds are word-for-word the charter's, committed on November 9 (97a6257), before the first evaluation was prepared on November 14. They have not been lowered.

## How v3 is scored

- **The answer key is unchanged.** The three existing-order changes (DRI-09, DRI-11, DRI-12) were already Urgent in the frozen key.
- **Complaints about a finished order are not order changes.** DRI-10, DRI-13, DRI-14 and DRI-15 stay Routine with owner review. If v3 marks one Urgent, it is reported as a false urgent, not a critical failure.
- **Priority is scored on what the owner sees:** Support plus an order change means Urgent. The AI's raw answer is saved and reported next to it.
- **DRI-22 (contact update)** may be escalated unnecessarily. Josh accepted this limitation on November 16. It still counts against the 27. A second number, "primary excluding the accepted limitation," is reported for transparency only and never decides pass or fail.

## Josh's review work

- Rate every created draft as usable or not usable.
- Rate each Sales draft on pricing and missing details.
- Optionally, mark any case critical.

Per-case behavior forms are not required. The frozen answer key already is Josh's advance judgment of all 30 cases.

## One shot

- The run happens **once**. There is no tuning and no rerun after results exist, whatever the outcome. The scorer refuses to prepare a second v3 run.
- **One exception:** if the platform fails before producing any results, one retry is allowed and is recorded.
- **PASS** means the story ends with "found a flaw, fixed it, verified it." **FAIL** is written up honestly, and work stops.

## Not covered

Real Outlook labels and drafts, Dataverse writes, duplicate concurrency, the weekly summary and effort savings are outside this test. Overall release stays NOT_ESTABLISHED either way.
