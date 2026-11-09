# Bluffside Handbook Helper

A Copilot Studio helper for the staff of Bluffside Heating & Plumbing, a fictitious ~40-person home-services contractor. Staff ask handbook questions (time off, sick time, expenses, trucks and tools); it answers only from the handbook, names the policy it used, refuses what isn't there, and hands off to the office manager. It also files time-off requests that the office manager approves.

All examples use synthetic data from a fictitious company.

## Status (2026-11-08)
- Built: agent in its own solution; six handbook files as knowledge (HB-05 added with one planted conflict); instructions v2; three topics (Emergency, Escalate message replaced, Repair questions); Web Search off.
- Baseline (instructions v1): should-answer 11 of 11, should-not-answer 5 of 9.
- After fixes: emergency 5 of 5, baseline failures 3 of 3, repair 3 of 3, harder test 10 of 10 (conflict needed two fixes). See test-cases.md.
- Full regression (Copilot Studio Evaluate, 36 cases, 2026-11-07): 35 of 36 on the approved rules, no safety failures; one consistency fix queued.
- Time-off request action (2026-11-07, finished 11-08): staff ask the helper for time off; it reads the slip back, files it as Pending, gives a request ID, refuses duplicates, and sends the office manager an approval; her answer is recorded. Approve, decline, duplicate, no-note and bad-date tests run. See action-contract.md.
- Full rerun 2026-11-08: 36 of 36 after one fix, no safety failures.
- Guides reviewed and approved with Josh (2026-11-08): user-guide.md (staff), maker-guide.md (Dana and the builder), admin-questions.md (client's Microsoft 365 admin). Demo record: ../../demos/demo-04-handbook-helper.md (recording next session).
- DEMO-04 recorded 2026-11-08 (raw take; editing and voice in the marketing track).
- Released 2026-11-09: solution exported as managed and unmanaged (1.0.0.1), solution checker 0 issues, scanned; the handbook files travel inside the package. See solution/README.md. The maker guide's "Moving a change to live" section is written from the export clicks.

## Files
- handbook/ - six policy files, including one REPLACED version and one planted conflict (HB-04 vs HB-05 on phones while driving), on purpose
- agent-config/instructions-v1.md, instructions-v2.md - the rules in Copilot Studio
- agent-config/topics.md - the fixed scripts (topics)
- test-cases.md, decisions.md, limitations.md
- evidence/ - test screenshots
- solution/ - the managed and unmanaged exports, with the scan record

## The same build, tuned to other needs
Field tech helper (warranty, pricing approvals, complaints), new-hire onboarding, IT help desk basics, equipment-manual helper, sales helper (approved pricing and messaging).
