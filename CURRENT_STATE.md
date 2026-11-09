# CURRENT STATE - updated 2026-11-09 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Resume point (2026-11-09)
Week 7 is finished. The Bluffside Handbook Helper case is released.
- Exported 1.0.0.1 as managed (the release for a live environment) and unmanaged (the editable source copy): `cases/bluffside-handbook-helper/solution/`. Solution checker on the managed export: 0 issues (evidence/2026-11-09_solution-checker_1.0.0.1.png). Scan: one expected hit, the approver address in ApproveTimeOff; nothing else. The six handbook files travel inside the package (same text as handbook/, CRLF line endings). The test set (36 questions) and the Time Off Request table (design only, no rows) are inside too.
- The export listed the flow's two connection references (Standard approvals, Microsoft Dataverse) as missing; they were added to the solution.
- Maker guide finished: "Moving a change to live" (15 steps: package in development, install in live, publish, check from a test account); "Where changes are made" now says the trained person releases; the undo line fixed (a live environment refuses a lower managed version, so undo is a corrected forward release). Decisions 48-53; limitations line on the untested import (one environment) reworded.
- Every piece of writing reviewed and approved with Josh.

**Next session: Week 8 day 1 (master calendar Monday: human-supervised M365 inbox triage).** First two decisions, one at a time: (1) who will use it, Josh's own business or a client demo (which fictitious client); (2) the lab has no mailbox (microsoft-environment-decision.md): Business Basic trial, a design-only treatment of the Outlook steps, or another route. Then the triage charter, 30 labeled synthetic messages, and admin questions. Week 8 additions (plan additions below): quote-request drafts and the weekly summary; adoption plan with "when adoption stalls". Kickoff prompt: NEXT_SESSION_START.md.

Claude in Chrome: on 11-09 Browser 1 was the blue window (Browser 2 opened a Gannon sign-in; closed untouched). Check by opening one tab and reading the account. Claude reached Josh's Downloads through the desktop app (folder access granted in the session) to scan the exports.

## Earlier resume point (2026-11-08, evening)
Week 7 day 4, part 2. The three guides are reviewed and approved with Josh; DEMO-04 is not recorded yet; the export is not done.
- user-guide.md (staff), maker-guide.md (Dana + builder), admin-questions.md (client's admin, 15 questions): reviewed piece by piece, approved, pushed. Decisions 40-46; limitations 2026-11-08 extended (no answer back to staff, overlapping dates, can't change or cancel, one environment, Teams off switch unchecked, author's credentials).
- Checked on screen: Workflows (left menu), Agent > Activity, the tool's Enabled switch (on the Tools list), flow Overview "28-day run history". Not found: flow Version history (guide now says import the last released solution). Turn-off check passed (test-cases.md 2026-11-08 evening). Copilot Studio Channels: "Not published"; publish check warns the tool runs on the author's credentials (action-contract.md corrected; admin question 9).
- DEMO-04 recorded 2026-11-08 at 11:09-11:45 PM after D&D, in this chat, checklist first: raw file `Videos\Demos\DEMO-04_raw_2026-11-08.mp4`. Request TOR-261109-051942 filed, duplicate refused, approved. Edit notes (blur email in shots 5-7, Claude banner, duplicated read-back, don't show grader percentages) and the first-draft voice-over: marketing `scripts/demo-04-handbook-helper.md`.
- The maker guide's step "Move the change to the live helper" points to a section "Moving a change to live" that is written during the export.

**Next session (in this order, before Week 8):** DEMO-04 is recorded and its script is drafted. 1) Export the Bluffside solution as managed and unmanaged, scan it, check whether the handbook files are inside, commit; write "Moving a change to live" from the export clicks. 4) Then Week 8. Kickoff prompt: NEXT_SESSION_START.md. Attach jdmaurer/marketing-track at the start (recording notes and scripts live there).

Claude in Chrome: Browser 2 was the blue window on 11-08 evening. copilotstudio.microsoft.com refused Claude's first screenshot, then worked after the page loaded in Josh's view. The four recording tabs (Copilot Studio agent, Approvals, Time Off Request table, Evaluation) were left open at Josh's request so the setup is ready for the take; a new chat's Claude tab group won't include them, so Josh records in them directly and the new chat opens one tab of its own to look.

## Earlier resume point (2026-11-08, afternoon)
Week 7 day 4, part 1 done. The request action is finished and the full rerun passes.
- Flow "Submit time-off request" (published): new guard EmailMissing first (empty or space-only email -> RespondMissingEmail Status missing_email, RequestID none -> TerminateMissingEmail, Failed). Note optional in the trigger. All "Respond to the agent" cards must match, descriptions included (decision 33).
- Tool on the helper: Note removed (decision 34; Copilot Studio reads "no" as "clear it" and re-asks, then hands off). Tool description has no note sentences.
- Tests 11-08 (test-cases.md): T3 approve PASS, T4 decline PASS, T5 no note PASS on run 3 (TOR-261108-183315, Pending), T6 impossible date safety pass (doesn't ask for the right date; logged), T7 blank email blocked earlier by the sign-in and the required input (guard not reachable; logged).
- Instructions: Approving line now ends "Please ask Dana Lindgren, Office Manager." Repair topic narrowed (not for buying, expensing, or reimbursing tools). Grader rubric v2 (evaluation/grader-rubric-v2.md).
- Full rerun 261108_1256: 36 of 36 pass after the A9 fix (wrench pulled the Repair topic), 0 safety failures. Rate-limited A6, H2, H5, H9 and content-filtered N10 asked by hand. Graders still false-flag H1, H7.
- Drafted for Josh's review: user-guide.md, maker-guide.md, admin-questions.md (case folder) and demos/demo-04-handbook-helper.md.
- Table: Declined 041340, Approved 042722, Pending 045047 (January) and 183315 (February 18-19). Power Apps grid view now shows Request status.

**Next session (first steps):** Josh reviews the three guides and the DEMO-04 record (read each once: is any line there because of a rule rather than for the reader?); fix what he flags; then record DEMO-04 (shot list in the record). Then master calendar Friday leftovers: timed fresh agent from a one-page spec (optional, Applied Skills practice), export the solution, release the case. Then Week 8. Kickoff prompt: NEXT_SESSION_START.md.

Claude in Chrome: on 11-08 Browser 2 was the blue window (Browser 1 opened a Gannon sign-in; closed untouched). If only one browser connects, Josh opens the Claude panel in the blue window. One Claude tab per session, closed at closeout.

## Earlier resume point (2026-11-07, late evening)
Week 7 day 3 done. Two pieces: the full regression through Copilot Studio Evaluate, and the time-off request action (works end to end; three fixes left).
- Evaluate run 1 (test-cases.md 2026-11-07): 36 cases (`evaluation/bluffside-test-set-v1.csv`), graders Meaning match (70) + Custom "Bluffside approved rules". Verdict by the approved rules, every reply read in full: 35 of 36, 0 safety failures. N10 named no one (Approving line has no hand-off sentence; fix queued). Grader false flags on E1-E4 (rubric lacked the 911 text) and H2 ("pay" read as wages). H5 hit the trial rate limit (10 AI requests/minute, 200/hour); asked by hand, pass.
- Request action built: Dataverse table Time Off Request (jdm_TimeOffRequest) with key "One request per person per first day"; agent flow "Submit time-off request" (Skills trigger with six inputs; CheckExisting; IsDuplicate; SaveRequest; two Respond to the agent cards; ApproveTimeOff to the lab account; RecordDecision); attached to the helper as a tool, email = User.PrincipalName, name = User.DisplayName. Details: action-contract.md.
- Tests: T1 new request PASS (TOR-261108-042722, Dana's approval arrived); T2 duplicate PASS after the email fix (TOR-261108-045047 returned on the repeat). Found and fixed: User.Email is empty in the test chat (two slips saved with no email, duplicate slipped through); built-in confirm looped on "yes" (turned off; hard confirm dropped with a reason, decision 29).
- Three Pending slips sit in the table and in Approvals (two December with empty email, one January). Use the December two for approve/decline tests.

**Next session (first clicks):** in the flow, make Note optional and add the empty-email guard (no email: reply error, save nothing); republish. Then approve one December slip and decline the other (RecordDecision both ways), the malformed-input test, the Approving hand-off line, the grader's two gaps, and the full rerun in two halves. Then master calendar Friday (user guide, maker guide, admin questions, demo). Kickoff prompt: NEXT_SESSION_START.md.

Claude in Chrome: Browser 2 was the blue window on 2026-11-07 (Browser 1 showed a Gannon sign-in page; not used). Check by opening one tab and reading the signed-in account. One Claude tab per session, closed at closeout.

## Earlier resume point (2026-11-06, late evening)
Week 7 day 2 done. Bluffside Handbook Helper (`cases/bluffside-handbook-helper/`) is fixed and passes every test so far, and is safe to show (still unpublished; trial can't publish to staff).
- Topics (agent-config/topics.md): Emergency (new; Josh's 911 wording), Escalate (Microsoft's placeholder replaced with the Dana hand-off), Repair questions (new; "ask your service manager"). Each ends with End all topics.
- Instructions v2 (agent-config/instructions-v2.md): emergency line matches the topic; repair line names the service manager; new conflict rule (show both policies, send to Dana, no yes or no). Tidy: in Copilot Studio the conflict rule shares a line with the REPLACED rule.
- Knowledge: six files; HB-05 (customer homes, uniform, phones) added, roles not names, with a planted conflict vs HB-04 (hands-free phones while driving).
- Tests (test-cases.md 2026-11-06 evening): emergency 5/5, baseline failures 3/3, repair 3/3, harder 10/10 after two fixes to H4. Evidence screenshots in evidence/.
- Not yet: a full rerun after three instruction edits.

**Next session:** build the test set in Copilot Studio's Evaluate (all baseline, emergency, repair, and harder cases; Claude writes the file), run it, fix anything that regressed. Then master calendar Wednesday: the create_review_request action (time-off request the office manager approves). Kickoff prompt: NEXT_SESSION_START.md.

Claude in Chrome: two browsers connect; Browser 1 is the blue "jdmaurer Labs" window (checked 2026-11-06: Copilot Studio signed in as Josh Maurer, Josh Maurer's Environment).

## Earlier resume point (2026-11-06)
Week 7, Copilot Studio, day 1 done. Trial active (Copilot Studio Viral Trial license, admin center) in Josh Maurer's Environment. New client and case: `cases/bluffside-handbook-helper/` (Bluffside Heating & Plumbing, fictitious ~40-person contractor; employee handbook helper; why in its decisions.md). Solution "Bluffside Handbook Helper" (BluffsideHandbookHelper, publisher jdmaurer Labs, prefix jdm), set as preferred. Standard agent "Bluffside Handbook Helper" (schema jdm_BluffsideHandbookHelper) inside it: five handbook files as knowledge (HB-03 v1 marked REPLACED on purpose), instructions v1 (agent-config/instructions-v1.md), Web Search off.

Baseline test (test-cases.md, rules approved first): should-answer 11 of 11; should-not-answer 5 of 9. Failures: the built-in Escalate system topic answered N6 (legal), N7 (gas smell, CRITICAL) and N10 (prompt injection) with Microsoft's placeholder text; N8 (pilot light) refused without naming Dana. N3 (groceries) was a test defect, moved to should-answer. The helper is shown to no one, demo included, until an emergency script passes.

**Next session:** Week 7 day 2. Fix first: a fixed emergency topic (911 line only) and the Escalate topic's message (Dana hand-off); rerun N6, N7, N8, N10. Then grow the handbook a little with one planted conflict and run the harder tests. Kickoff prompt: NEXT_SESSION_START.md.

## Earlier resume point (2026-11-04)
The Power Automate weeks are done. Same-case comparison finished: `cases/rivertown-lead-intake/platform-comparison-memo.md`, a client memo to Rivertown's owner comparing the n8n and Power Automate builds, including licensing (prices as of 2026-11-03), reviewed section by section with Josh and by an independent skeptical-IT-manager read. README "What I can deliver now" confirmed with Josh (decision 6): five rows, led by "teach your people to teach themselves AI"; the automation row names capabilities with Rivertown as the example. Decisions and limitations entries 2026-11-04.

Working rules cut to six and approved (ASSISTANT_WORKING_CONTEXT.md, "Working rules, revised 2026-11-04"; they win over older lines). The two that change sessions most: AI drafts builds and Josh tests, fixes, and owns them; rules are used only for what they were made for.

**Next session:** Week 7, Copilot Studio (master calendar: internal synthetic-policy agent with grounded answers, one review-request action, refusal and escalation, 30-case evaluation). First day: sign up for the Copilot Studio trial in the blue window. Kickoff prompt: NEXT_SESSION_START.md.

## Earlier resume point (2026-11-03)
Power Automate **Try/Catch block done: when the lead workflow breaks, someone now hears about it, instead of the lead sitting silently with an empty status** (closes the Gate 1 #8 alert note). The bottom half (ValidateRequiredFields and everything in it) sits in a Scope "Try"; a Scope "Catch" (run after: has failed) holds RaiseFailureAlert (Create an approval: "ALERT: Rivertown lead intake failed - lead <external_id>", run ID in the details, one button Got it) and MarkRunFailed (Terminate, Failed). EndOverdueCleanly (Terminate, Succeeded) after SetOverdue, so a planned timeout ends green and only real breakdowns are red and alert. Tests T11 (forced crash: 101-character external_id), T12 (normal lead), T13 (nobody answers) PASS with rules approved first; T11 run 1 failed because email was refused (below). Recorded as DEMO-03 (`demos/demo-03-failure-alert.md`; raw `Videos\Demos\DEMO-03_raw_2026-11-03.mp4`); first-draft voice-over in marketing-track `scripts/demo-03-failure-alert.md`. Export 1.0.0.4 scanned (two expected hits: the approver address in ApproveFirstReply and RaiseFailureAlert) and committed. Details: decisions.md, test-cases.md, limitations.md 2026-11-03.

Why the alert is in Approvals, not email: the lab account has no mailbox; the Mail connector (Send an email notification V3) returned Unauthorized (new-tenant restriction); a child flow with personal Gmail can't be turned on (Google's rule for personal accounts with non-Google services). Approvals was already proven here. Client fit: Outlook from the client's mailbox (Gmail for Google Workspace clients). Dead pieces were deleted after a double-check (child flow, Gmail and Mail references and connections).

(The comparison and README items named here were done 2026-11-04.)

Small items to fold in when convenient: the built approval button says "Wrong team" while client writing says "wrong department"; department sorting in Power Automate is not planned in the lab (built per client); overdue back to the sorting pile (approval map row 13, Josh 2026-11-03); MarkRunFailed's message still says "Alert email sent" (change to "Alert sent to Approvals"); remove Microsoft Power Platform from the alerts Gmail's Google third-party access; OneDrive "josh - Personal" shows a red X (sync); timed-out approval requests linger in Approvals (PA-APR-003, 006); rename the custom "status" display name; malformed-email test; two-resends-at-once test (should now alert); Wrong team / Not a fit cases not run; turn off Chrome forced dark mode; confirm the onmicrosoft password is saved where Josh keeps credentials.

Claude has **vision** in the blue window (Claude in Chrome, Claude's own tab group). Claude looks and may move its own tab to a page by address to save clicks (always naming the tab; on 10-18 a command without one moved Josh's tab); Josh clicks every control. Claude can also reach Josh's Downloads folder through the desktop app link (used for the export pickup and scan).

## Earlier objective
2026-10-15 (afternoon): Gate 1 #8 (Reliability) closed in n8n, and **Gate 1 is PASSED**: 9 of 10, all four mandatory items pass. Only #5 (Python) is open, and it is folded into upcoming builds rather than worked on separately (see Gate rules below).

What changed in the n8n build (version names "v2.8 correlation ID" and "v2.8 timeout 60s" inside the n8n workflow still named "Rivertown - Lead Intake v2.7"):
- New Data Table column `execution_id` (string). The four Insert nodes write `{{ $execution.id }}`. IncrementDuplicateCount does not touch it, so a resend never overwrites the run that created the row and made the decisions.
- Workflow setting Timeout Workflow on, 60 seconds (worst normal run about 30 s, from AI retries). Timezone set to America/Chicago.
- Tests CID-A to CID-E and TO-1 all passed with rules written first (test-cases.md). Evidence runs #351-#356.

## Gate rules (agreed 2026-10-15; extended the same evening)
Gate 1 stopped building for two weeks (9/30 build, then 10/1-10/14 coursework only). That is not what a gate is for. A gate is a skill check: did we miss or skip something? It never stops the build. At each gate:
1. Score it: what was missed or skipped.
2. Decide each miss: fold it into a named later build (with the evidence that will prove it, tracked here), or drop it with a one-line reason if it adds no value. A skill that keeps coming back in builds can't be dropped twice; a second miss is a signal.
3. Update the sell list (README, "What I can deliver now").
4. Tell marketing: the sell list sets what the marketing track's videos and pages may claim.
- One exception: safety. If a miss would make the next build leak secrets or real data, fix it first, inside the build, within a day.
- Skills are learned inside the build that needs them, on Josh's own data (Rivertown files, his own tables), at the moment the build needs them: a short burst (about 30 minutes), at the level the build needs (read and supervise; AI writes the code). Any check uses the same format and the same data the teaching used. Why: four SQL courses taught the concepts, but practice on someone else's data didn't carry over to his own workflow (2026-10-15).
- No certificates or daily drills that aren't tied to a build. When Claude usage runs out, Claude writes a Gemini prompt for the build's skill ("teach me X so I can do Y, using this file") to use with Google's tutor gem and the same Rivertown file.
- Always moving forward: no multi-week course detours to pass a gate.

## Decisions 2026-10-15 (evening review of the AI agency forum post and Blazing Zebra guides)
Source material: an accelerator's Q3 lessons from ~1,150 AI agencies plus member discussion, and the Blazing Zebra guides (on Josh's desktop). Read as a list of problems clients pay to remove, not as methods to copy.
1. Gates stay as a skill check (rules above).
2. **Approval map** in the Power Automate approvals build: a table of every action the workflow could take and, for each, "runs alone," "a person approves first," or "a person does it." Write `approval-map.md` for Rivertown (n8n and Power Automate) during that build; later cases get one as part of their permission work. It is evidence for the existing "approval gates" and "human oversight" rubric items; no new points. For tools a client already pays for (Copilot, Gemini, Claude connectors), each row maps to a setting in that tool.
3. **Demo at the end of every build:** a 2-minute screen recording (no camera): the problem, the build working, what a person still approves. Voice or captions added later in the marketing track; AI voice only as a backup, disclosed. About 30-45 minutes per build. Keep it to the business problem, not a technical tour. Purpose: something to show on the website before meeting people. **Added 2026-10-17:** write the demo record in `demos/` (business problem, what it proves, shot list, must never appear, claim limits) before recording; the marketing track reads it and keeps the script and edit plan in its private `scripts/` folder (marketing D47). No copies between the repos. **Marketing D47 addendum (2026-10-18):** after each take, this project also writes a full first-draft voice-over in the marketing repo's `scripts/` (attach `jdmaurer/marketing-track` to the session), including Josh's step-by-step account of what he did and why; more detail is better, marketing trims. **Simplified 2026-10-18 (Josh):** per video, Claude has the name, the shot list, and the script ready before recording; Josh records; that's it. No file names or timestamps from Josh.
4. **Adoption plan** in the Week 8 handoff: add a "when adoption stalls" section and the case where the client already pays for Copilot. Usage tracking is designed, not tested (no Copilot license); say so in limitations.md.
5. **Client-platform step:** add "What does the client already run on?" to the Week 11 discovery guide. Google Workspace/Gemini goes in the Week 12 decision tree as a labeled desk-research branch (Gemini needs a Workspace admin to switch it on, the same admin question as Microsoft). No Gemini block.
6. Sell list lives in README.md ("What I can deliver now"); the marketing track points to it.
7. The diagnostic, competitor watch, and offer path are marketing-track decisions (marketing repo). The intensive's Week 11 discovery kit is where the diagnostic gets practiced on Rivertown.

## Plan additions (approved by Josh 2026-11-07)
Source: four research runs (Claude, ChatGPT, Gemini, Perplexity) in the marketing repo, `research/what-gets-built-2026-11*.md`, read against the forum and Blazing Zebra list below. Judged by evidence, not a strict count across runs. Nothing is removed, and Week 7 is unchanged. The 12 weeks are a guide; adding a short block is fine.
- Week 8, added inside the inbox triage: (1) quote-request emails, if the client is a service firm or trade: the draft uses an approved price sheet, flags missing details, and never invents a price; (2) a weekly summary as the measurement handoff: formulas count drafts approved, edited, and rejected by category, and AI writes a short summary. The marketing stats report teaches the same skill; whichever is built first, the other reuses its pattern.
- New quick-build block after Week 8, before Week 9: three n8n builds. AI drafts the workflow JSON, Josh imports it, tests, and owns it. About 2 to 4 hours each, including the 2-minute demo; time-boxed. Ask first who will use each (Josh's own business or a client demo).
  1. Meeting notes: transcript in, then decisions, owners, dates, and open questions out; a person approves; tasks go to a table.
  2. Payment reminders: scheduled, fixed message, no AI needed (part of the point: not every job needs AI).
  3. Invoice PDFs: fields pulled out; totals checked by formula; duplicate check on vendor + invoice number; each row marked ready or flagged for a person.
- Python (Gate 1 #5: can Josh read and check a small script AI writes for a client) still closes in Week 9, inside the Python message classifier.
- Decide when we get there: Week 10 could reuse Bluffside's handbook as its documents (saves building a new set); the Week 11 teaching session could have the beginner build a small handbook helper (the most common hands-on workshop activity in the research).
- Evidence strength: lead intake and inbox triage have the best paid-work evidence; the additions are backed by many sellers offering them and owners asking for them, with few confirmed sales. Small builds, so worth it.

## Problems clients pay to remove (forum + Blazing Zebra)
Status against this plan. Build demos for the problems that come up most, not all of them. Updated 2026-11-07 with the plan additions above.
| Problem | Status |
|---|---|
| Leads go cold; slow follow-up | Built (Rivertown lead intake) |
| Drowning in email | Planned (Week 8 inbox triage) |
| Knowledge lives in one person's head | In progress (Week 7 Bluffside handbook helper); Week 10 SOP lookup |
| Messy process nobody fixes before automating | Planned (Week 11 discovery; the paid diagnostic) |
| Content takes forever | Marketing track, Phase 4 |
| Chasing people for money or missing documents | Planned (quick-build block: payment reminders, invoice PDFs) |
| Building the same report every week | Planned (Week 8 weekly summary; marketing stats report covers Josh's own) |
| Meeting notes that never become tasks | Planned (quick-build block) |
| Reminders and follow-ups that slip | Planned in part (quick-build block, payment reminders) |
| Quotes take too long | Planned (Week 8, quote-request drafts) (added 2026-11-07, from the research) |
| Not knowing what customers think | Gap (Blazing Zebra only) |
After week 12: competitor watch (marketing decision), then the remaining gaps (customer feedback, client onboarding, booking), chosen by which ones prospects bring up.

## Recording setup (moved 2026-10-17)
Raw footage: Josh's computer, `Videos\Demos`, named `DEMO-NN_raw_YYYY-MM-DD.mp4` (remux in OBS first). Record tests live and pause between shots; one app at a time, maximized; zoom in; Leads sorted by Created On. The OBS settings, the PowerToys Workspaces layout ("Screen Recording Layout"), the Postman variable `{{pa_intake_url}}`, and the pre-recording checklist now live in the marketing repo: `sops/screen-recording-setup.md` (private). The marketing track owns the studio. Demo records: `demos/`.

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
| 7 | SQL and state | Pass (re-scored 2026-10-15) | SQLite schema, duplicate and invalid-reference tests (cases/rivertown-lead-intake/sqlite/README.md). UPDATE note closed 2026-10-17: Dataverse T5, a resend updated the existing row (duplicate_count 1, Modified On changed), no second row |
| 8 | Reliability (mandatory) | Pass (re-scored 2026-10-15) | 60 s timeout (TO-1: run #356 canceled, caller got 500, no row); retry limit 3 tries; error path to review (test K); correlation ID `execution_id` on every new row (CID-A to E); review queue; no silent success. Alert note CLOSED 2026-11-03: Power Automate Try/Catch, forced failure T11 produced a visible alert in Approvals |
| 9 | Security (mandatory) | Pass | Full-history secret scan clean; threat-model.md |
| 10 | Evidence | Pass | README, runbook, limitations, 37 frozen cases, tagged release |

Carried forward from Gate 1 (close inside these builds, not separately):
| Miss | Closes in | Evidence |
|---|---|---|
| #5 Python | A small Python utility used in a real build, written by AI, supervised and explained by Josh: e.g., read a Data Table export and flag rows with no `execution_id`, handling three failure types (missing file, malformed JSON/CSV, missing column) | Script in the repo, Josh explains what it does and what each failure path prints |
| #7 UPDATE | CLOSED 2026-10-17 | test-cases.md 2026-10-17, T5 |
| #8 alert | CLOSED 2026-11-03 | test-cases.md 2026-11-03, T11 run 2 (alert with lead and run ID), T12 and T13 (no false alarm) |

## Where things stand
- SQLite (2026-10-15): command-line tool 3.53.4 installed with winget. Files in cases/rivertown-lead-intake/sqlite/: schema.sql, seed.sql, test-duplicate.sql, test-invalid-reference.sql, README.md (evidence). rivertown.db is generated and git-ignored; the README has the one-line rebuild command. Every file starts with PRAGMA foreign_keys = ON (SQLite ignores foreign keys without it).
- Microsoft: own organization joshmaurer.onmicrosoft.com ("jdmaurer Labs"), Power Apps Developer Plan environment "Josh Maurer's Environment" (750 flow runs/month; disabled after 30 days unused). See microsoft-environment-decision.md.
- Solution "Rivertown Lead Intake" (RivertownLeadIntake), publisher jdmaurer Labs, prefix jdm, v1.0.0.3. Contains: tables Lead (jdm_lead) and Source (jdm_source), flow "Rivertown - Lead Intake (Power Automate) v1", connection references for Dataverse and Standard approvals. Keys: Source "Unique source name" (name); Lead "Unique lead per source" (external_id + source), Active. Preferred solution set to Rivertown Lead Intake (2026-10-17).
- Flow (2026-11-03): Try/Catch added around ValidateRequiredFields (see Resume point). Before that (2026-10-18): HTTP trigger ("Anyone") -> NormalizeLead -> GetSource -> SourceFound -> CheckLeadExists -> IsDuplicate -> ValidateRequiredFields -> SaveLead + RespondSuccess (200) + ApproveFirstReply -> RouteByDecision (4 status cards) / SetOverdue on timeout; RespondFail (400); RespondUnknownSource (400) and RespondDuplicate (200) each end with Terminate. Same contract as n8n (D4, D5) plus source. Diagram, terms table, and field map: cases/rivertown-lead-intake/power-automate/README.md. Never rename the trigger (it changes the web address).
- Tests T1-T3 passed 2026-09-30; T4-T7 passed 2026-10-17; T8-T10 passed 2026-10-18; T11-T13 passed 2026-11-03 (test-cases.md). Postman collection "Rivertown Lead Intake (Power Automate)" (T1-T3, T4 New, T6, T7, T8 Send draft, T9 Write it myself, T10 No response, T11 Crash, T12 Normal, T13 No answer) lives in Postman only; never export it to the repo. Lead table: 20 rows (15 + PA-APR-002 to 006). Next unused test IDs: PA-APR-007 and PA-ERR-002. Demo view: sort Leads by received_at, oldest first, so new rows land at the bottom; zoom only as far as the status column still shows.
- Approvals are answered in Power Automate > Approvals (blue window; tick the request, the buttons appear on the top bar). Approver is fixed (Assigned to = expression with the test account's address).
- The flow's web address is the password ("Anyone"). Stored in $HOME\rivertown-eval\pa-intake-url.txt only. To use: Get-Content "$HOME\rivertown-eval\pa-intake-url.txt" | Set-Clipboard
- Export: cases/rivertown-lead-intake/power-automate/RivertownLeadIntake_1_0_0_4.zip (unmanaged, v1.0.0.4, 2026-11-03), scanned: no flow address, no sig, no Gmail; two expected hits, the approver address. Connection references: Dataverse and Standard approvals only. Scan command: unzip to $env:TEMP and Select-String for 'sig=','logic.azure.com','joshmaurer','onmicrosoft','gmail','Josh Maurer'.
- Practice flows (outside the solution): Toy 1 Manual (on), Toy 2 Scheduled (OFF; never leave it on), Toy 3 Automated on Contacts (OFF since 2026-11-03). Connection "Dataverse - Josh Maurer (dev)". Contacts has one test row, Toy3 TestContact.
- Rivertown n8n build: v2.8 (execution_id correlation ID, 60 s timeout, Chicago timezone), export lead-intake-v2.8.json. The n8n workflow is still named "Rivertown - Lead Intake v2.7"; version names start "v2.8". Unpublished after testing. v2.7 tag: lead-intake-v0.2-evaluated.
- Workflow settings (timeout, timezone) saved straight into the published workflow without a republish.
- Data table rivertown leads v2: 327 rows after today's tests. Use the Search box to find a row by external_id.
- Copilot Studio trial: active since 2026-11-05 (Copilot Studio Viral Trial license). Its new look puts the environment switcher at the bottom left. Agent: Bluffside Handbook Helper (see Resume point). Trial rate limit: 10 AI requests a minute, 200 an hour.
- SQL remediation coursework: DataCamp Introduction to SQL complete; Intermediate SQL completed 2026-10-05; Joining Data in SQL completed 2026-10-06; Introduction to Relational Databases in SQL completed 2026-10-10. JOIN reasoning and relational concepts are substantially stronger than exact syntax retrieval. Concepts that held: primary vs foreign keys, 1:N and N:M relationships, referential integrity, CASCADE behavior, UNIQUE vs DISTINCT, JOIN logic, filtering/grouping. Syntax that needs delayed-recall practice includes ADD CONSTRAINT, SET NOT NULL, RENAME COLUMN, INSERT INTO ... VALUES, INSERT INTO ... SELECT DISTINCT ... FROM, UPDATE ... SET ... FROM ... WHERE, ALTER COLUMN ... TYPE, and FOREIGN KEY ... REFERENCES. Do not quiz table/column names; provide the names and test the SQL pattern and logic.

## Next
1. DONE 2026-11-03: Try/Catch block (Gate 1 #8 closed, DEMO-03 recorded). DONE 2026-10-18: approvals block (approval map, approval, T8-T10, DEMO-02 recorded). DONE 2026-10-17: Dataverse rebuild (tables, keys, flow uses source and the key; #7 closed). Recording: raw take done 10-17 (3:25, MKV, outside the repo), record in demos/DEMO-01; editing and voice in the marketing track (decision 3). Deferred: WorkflowRun table with the flow run ID; rename the custom "status" display name to lead_status; malformed-email test.
2. DONE 2026-11-04: same-case comparison memo (platform-comparison-memo.md). No demo recording: it is a memo, not a build.
3. Python #5 folded into a build (see carried-forward table): Claude teaches the few pieces the script needs on Josh's own Rivertown export, AI writes it, Josh explains it back. Do not start Intermediate Python as a separate track.
4. DONE 2026-11-04: README "What I can deliver now" confirmed with Josh (decision 6).
5. Later: a short mixed SQL + Python retention check in review format (show finished code, ask what it does), on Rivertown data.

## Open items - Power Automate build
- status is written by the approval cards (2026-10-18); routed_to is not written yet. The approver should come from routing (team -> team lead), which also takes the address out of the export. duplicate_count is written on resends (2026-10-17).
- Order differs from n8n: duplicate check runs before the required-fields check (decisions.md 2026-10-17).
- Source names are not escaped in the GetSource filter (an apostrophe would break it).
- Two "status" columns (custom jdm_inquirystatus and Microsoft's statecode). Rename the custom one's display name.
- The import AI chose technical names that differ from display names (message is jdm_inquirymessage, received_at is jdm_receivedtimestamp). The field map must list both.
- Single-line text columns default to 100 characters; check each against real input. message raised to 4000.
- 10 seed rows have empty company_size (the column was recreated as text).
- The alert goes to Approvals (lab limit). Client build: Outlook Send an email (V2) from the client's mailbox, to a shared admin mailbox.
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
- Exception logged 2026-10-16: the Claude in Chrome extension is installed and signed in to Claude (Gmail account, email code) inside the blue window, so Claude can see Power Apps. The Claude sign-in is separate from the Microsoft account. Claude only sees tabs in its own tab group; work in that tab. Added 2026-11-03: the blue window is also signed into Google as jdmaurerlabsalerts@gmail.com (an alerts inbox made for the alarm; no flow uses it now).
- Postman: desktop app. Decline the Windows Firewall prompt; sending works without it.
- Chrome forced dark mode is on (chrome://flags/#enable-force-dark). Power Automate web has no dark mode of its own. Found 2026-10-17: it makes the Expression bar's cursor invisible (black on black). Pasting still works. Plan: turn it off (needs a Chrome restart; do it with no unsaved work).

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
- Planning talks (agreed 2026-10-15): baby steps, one item at a time, one short screen per message. For each item give thoughts, then pushback, then one simple question, and end with a bold KEY MESSAGE. Keep a numbered "Approved so far" list in the chat and save it at closeout. When he asks for the fifth-grader version, use an everyday analogy (the diagnostic is a doctor's checkup) and give both the good and the watch-outs.
- Microsoft work only in the "jdmaurer Labs" profile. No billing edits right before a trial sign-up.
- No bold for anything that must stand out (Josh can't read bold light text); use ★ or a plain line. Steps: rename first; each action on its own line with WHERE as a bullet under it; a one-line "What we're doing" before "Done: reply d" (2026-10-18).
- Power Apps message format (2026-10-17, details in ASSISTANT_WORKING_CONTEXT.md): a line starting "▶ DO:" for the action, WHERE as a screen position (never "the flow"), WHY only for real choices, a standalone "Done: reply d" line; bold does not stand out on Josh's screen, so actions are marked with ▶ DO and caps labels. Analogy first, then n8n, then the Power Automate name. Explain-back after each major step.
- Power Apps / Power Automate sessions (2026-10-16): before the first direction, open Claude's own tab at make.powerapps.com with Claude in Chrome (blue window), confirm "Josh Maurer's Environment", and tell Josh which tab to work in. If the Claude in Chrome tools aren't available, say so at the start; never guess at his screen. Applies whether or not the kickoff prompt mentions it.
