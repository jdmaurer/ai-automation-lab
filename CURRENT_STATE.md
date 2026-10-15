# CURRENT STATE - updated 2026-10-15 (afternoon) - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Objective
2026-10-15 (afternoon): Gate 1 #8 (Reliability) closed in n8n, and **Gate 1 is PASSED**: 9 of 10, all four mandatory items pass. Only #5 (Python) is open, and it is folded into upcoming builds rather than worked on separately (see Gate rules below).

What changed in the n8n build (version names "v2.8 correlation ID" and "v2.8 timeout 60s" inside the n8n workflow still named "Rivertown - Lead Intake v2.7"):
- New Data Table column `execution_id` (string). The four Insert nodes write `{{ $execution.id }}`. IncrementDuplicateCount does not touch it, so a resend never overwrites the run that created the row and made the decisions.
- Workflow setting Timeout Workflow on, 60 seconds (worst normal run about 30 s, from AI retries). Timezone set to America/Chicago.
- Tests CID-A to CID-E and TO-1 all passed with rules written first (test-cases.md). Evidence runs #351-#356.

## Gate rules (agreed 2026-10-15)
Gate 1 stopped building for two weeks (9/30 build, then 10/1-10/14 coursework only). That is not what a gate is for. From now on:
- A gate is a snapshot, never a stop. Score it, then keep building.
- Each miss gets three things written here: the upcoming build that closes it, the evidence that will prove it, and where it is tracked.
- One exception: safety. If a miss would make the next build leak secrets or real data, fix it first, inside the build, within a day.
- Skill gaps are learned inside the build that needs them: a short time-boxed burst (about 30 minutes), at the level the build needs (read and supervise; AI writes the code), and any check uses the same format the training used.
- Always moving forward: no multi-week course detours to pass a gate.

## Gate 1 (scored 2026-09-30; re-scored 2026-10-15)
Result: **PASSED**. 9 pass, 1 fail. Pass needs 8 of 10 plus the four mandatory items (2, 3, 8, 9).
| # | Criterion | Result | Evidence or gap |
|---|---|---|---|
| 1 | HTTP and API | Pass | Postman path, webhook status codes, run-S2-abuse-log.txt |
| 2 | JSON and data contract (mandatory) | Pass | Data contract in case README, strict AI schema |
| 3 | Authentication and authorization (mandatory) | Pass | Header Auth and Bearer (n8n); OAuth, scopes, authn vs authz explained back 2026-09-30 |
| 4 | Git and GitHub | Pass | Skills exercise (branch, PR, merge); tag; revert drill commits b7637e4 + 4d96295 |
| 5 | Python | Fail | Carried forward into builds (below) |
| 6 | Workflow | Pass | Rivertown n8n build |
| 7 | SQL and state | Pass (re-scored 2026-10-15) | SQLite schema, duplicate and invalid-reference tests (cases/rivertown-lead-intake/sqlite/README.md). Note: UPDATE not exercised; carried into the Dataverse build |
| 8 | Reliability (mandatory) | Pass (re-scored 2026-10-15) | 60 s timeout (TO-1: run #356 canceled, caller got 500, no row); retry limit 3 tries; error path to review (test K); correlation ID `execution_id` on every new row (CID-A to E); review queue; no silent success. Note: no failure alert (allowed: "alert or review queue"); carried into Power Automate Try/Catch |
| 9 | Security (mandatory) | Pass | Full-history secret scan clean; threat-model.md |
| 10 | Evidence | Pass | README, runbook, limitations, 37 frozen cases, tagged release |

Carried forward from Gate 1 (close inside these builds, not separately):
| Miss | Closes in | Evidence |
|---|---|---|
| #5 Python | A small Python utility used in a real build, written by AI, supervised and explained by Josh: e.g., read a Data Table export and flag rows with no `execution_id`, handling three failure types (missing file, malformed JSON/CSV, missing column) | Script in the repo, Josh explains what it does and what each failure path prints |
| #7 UPDATE | Dataverse rebuild: updating duplicate_count and status is an UPDATE | Test showing a resend updates the existing row |
| #8 alert | Power Automate Try/Catch block | A forced failure produces a visible alert |

## Where things stand
- SQLite (2026-10-15): command-line tool 3.53.4 installed with winget. Files in cases/rivertown-lead-intake/sqlite/: schema.sql, seed.sql, test-duplicate.sql, test-invalid-reference.sql, README.md (evidence). rivertown.db is generated and git-ignored; the README has the one-line rebuild command. Every file starts with PRAGMA foreign_keys = ON (SQLite ignores foreign keys without it).
- Microsoft: own organization joshmaurer.onmicrosoft.com ("jdmaurer Labs"), Power Apps Developer Plan environment "Josh Maurer's Environment" (750 flow runs/month; disabled after 30 days unused). See microsoft-environment-decision.md.
- Solution "Rivertown Lead Intake" (RivertownLeadIntake), publisher jdmaurer Labs, prefix jdm. Contains: table Lead (jdm_lead), flow "Rivertown - Lead Intake (Power Automate) v1", Dataverse connection reference.
- Flow: HTTP trigger ("Anyone") -> NormalizeLead -> ValidateRequiredFields -> SaveLead + RespondSuccess (200) / RespondFail (400). Same contract as n8n (D4, D5). Diagram, terms table, and field map: cases/rivertown-lead-intake/power-automate/README.md.
- Tests T1-T3 passed 2026-09-30 (test-cases.md). Postman collection "Rivertown Lead Intake (Power Automate)" (T1, T2, T3) lives in Postman only; never export it to the repo.
- The flow's web address is the password ("Anyone"). Stored in $HOME\rivertown-eval\pa-intake-url.txt only. To use: Get-Content "$HOME\rivertown-eval\pa-intake-url.txt" | Set-Clipboard
- Export: cases/rivertown-lead-intake/power-automate/RivertownLeadIntake_1_0_0_1.zip (unmanaged, v1.0.0.1), scanned clean (no flow address, no sig, no account names).
- Practice flows (outside the solution): Toy 1 Manual (on), Toy 2 Scheduled (OFF; never leave it on), Toy 3 Automated on Contacts (confirm it is off). Connection "Dataverse - Josh Maurer (dev)". Contacts has one test row, Toy3 TestContact.
- Rivertown n8n build: v2.8 (execution_id correlation ID, 60 s timeout, Chicago timezone), export lead-intake-v2.8.json. The n8n workflow is still named "Rivertown - Lead Intake v2.7"; version names start "v2.8". Unpublished after testing. v2.7 tag: lead-intake-v0.2-evaluated.
- Workflow settings (timeout, timezone) saved straight into the published workflow without a republish.
- Data table rivertown leads v2: 327 rows after today's tests. Use the Search box to find a row by external_id.
- Copilot Studio trial: NOT started. Sign up on the first day of Week 7.
- SQL remediation coursework: DataCamp Introduction to SQL complete; Intermediate SQL completed 2026-10-05; Joining Data in SQL completed 2026-10-06; Introduction to Relational Databases in SQL completed 2026-10-10. JOIN reasoning and relational concepts are substantially stronger than exact syntax retrieval. Concepts that held: primary vs foreign keys, 1:N and N:M relationships, referential integrity, CASCADE behavior, UNIQUE vs DISTINCT, JOIN logic, filtering/grouping. Syntax that needs delayed-recall practice includes ADD CONSTRAINT, SET NOT NULL, RENAME COLUMN, INSERT INTO ... VALUES, INSERT INTO ... SELECT DISTINCT ... FROM, UPDATE ... SET ... FROM ... WHERE, ALTER COLUMN ... TYPE, and FOREIGN KEY ... REFERENCES. Do not quiz table/column names; provide the names and test the SQL pattern and logic.

## Next
1. Recreate the SQL data model in Dataverse (the reason the SQL was learned). The SQLite schema in cases/rivertown-lead-intake/sqlite/schema.sql is the blueprint: UNIQUE (external_id, source_id) becomes an alternate key; Lead and WorkflowRun become tables; WorkflowRun.execution_id holds the run ID as n8n now does. Includes an UPDATE (resend bumps duplicate_count), closing the Gate 1 #7 note. Also: field map (display vs technical names), rename the custom "status" display name to lead_status, malformed-email test.
2. Remaining Power Automate blocks: approvals, Try/Catch scopes (closes the #8 alert note), same-case comparison with n8n including licensing.
3. Python #5 folded into a build (see carried-forward table), in a short burst, read-and-supervise level. Do not start Intermediate Python as a separate track.
4. Later: a short mixed SQL + Python retention check in review format (show finished code, ask what it does).

## Open items - Power Automate build
- status, routed_to, duplicate_count are not written yet (later blocks). Choice columns will need Microsoft's option numbers.
- Two "status" columns (custom jdm_inquirystatus and Microsoft's statecode). Rename the custom one's display name.
- The import AI chose technical names that differ from display names (message is jdm_inquirymessage, received_at is jdm_receivedtimestamp). The field map must list both.
- Single-line text columns default to 100 characters; check each against real input. message raised to 4000.
- 10 seed rows have empty company_size (the column was recreated as text).
- Before any real client: a stronger trigger setting than "Anyone" (tenant OAuth, or a front service), and a licensing estimate.

## Open items - Rivertown n8n, before any real client data
- Random form IDs, or treat a repeated ID with a different email as a conflict (threat-model F2).
- Form note on sensitive details plus a table retention limit (F3).
- Turn off detailed error responses; the inactive-webhook 404 and the timeout 500 both leak the local username and install path (F1).
- No failure alert: a run killed by the timeout writes no row and tells no one. Operator checks Executions for failed runs; error workflow or Power Automate Try/Catch is the fix.
- Rotate the webhook API key before any public exposure (F4).
- Email delivery to each team; revisit the threat model first.
- Force a second-opinion failure to prove it goes to review.
- NormalizeLead calls .trim() without a null guard; a submission that omits a field entirely would error (found 2026-09-30, n8n-patterns.md).

## Browser setup (name the window in every instruction)
| Window | Signed in as | Use it for |
|---|---|---|
| **Orange "Joshua"** | joshuadmaurer@gmail.com | GitHub, Claude, ChatGPT, Gmail, Google Drive, n8n at localhost:5678 |
| **Blue "jdmaurer Labs"** | josh@joshmaurer.onmicrosoft.com | Everything Microsoft: Power Apps, Power Automate, Copilot Studio, Entra, admin center |
- Never do Microsoft work in the orange window.
- Postman: desktop app. Decline the Windows Firewall prompt; sending works without it.
- Chrome forced dark mode is on (chrome://flags/#enable-force-dark). Power Automate web has no dark mode of its own.

## Working rules
- Learning first. Before any gate item, ask what skill it checks and design the activity around that skill. Cut activities that only produce a check mark.
- Directions start from the page Josh is on, and name the exact place on screen (which panel, which corner, the label). Say where Back lands (from an editor, Back returns to the list, not the table).
- Cautions and warnings come before the first step, never after.
- Label steps by goal in plain words; no step titles that read like button names.
- Teach a term before asking about it. Name the specific build when referring to past work ("Rivertown n8n v2.7, the webhook one").
- One question at a time, context first. Explain like a fifth grader when asked. Wait until Josh has finished; he types.
- Coding exercises are answer-first: state the requirement, ask Josh what construct or small code piece he would use, and do not reveal the answer in the question or correction unless he is stuck. Once he gets it right, provide the exact copy/paste syntax if useful.
- Choices: good, bad, a recommendation, a table when the difference isn't obvious.
- One instruction at a time, purpose and expected result first. Paste-ready values in the same message as the step.
- Screenshots only when needed (decision points, unfamiliar screens). Josh says when something doesn't match.
- When a command reads the clipboard, the order matters: paste the command, copy the value, then press Enter.
- Power Automate: Always check the environment name (it opened in the default environment). Flows opened from a solution use the older designer; F5 there returns to the solution list.
- Check decisions.md before calling anything a bug. Check what a delete or reset touches first, and name what could be lost.
- Write pass/fail rules before tests run.
- Teach before testing (2026-10-15): before any question, walk through the real-life purpose and what each column or value means. Never quiz on something not yet taught.
- Before a test runs, give a reading guide for its output: which line is a heading, where an error appears, what silence means. Only commands go in copy boxes, never expected output.
- Say column names, not shorthand ("source_id 9", not "form 9"); write out primary key and foreign key. Avoid sample data where different ID columns share the same numbers.
- When a side issue appears on screen, name it right then in a few lines (what it is, why it matters), and ask whether to handle it now or log it. Do not silently push it to the end.
- Terminal: Josh opens it by right-clicking the Start button and choosing Terminal.
- Keep the design lean; time-box and say when something isn't teaching anything.
- Show it in the tool, not on the page (2026-10-15): when a concept lives in n8n, send Josh to the screen where he can see it (Executions, the canvas, the table) instead of describing it. Keep each message to a short screen: one picture or small table, one step or one question. A two- or three-page message before a question is the failure mode.
- Josh came back to this build after two weeks away; after a gap, re-orient with the real screen first, and explain like a fifth grader when he asks.
- Microsoft work only in the "jdmaurer Labs" profile. No billing edits right before a trial sign-up.
