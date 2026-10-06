# CURRENT STATE - updated 2026-10-06 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Objective
SQL remediation is underway after the 2026-09-30 Gate 1 score. DataCamp Introduction to SQL and Intermediate SQL are complete. JOINs and relational-database work are not complete yet, so Gate 1 #7 has not been re-scored. Next: DataCamp Joining Data in SQL, then relational database basics and the small SQLite Rivertown schema with the UNIQUE (external_id, source) idempotency rule and the required duplicate and invalid-reference tests. The Power Automate build is unchanged.

## Gate 1 (scored 2026-09-30, from repo evidence)
Result: NOT PASSED. 7 pass, 1 conditional, 2 fail. Pass needs 8 of 10 plus the four mandatory items (2, 3, 8, 9).
| # | Criterion | Result | Evidence or gap |
|---|---|---|---|
| 1 | HTTP and API | Pass | Postman path, webhook status codes, run-S2-abuse-log.txt |
| 2 | JSON and data contract (mandatory) | Pass | Data contract in case README, strict AI schema |
| 3 | Authentication and authorization (mandatory) | Pass | Header Auth and Bearer (n8n); OAuth, scopes, authn vs authz explained back 2026-09-30 |
| 4 | Git and GitHub | Pass | Skills exercise (branch, PR, merge); tag; revert drill commits b7637e4 + 4d96295 |
| 5 | Python | Fail | No Python work done |
| 6 | Workflow | Pass | Rivertown n8n build |
| 7 | SQL and state | Fail | As scored 9/30. Remediation now in progress: DataCamp Introduction to SQL and Intermediate SQL complete; JOINs, relational schema, idempotency constraint, and duplicate/invalid-reference tests still outstanding |
| 8 | Reliability (mandatory) | Conditional | Retry, error path, review queue, no silent success exist. Missing: correlation ID stored on each row, explicit timeout |
| 9 | Security (mandatory) | Pass | Full-history secret scan clean; threat-model.md |
| 10 | Evidence | Pass | README, runbook, limitations, 37 frozen cases, tagged release |
Remediation chosen: SQL first (before Dataverse). The working SQL route is DataCamp rather than SQLBolt because the interactive exercise format fits Josh better; the master-calendar skill target is unchanged. After SQL, close Gate 1 #8 in n8n (store the n8n execution ID on each row and set a timeout). Python remains scheduled later per the calendar contingency.

## Where things stand
- Microsoft: own organization joshmaurer.onmicrosoft.com ("jdmaurer Labs"), Power Apps Developer Plan environment "Josh Maurer's Environment" (750 flow runs/month; disabled after 30 days unused). See microsoft-environment-decision.md.
- Solution "Rivertown Lead Intake" (RivertownLeadIntake), publisher jdmaurer Labs, prefix jdm. Contains: table Lead (jdm_lead), flow "Rivertown - Lead Intake (Power Automate) v1", Dataverse connection reference.
- Flow: HTTP trigger ("Anyone") -> NormalizeLead -> ValidateRequiredFields -> SaveLead + RespondSuccess (200) / RespondFail (400). Same contract as n8n (D4, D5). Diagram, terms table, and field map: cases/rivertown-lead-intake/power-automate/README.md.
- Tests T1-T3 passed 2026-09-30 (test-cases.md). Postman collection "Rivertown Lead Intake (Power Automate)" (T1, T2, T3) lives in Postman only; never export it to the repo.
- The flow's web address is the password ("Anyone"). Stored in $HOME\rivertown-eval\pa-intake-url.txt only. To use: Get-Content "$HOME\rivertown-eval\pa-intake-url.txt" | Set-Clipboard
- Export: cases/rivertown-lead-intake/power-automate/RivertownLeadIntake_1_0_0_1.zip (unmanaged, v1.0.0.1), scanned clean (no flow address, no sig, no account names).
- Practice flows (outside the solution): Toy 1 Manual (on), Toy 2 Scheduled (OFF; never leave it on), Toy 3 Automated on Contacts (confirm it is off). Connection "Dataverse - Josh Maurer (dev)". Contacts has one test row, Toy3 TestContact.
- Rivertown n8n build: unchanged, closed at v2.7 (tag lead-intake-v0.2-evaluated), unpublished.
- Copilot Studio trial: NOT started. Sign up on the first day of Week 7.
- SQL remediation: DataCamp Introduction to SQL is complete (completed before the Intermediate course; exact certificate date was not independently verified at closeout). DataCamp Intermediate SQL was completed 2026-10-05. Practiced filtering, CASE, CTEs/subqueries, grouping, aggregates, HAVING, DISTINCT, and conditional aggregation. JOINs and relational database design are still ahead; DataCamp Joining Data in SQL is next.

## Next
1. DataCamp **Joining Data in SQL**. Keep the question-first teaching pattern: identify when tables must be combined, choose the join type and join columns, write the join, then verify the row result.
2. Relational database basics and the Rivertown SQLite build: table/row/column, primary key, foreign key, nullability, CREATE/INSERT/UPDATE/DELETE, then Lead, Company, Source, WorkflowRun, and ReviewDecision with `UNIQUE (external_id, source)`. Run the duplicate and invalid-reference tests.
3. Gate 1 #8 in n8n: store the execution ID on each Data Table row (correlation ID) and set an explicit timeout. Design question first, then build.
4. Week 6 Wednesday block: recreate the SQL data model in Dataverse. Duplicate check (alternate key or check-before-insert), WorkflowRun audit, field map (display vs technical names), rename the custom "status" column's display name to lead_status, and test malformed-email behavior.
5. Week 6 Thursday (approvals, Try/Catch scopes) and Friday (same cases through n8n and Power Automate; comparison memo with licensing). Schedule Python remediation after the SQL/Dataverse sequence.

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
- Turn off detailed error responses; the inactive-webhook 404 leaks local paths (F1).
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
- Keep the design lean; time-box and say when something isn't teaching anything.
- Microsoft work only in the "jdmaurer Labs" profile. No billing edits right before a trial sign-up.
