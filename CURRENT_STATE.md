# CURRENT STATE - updated 2026-09-30 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Objective
Master calendar Week 6, Tuesday block (Power Automate) is done: Rivertown Lead Intake rebuilt in Power Automate, tested, and exported. Gate 1 was scored and did not pass (SQL, Python, and the reliability item). Next: SQL remediation, then the Week 6 Wednesday block (Dataverse data model and duplicate check).

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
| 7 | SQL and state | Fail | No SQL work done; dedup was on external_id only, no relational schema |
| 8 | Reliability (mandatory) | Conditional | Retry, error path, review queue, no silent success exist. Missing: correlation ID stored on each row, explicit timeout |
| 9 | Security (mandatory) | Pass | Full-history secret scan clean; threat-model.md |
| 10 | Evidence | Pass | README, runbook, limitations, 37 frozen cases, tagged release |
Remediation chosen: SQL first (before Dataverse); #8 in n8n (store the n8n execution ID on each row, set a timeout) alongside the SQL session; Python per the calendar contingency (8-10 hours, taken from Week 10 MCP time), date not yet set.

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

## Next
1. SQL remediation (Gate 1 #7). SQLBolt lessons, guided, then a small SQLite Rivertown schema with a UNIQUE (external_id, source) constraint and duplicate and invalid-reference tests. SQLBolt lessons are also the "change of pace" when Josh wants to keep going past a stopping point.
2. Gate 1 #8 in n8n, same session if time: store the execution ID on each Data Table row (correlation ID), set a timeout. Design question first, then build.
3. Week 6 Wednesday block: recreate the SQL data model in Dataverse. Duplicate check (alternate key or check-before-insert), WorkflowRun audit, a field map document (display vs technical names), rename the custom "status" column's display name to lead_status, and one test of how the Email column treats a malformed address.
4. Week 6 Thursday (approvals, Try/Catch scopes) and Friday (same cases through n8n and Power Automate; comparison memo with licensing: Dataverse and the HTTP trigger are Premium).
5. Schedule the Python remediation.

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
- Choices: good, bad, a recommendation, a table when the difference isn't obvious.
- One instruction at a time, purpose and expected result first. Paste-ready values in the same message as the step.
- Screenshots only when needed (decision points, unfamiliar screens). Josh says when something doesn't match.
- When a command reads the clipboard, the order matters: paste the command, copy the value, then press Enter.
- Power Automate: Always check the environment name (it opened in the default environment). Flows opened from a solution use the older designer; F5 there returns to the solution list.
- Check decisions.md before calling anything a bug. Check what a delete or reset touches first, and name what could be lost.
- Write pass/fail rules before tests run.
- Keep the design lean; time-box and say when something isn't teaching anything.
- Microsoft work only in the "jdmaurer Labs" profile. No billing edits right before a trial sign-up.
