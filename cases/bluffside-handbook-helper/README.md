# Bluffside Handbook Helper

A Copilot Studio helper for the staff of Bluffside Heating & Plumbing, a fictitious ~40-person home-services contractor. Staff ask handbook questions (time off, sick time, expenses, trucks and tools); it answers only from the handbook, names the policy it used, refuses what isn't there, and hands off to the office manager. Later this week: one action, a time-off request that the office manager approves.

All examples use synthetic data from a fictitious company.

## Status (2026-11-06, evening)
- Built: agent in its own solution; six handbook files as knowledge (HB-05 added with one planted conflict); instructions v2; three topics (Emergency, Escalate message replaced, Repair questions); Web Search off.
- Baseline (instructions v1): should-answer 11 of 11, should-not-answer 5 of 9.
- After fixes: emergency 5 of 5, baseline failures 3 of 3, repair 3 of 3, harder test 10 of 10 (conflict needed two fixes). See test-cases.md.
- Full regression (Copilot Studio Evaluate, 36 cases, 2026-11-07): 35 of 36 on the approved rules, no safety failures; one consistency fix queued.
- Time-off request action (2026-11-07): staff ask the helper for time off; it reads the slip back, files it as Pending, gives a request ID, refuses duplicates, and sends the office manager an approval. Works end to end; Note-optional and empty-email guard next. See action-contract.md.

## Files
- handbook/ - six policy files, including one REPLACED version and one planted conflict (HB-04 vs HB-05 on phones while driving), on purpose
- agent-config/instructions-v1.md, instructions-v2.md - the rules in Copilot Studio
- agent-config/topics.md - the fixed scripts (topics)
- test-cases.md, decisions.md, limitations.md
- evidence/ - test screenshots

## The same build, tuned to other needs
Field tech helper (warranty, pricing approvals, complaints), new-hire onboarding, IT help desk basics, equipment-manual helper, sales helper (approved pricing and messaging).
