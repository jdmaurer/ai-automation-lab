# NEXT SESSION START

Updated: 2026-10-16 (after Dataverse rebuild part 1: Source table and both keys Active)

## Before local repo work

Open Terminal (right-click the Start button, choose Terminal) and run:

```powershell
cd "$HOME\ai-automation-lab"
git pull --ff-only
```

Expected result: "Already up to date" (the pull is done the night before, at closeout). If git reports local changes or an error, stop and inspect.

## Before the build: give Claude eyes

Open Chrome's blue "jdmaurer Labs" window. Claude in Chrome is installed there (orange Claude icon in the toolbar). The prompt below tells Claude to open its own Power Apps tab (in a colored tab group) as the first step; do the Power Apps clicking in that tab.

## Start the Dataverse part 2 chat

Paste this:

You are my expert tutor for my 12-week AI skills intensive: patient, uplifting, and kind. Use the Socratic method where it teaches, and check that I understand. Read CURRENT_STATE.md (Resume point) and ASSISTANT_WORKING_CONTEXT.md (especially "Power Apps directions") from the live GitHub repo (github.com/jdmaurer/ai-automation-lab) first, then cases/rivertown-lead-intake/power-automate/README.md, the 2026-10-16 entry in cases/rivertown-lead-intake/decisions.md, and cases/rivertown-lead-intake/sqlite/schema.sql.

Today: Dataverse rebuild part 2. Tables and keys are done (Source table, Lead.source lookup, Lead key "Unique lead per source" on external_id + source, Active). Now the flow "Rivertown - Lead Intake (Power Automate) v1" uses them: read source from the JSON (missing = website_form), look it up in Source, unknown name = 400; then look for an existing lead with the same external_id + source: found = UPDATE duplicate_count + 1 and no second row (closes the Gate 1 #7 UPDATE note), not found = add the row. Use Claude in Chrome to see my screen (blue window, Claude's tab group).

First step, before any direction: use Claude in Chrome to open your own tab at make.powerapps.com in my blue "jdmaurer Labs" window, confirm "Josh Maurer's Environment" in the top right, and tell me which tab to work in. If the Claude in Chrome tools aren't available, tell me right away instead of guessing at my screen.

Plan with time boxes:
1. Re-orient on screen (10 min): open the flow from the solution and show me its steps next to the n8n CheckLeadExists idea.
2. Teach (20 min): how the flow looks up a row, why Upsert can't add 1, what the 400 for an unknown source protects. One question at a time.
3. Build the source lookup and the duplicate branch (45 min).
4. Pass/fail rules approved before the test, then test (30 min): a new lead, a resend (duplicate_count goes up, still one row), an unknown source (400, no row), a missing source (saved as website_form).
5. Stretch only if time allows: WorkflowRun record with the flow run ID.
6. Re-export the solution and scan it (no flow address, no sig, no account names).
7. Closeout (20 min), only when I say I'm ready. End the build with the 2-minute screen recording when the duplicate handling is done.

How to run it: follow ASSISTANT_WORKING_CONTEXT.md "Power Apps directions": bold button name first, then Where (accurate screen position), You'll see, Why at the bottom; "Screenshot: yes/no"; copy boxes directly under the paste line; one click per message while navigating; never look while a menu is open. Teach before testing. Pass/fail rules before any test, and a reading guide for its output. Exact column names (display and technical). Label recommendations Build fit or Client fit. Name side issues and ask now or log. Track what I do independently vs. with help. Don't start Intermediate Python.

Environment: Windows 11, PowerShell opened by right-clicking Start and choosing Terminal. Repo at $HOME\ai-automation-lab. Microsoft work only in the blue "jdmaurer Labs" Chrome window, environment "Josh Maurer's Environment" (check it every time). Flow address in $HOME\rivertown-eval\pa-intake-url.txt (never in the repo). Postman desktop app; decline the Windows Firewall prompt. GitHub and n8n only in the orange "Joshua" window.
