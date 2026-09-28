# CURRENT STATE - updated 2026-09-28 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Objective
Week 5 security block is done for both builds. Rivertown Lead Intake is at v2.6; Eval Summary Drafter is at v9.

## Where things stand
- Threat model: cases/rivertown-lead-intake/threat-model.md (covers both builds; drafter is Part 2). Verdict: fine for demonstration with synthetic data, not ready for real client leads until three items are closed (see Open items).
- Rivertown v2.6 = v2.5 plus HasLeadMessage (blank or spaces-only messages skip the AI, routed_by blank_message), InsertBlankForReview, and a 5000 ms retry wait. Export: lead-intake-v2.6.json. A node-by-node diff against v2.5 shows no other change.
- n8n workflow names: "Rivertown - Lead Intake v2.6" (published) and "Rivertown - Lead Intake v2.5 (evidence copy)" (rollback). Only one can be published; they share the webhook path.
- Kill switch and rollback: runbook.md, "Kill switch - v2.6".
- Abuse tests: collection "Rivertown Abuse" in $HOME\rivertown-eval (outside the repo; holds the API key). Log: eval-runs/run-S2-abuse-log.txt. Test IDs: FORM-900xx manual, FORM-910NN-<run_id> abuse. Smoke test before any full run: newman.cmd run "Rivertown Abuse.postman_collection.json" --folder "A3 wrong API key" --env-var run_id=SMOKE (expect 403).
- Newman JSON exports contain the API key. Never move them into the repo.
- Case README rewritten for v2.6 (results at a glance, fictional-firm disclaimer, routed_by meanings).
- Drafter: done at v9 (see cases/eval-summary-drafter/README.md). Reads rules from GitHub main; threat model recommends pinning a commit (D2).
- Backups of four files from the line-ending cleanup: $HOME\rivertown-eval\backup-2026-09-28\ (safe to delete once this commit is confirmed on GitHub).

## Next
1. Continue the master calendar after the Week 5 security block.
2. Optional: a decision on eval-summary-v2.5.md saying "5 attempts" at injection while test-cases.md lists 6 (5 main set + H-09). The summary is approved; the README avoids a number.

## Open items - Rivertown, before any real client data
- Random form IDs, or treat a repeated ID with a different email as a conflict (threat-model F2).
- Form note on sensitive details plus a table retention limit (F3).
- Turn off detailed error responses; the inactive-webhook 404 leaks local paths (F1).
- Rotate the webhook API key before any public exposure (promised in the client summary). Confirm the Postman workspace is private (F4).
- Build and test email delivery to each team; revisit the threat model first.
- Single labeler. The summary offers a client-written test set before the pilot.

## Working rules
- Name the learning goal for each block. Case-study mode only when it teaches something; otherwise draft and let Josh review.
- One question at a time, context first. Explain like a fifth grader when asked. Wait until Josh has finished before replying; he types, not voice.
- Choices: why each option is good, what's bad, a recommendation, and a table when the difference isn't obvious.
- One instruction at a time, purpose and expected result first. Long code goes in files, never pasted from chat. Long n8n outputs come as .txt attachments.
- While Josh reads a document, queue changes and apply them together when he says done; then send a list of what changed and where.
- Check decisions.md before calling anything a bug. Check which files a restore or reset touches before running it.
- Evidence dates match when things happened. Documents for outside readers: past tense, no "new"/"now", a source for every claim.
- Keep the design lean; flags, not stops; Josh's review is the safety net. Time-box, and say when something isn't teaching anything.
