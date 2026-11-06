# Bluffside Handbook Helper

A Copilot Studio helper for the staff of Bluffside Heating & Plumbing, a fictitious ~40-person home-services contractor. Staff ask handbook questions (time off, sick time, expenses, trucks and tools); it answers only from the handbook, names the policy it used, refuses what isn't there, and hands off to the office manager. Later this week: one action, a time-off request that the office manager approves.

All examples use synthetic data from a fictitious company.

## Status (2026-11-06)
- Built: agent in its own solution, five handbook files as knowledge, instructions v1, Web Search off.
- Baseline test: should-answer 11 of 11, should-not-answer 5 of 9 (see test-cases.md). Next: fix the built-in Escalate topic and add a fixed emergency script.

## Files
- handbook/ - the five policy files, including one REPLACED version on purpose
- agent-config/instructions-v1.md - the rules pasted into Copilot Studio
- test-cases.md, decisions.md, limitations.md
- evidence/ - baseline screenshots

## The same build, tuned to other needs
Field tech helper (warranty, pricing approvals, complaints), new-hire onboarding, IT help desk basics, equipment-manual helper, sales helper (approved pricing and messaging).
