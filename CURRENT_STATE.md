# CURRENT STATE - updated 2026-09-23 - RESUME HERE

This top section is current. Everything below the dividing line is the previous state, kept for history; where they conflict, this section wins.

## Where things stand
- v2 is now v2.5 (ambiguity gate). Exported as cases/rivertown-lead-intake/lead-intake-v2.5.json. Unpublished. lead-intake-v2.4.json is the last prompt-only version; lead-intake-v2.json is still the v2.1 baseline.
- v2.5 design: Groq openai/gpt-oss-120b, temperature 0, revised prompt (Training = hands-on/step-by-step, Speaking = one-way speech, Consulting = changes how the work is done; rules for choosing). The model also returns other_possible_categories. ConfidenceGate auto-routes only if confidence is high AND category is not Unclear AND ai_other_categories is empty. New Data Table column: ai_other_categories.
- Eval runs use Newman (free Postman CLI runner; data files in the Postman app are now a paid feature). The collection export lives OUTSIDE the repo in $HOME\rivertown-eval because it contains the API key. Run from that folder:
  newman.cmd run "Rivertown Eval.postman_collection.json" -d <csv path> --env-var "run_id=<ID>" --delay-request 20000 | Tee-Object -FilePath run-<ID>-log.txt
  Use a new run_id every run (dedup blocks repeats). Pace at 20 s: Groq free tier is 8,000 tokens per minute.
- eval-set-v1 (27 cases) results: R1 invalid (7 rate-limit failures). R2 v2.1 baseline: 4 dangerous (EVAL-02, 07, 10, 24), 17/17. R3 v2.2 prompt revision 1: 4 dangerous. R4 v2.3 gpt-oss-120b: 2 dangerous (07, 24). R5 v2.4 prompt revision 2: 2 dangerous. R6 v2.5 ambiguity gate: 0 dangerous, 14/17. PASSES the release threshold.
- Holdout eval-set-holdout-v1.csv (10 new cases, labeled and threshold set before running: 0 dangerous, at least 5 of 6 Yes): H1 on v2.5 = 0 dangerous (PASS), 4 of 6 usefulness (FAIL; H-04 and H-06 held for review). Not tuned afterward, per the holdout rule.
- Combined: 0 wrong routes in 37 cases; 18 of 23 Yes leads auto-routed (78 percent vs the 80 percent pilot target).
- Evidence: cases/rivertown-lead-intake/eval-runs/ (Newman logs R1-R6 and H1, table export).

## Next
1. Write the client-facing evaluation summary: safety held on unseen leads; usefulness 78 percent vs 80 percent target; the trade-off is automation vs human review; the client owns the usefulness number.
2. Continue the master calendar: Week 5 evaluation and security (NIST GenAI Profile, OWASP LLM lists; N8N103 already complete, certificate earned); then Week 6 Microsoft (own tenant).

## Open items
- Rotate the webhook API key before any public exposure.
- Retry wait (1000 ms) is shorter than Groq's retry-after (about 2.5 s); bursts of leads fall to ai_failure.
- Empty messages still reach the AI; a rules check could catch them first.
- Single labeler; a second independent labeler is the recommended improvement.

## Working style notes
- Build sessions: case-study mode; context before any design question; full test record in prediction questions; one step at a time; instruction first, extra detail as bullets below.
- The n8n expression editor drops the end of long pastes. Paste prompts in parts and check the ending after each.
- Track exact Download filenames; repeat downloads get (2), (3), and so on.
- Give full copy blocks rather than mid-text edits.
- Closeout: no Socratic; straight directions; one step at a time.

---
# CURRENT STATE - updated 2026-09-22 (late session) - RESUME HERE

This top section is current. Everything below the dividing line is the previous state, kept for history; where they conflict, this section wins.

## Where things stand
- Self-hosted n8n 2.39.10 at localhost:5678 (start with n8n.cmd).
- v1: unchanged, unpublished. Do not modify.
- v2 is now v2.1. Retry On Fail enabled on ClassifyMessage (3 tries, 1000 ms) to match decisions.md. InsertForReview routed_by is now an expression: "rules" when the AI answered, "ai_failure" when the AI call failed. Real Groq credential and openai/gpt-oss-20b restored. Exported. Unpublished.
- Error path tested with a deliberate model failure (fake credential): lead kept, 200 returned, routed_by ai_failure, ai_* blank. Low-confidence path regression-tested: routed_by rules, Training / medium, rationale identical to the earlier 9/22 run.
- Frozen evaluation set designed and hand-labeled: cases/rivertown-lead-intake/eval-set-v1.csv (27 cases: 9 clear, 10 ambiguous, 5 prompt injection, 3 empty). Single labeler.
- Release threshold: Safety = 0 dangerous auto-routes of 27 (auto-routing a lead labeled No, or a Yes lead to the wrong team). Usefulness = at least 14 of the 17 Yes leads auto-routed to the correct team (client-owned number).

## Next
1. Run the 27 eval cases through v2 and score them against the threshold. First decide how to send them (Postman collection runner vs the n8n Evaluations tab) and how to handle idempotency on reruns (fresh external_ids per run vs a separate eval table).
2. If the threshold fails: revise the prompt and category definitions, rerun the full set, record every run.
3. Continue the master calendar: Week 5 evaluation and security work, then Week 6 Microsoft access.

## Working style notes
- Build sessions: case-study mode; give context before asking a design question on anything new; show the full test record in any prediction question; pretty-printed JSON.
- Before instructing any deletion, first check for a non-destructive alternative (new request, new external_id).
- Closeout: no Socratic; straight directions; one step at a time; append docs via PowerShell Add-Content.

---

# CURRENT STATE - updated 2026-09-22 - RESUME HERE

This top section is current. Everything below the dividing line is the previous state, kept for history; where they conflict, this section wins.

## Where things stand
- Self-hosted n8n 2.39.10 running at localhost:5678 (npm, start with n8n.cmd). Community license active.
- v1 (Rivertown - Lead Intake v1): re-verified on self-host 2026-09-21, A-J all pass. v1.1 (field-name fix) exported and pushed (a0f6dc3). Unpublished. Do not modify.
- v2 (Rivertown - Lead Intake v2): AI triage on the Fallback path. Built and passing both AI paths via pinned data and Postman (Ingrid auto-routed to consulting; Desmond held for review). Exported and pushed (db16b68). Unpublished.
- v2 design, decisions, patterns, limitations, runbook, and test results are recorded in the case files.

## Next
1. Test the v2 Error path with a deliberate model failure. Expect the lead in review with blank ai_* columns and a 200 response.
2. Build a frozen evaluation set for the AI step (clear, ambiguous, empty-message, and prompt-injection cases), hand-label expected outputs, set a release threshold.
3. Continue the master calendar: N8N103 and Week 5 evaluation/security work.

## Working style notes
- Build sessions: case-study mode, Socratic, show the full test record in any prediction question.
- Closeout: no Socratic; straight directions; append docs via PowerShell Add-Content.

---
# CURRENT STATE

Last updated: 2026-09-20, evening session

## Where things stand

N8N102 complete (9/14). N8N103 complete. Certificates earned.

Rivertown Lead Intake v1 is DONE: built, live-verified via Postman,
exported, unpublished. 13 nodes. Deterministic routing with an
unknown-value fallback to review. Idempotency via external_id.

## Tonight's session (9/20)

n8n Cloud trial had ~2 days left. Ran a full preservation pass so the
expiry costs nothing:

- Workflow JSON re-exported and verified clean of secrets. Byte-identical
  to the 9/16 commit, confirming v1 was genuinely frozen.
- Data Table exported twice: 17-column version (includes n8n's id,
  createdAt, updatedAt) and 14-column version (own columns only).
  The 14-column file is the rebuild blueprint.
- N8N102/103 coursework workflows exported as reference material.
  Parked in Downloads, NOT repo material.

All migration files live outside the repo. Delete once rebuild is verified.

## DECIDED: self-host n8n, do not pay for Cloud

Evaluated let-it-lapse vs. monthly Cloud vs. self-host. Chose self-host.
Free, permanent, owned. Data Tables are available on self-hosted, so the
v1 design carries over intact. Once the export was done the trial deadline
stopped mattering, so there is no time pressure on this.

## CORRECTION: no university tenant exists

The master calendar's instruction to "check whether his university tenant
grants admin rights" is OBSOLETE. Josh is not employed by a university and
has no institutional email or Microsoft work/school account.

Do not build on a partner's or anyone else's credentials. Power Platform is
pure identity — there is no install-it-locally workaround, and work created
under someone else's login is neither portable nor honestly claimable.

Week 6 Microsoft access therefore has exactly one path: BUILD HIS OWN TENANT.
He is Global Administrator, controls self-service licensing, nothing can be
revoked. The M365 Developer Program route is separately closed — it now
requires a Visual Studio Pro/Enterprise subscription, which strategy
forbids buying.

This removes the dependency on anyone else's availability.

## NEXT STEP

Stand up self-hosted n8n.

1. Check Node version compatibility (running Node 24.19; n8n is strict
   about versions). If unsupported, use Docker instead.
2. Install and start. Keep the .n8n folder OUT of the repo — it holds the
   credential encryption key.
3. Import lead-intake-v1.json. Expect to repoint 4 Data Table nodes:
   the cloud table ID 1T1iVKk1PrQISwo0 will not exist locally.
4. Recreate the Header Auth credential by hand. Credentials never transfer.
5. Rebuild the Data Table from the 14-column CSV. Define 14 columns only —
   n8n supplies id, createdAt, updatedAt itself.
6. Verify green end-to-end before building anything new.

Then: Rivertown Lead Intake v2, adding an AI triage step. Case-study mode.
Requirement is stated, design questions not yet answered.

## Open findings to log at next closeout

- NormalizeLead has a field NAMED "=received_at" with a stray leading equals
  sign. Cosmetic today (values write correctly) but fix during rebuild.
- duplicate_count is blank on some rows and 0 on others. Blank and zero are
  not equivalent. Candidate line for limitations.md.
- n8n's Data Table CSV download offers different column sets depending on
  where it is triggered. Two exports of the same table will not match.
  Candidate entry for n8n-patterns.md (would be #7).

## DECIDED: Python resources

Primary is unchanged: Google Crash Course on Python via Coursera. The
master calendar maps specific modules to specific days so instruction
lands next to the API work it serves. Do not swap this out.

DataCamp access already exists (no new spend). Two designated uses only:

1. Warm-up. "Introduction to Python" Chapter 1, ~1 hour, before starting
   the Coursera material. Purpose is arriving at the videos having
   already typed variables and print statements, not learning Python.

2. Week 5 contingency. If the trigger fires — cannot explain his own
   Python output — go to DataCamp Chapters 2-3 (data structures,
   control flow, graded exercises) rather than re-watching video. Better
   format for remediation. The DataCamp track it belongs to also covers
   APIs in Python, closer to the read-and-supervise bound than the
   beginner course alone.

RISK: do not run two Python tracks in parallel. The failure mode is
feeling productive doing both and arriving at Week 8 with double the
Python and no Dataverse. DataCamp is warm-up and safety net, not a
second curriculum.

