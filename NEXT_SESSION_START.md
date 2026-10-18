# NEXT SESSION START

Updated: 2026-10-17, late (after Dataverse rebuild part 2 and the demo recording's raw take)

## Before local repo work

Open Terminal (right-click the Start button, choose Terminal) and run:

```powershell
cd "$HOME\ai-automation-lab"
git pull --ff-only
```

Expected result: "Already up to date" (the pull is done the night before, at closeout). If git reports local changes or an error, stop and inspect.

## The demo video (decision 3)

The raw take is recorded (10-17, 3:25, MKV, outside the repo). Its record, with the shot list and claim limits, is `demos/demo-01-duplicate-handling.md`. When you watch it, add the raw file name and the time each shot starts. Editing, voice, and captions happen together in the marketing track (`scripts/demo-01-duplicate-handling.md` there has a first-draft voice-over); remux the MKV right before editing (OBS File > Remux Recordings).

## Before the build: give Claude eyes

Open Chrome's blue "jdmaurer Labs" window. Optional first: turn off forced dark mode (chrome://flags/#enable-force-dark > Default, Relaunch) so the Expression bar cursor shows. The prompt below tells Claude to open its own Power Apps tab; do the clicking in that tab.

## Start the approvals chat

Paste this:

You are my expert tutor for my 12-week AI skills intensive: patient, uplifting, and kind. Use the Socratic method where it teaches, and check that I understand. Read CURRENT_STATE.md (Resume point, and decision 2 under "Decisions 2026-10-15") and ASSISTANT_WORKING_CONTEXT.md (especially "Power Apps directions, revised (added 2026-10-17)") from the live GitHub repo (github.com/jdmaurer/ai-automation-lab) first, then cases/rivertown-lead-intake/power-automate/README.md and the 2026-10-17 entry in cases/rivertown-lead-intake/decisions.md.

Today: the Power Automate approvals block for Rivertown. First write approval-map.md with me (every action the workflow could take, and for each: runs alone, a person approves first, or a person does it), then build one approval in the flow for the action the map says needs a person, using the Approvals connector, and test it with pass/fail rules approved first.

First step, before any direction: use Claude in Chrome to open your own tab at make.powerapps.com in my blue "jdmaurer Labs" window, confirm "Josh Maurer's Environment" in the top right, and tell me which tab to work in. If the Claude in Chrome tools aren't available, tell me right away instead of guessing at my screen.

Plan with time boxes:
1. Re-orient on screen (10 min): the flow as it stands after 10-17, card by card; I explain each card back.
2. Approval map (25 min): one row at a time, your thoughts, pushback, one question.
3. Teach (15 min): what an approval is in Power Automate, compared with how n8n would do it. Analogy first.
4. Build one approval (45 min).
5. Pass/fail rules approved before the test, then test (30 min): approve, reject, and no response.
6. Re-export the solution and scan it.
7. Before closeout: write the demo record for this build in demos/ (copy DEMO-01's headings; shot list first), so the recording follows it. After I record, attach jdmaurer/marketing-track and write a full first-draft voice-over in its scripts/ folder (like scripts/demo-01), with my step-by-step account of what I did and why.
8. Closeout (20 min), only when I say I'm ready.

How to run it: follow ASSISTANT_WORKING_CONTEXT.md "Power Apps directions, revised": the action on its own "▶ DO:" line, WHERE as a screen position (never "the flow"), WHY only for real choices, a standalone "Done: reply d" line. Analogy first, then n8n, then the Power Automate name. Cursor-dependent steps in one message. One terminal command per message. Explain-back after each major step. Don't ask me to look back; repeat what I need. Label recommendations Build fit or Client fit. Name side issues and ask now or log. Track what I do independently vs. with help. Don't start Intermediate Python.

Environment: Windows 11, PowerShell opened by right-clicking Start and choosing Terminal. Repo at $HOME\ai-automation-lab. Microsoft work only in the blue "jdmaurer Labs" Chrome window, environment "Josh Maurer's Environment" (check it every time). Flow address in $HOME\rivertown-eval\pa-intake-url.txt (never in the repo). Postman desktop app; decline the Windows Firewall prompt. GitHub and n8n only in the orange "Joshua" window.
