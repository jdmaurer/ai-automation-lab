# CURRENT STATE - updated 2026-09-28 (late) - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Objective
Rivertown Lead Intake is closed at v2.7 (tag lead-intake-v0.2-evaluated, commit facd881). Week 5 is complete. Next: Week 6, Microsoft access.

## Where things stand
- Rivertown v2.7 = v2.6 plus an independent second opinion (qwen/qwen3.8-27b) before any auto-route. Rule B: auto-route only if the second model names the same category, says high, and lists no alternatives; otherwise review, routed_by second_opinion. Export: cases/rivertown-lead-intake/lead-intake-v2.7.json.
- Why: regression runs R7 and R8 on v2.6 auto-routed EVAL-07 to the wrong team (the model stopped listing alternatives, with no change on our side). R9 on v2.7: 0 dangerous, 14 of 17. Holdout H2: 0 dangerous, 4 of 6 (target 5; same misses as v2.5).
- Qwen-alone experiment: Q1 16 of 17, QH1 4 of 6. Fails the verdict set before the runs; v2.7 stays. Q2 not run.
- Release thresholds (full set) written before R7: decisions.md, 2026-09-28.
- n8n: "Rivertown - Lead Intake v2.7" (unpublished). The first AI is openai/gpt-oss-120b (confirmed in the export after the experiments). Rollback: import lead-intake-v2.6.json, or publish "Rivertown - Lead Intake v2.5 (evidence copy)".
- All v2.7 docs updated: test-cases, decisions, limitations, runbook, threat-model (Control 5), case README, n8n-patterns.
- eval-summary-v2.5.md (approved 9/25) is outdated: it describes the single-model design. Left unchanged; the case README flags it.
- Drafter: done at v9. Reads rules from GitHub main; threat model recommends pinning a commit (D2).
- Backups from the 9/28 line-ending cleanup ($HOME\rivertown-eval\backup-2026-09-28\) are safe to delete; those commits are on GitHub.

## Next
1. Master calendar Week 6, Monday block (calendar block, not the weekday): Microsoft access. Try the free Power Apps Developer Plan and the Copilot Studio trial; check whether the university account allows it (likely not) without using the university production tenant. Record the result in microsoft-environment-decision.md.
2. Gate 1 score (skipped at Week 4). Claude pre-scores the 10 criteria from repo evidence; Josh reviews (about 20 minutes).
3. Rivertown follow-ups, not blocking: run the Eval Summary Drafter on v2.7 results for a new owner summary; list H-04 and H-06 as a question for the client (every configuration held them, so the labels or definitions may need client input).

## Open items - Rivertown, before any real client data
- Random form IDs, or treat a repeated ID with a different email as a conflict (threat-model F2).
- Form note on sensitive details plus a table retention limit (F3).
- Turn off detailed error responses; the inactive-webhook 404 leaks local paths (F1).
- Rotate the webhook API key before any public exposure. Confirm the Postman workspace is private (F4).
- Build and test email delivery to each team; revisit the threat model first.
- Force a second-opinion failure to prove it goes to review (designed to fail closed; not yet tested).
- Single labeler. Offer the client a test set written by their own staff.

## Working rules
- Name the learning goal for each block. Case-study mode only when it teaches something; otherwise draft and let Josh review.
- One question at a time, context first. Explain like a fifth grader when asked. Wait until Josh has finished before replying; he types, not voice.
- Choices: why each option is good, what's bad, a recommendation, and a table when the difference isn't obvious.
- One instruction at a time, purpose and expected result first. Paste-ready values (version names, descriptions, commands) go in the same message as the step that uses them, every time; never "see above."
- Long code goes in files, never pasted from chat. Long n8n outputs come as .txt attachments.
- While Josh reads a document, queue changes and apply them together when he says done; then send a list of what changed and where.
- Check decisions.md before calling anything a bug. Check which files a restore or reset touches before running it.
- Write pass/fail rules and experiment verdicts before the run. Check model token budgets before planning several runs.
- n8n: Export JSON lands in Downloads; Claude moves it into the repo. Publish only for testing; unpublish at the end of the session.
- Evidence dates match when things happened. Documents for outside readers: past tense, no "new"/"now", a source for every claim.
- Keep the design lean; flags, not stops; Josh's review is the safety net. Time-box, and say when something isn't teaching anything.
