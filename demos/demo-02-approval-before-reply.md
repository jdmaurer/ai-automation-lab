# DEMO-02: A person signs off before the first reply goes out

| | |
|---|---|
| Build | [Rivertown lead intake](../cases/rivertown-lead-intake/): Power Automate flow "Rivertown - Lead Intake (Power Automate) v1" with Dataverse and the Approvals connector |
| Recorded | 2026-10-18, as the live test run of T8 (run 2) to T10, paused during waits and fixes. Raw take 10:48, silent, remuxed to MP4. The T10 wait is shown minute by minute, to be sped up in editing |
| Raw file | On Josh's computer, outside the repo: `Videos\Demos\DEMO-02_raw_2026-10-18.mp4`. A 0:51 aborted first take (T8 run 1, the bug) stays unused in the OBS folder |
| Status | Raw recorded. Script (first-draft voice-over): marketing track, `scripts/demo-02-approval-before-reply.md` (private) |

## The business problem

When a lead comes in, the firm has two jobs that pull against each other: answer fast, and don't send anything careless with the firm's name on it. Automating the first reply makes it fast but risky; leaving it to a person makes it safe but slow. Rivertown Professional Services is a made-up 30-person consulting firm; all data is synthetic.

## What it proves

1. The prospect gets an instant "received" (200) before any person is involved.
2. The team lead gets an approval request with the draft reply and four choices: Send draft, I'll write it myself, Wrong team, Not a fit.
3. Whatever the team lead clicks is written on the lead as a plain-language status (reply approved, writing personal reply, needs routing, closed).
4. If nobody answers in time, nothing goes out and the lead is marked overdue.

## Shot list

Pause the recording at every PAUSE and whenever something needs fixing.

| # | On screen | Proof to see (circle with the mouse ~3 s) |
|---|---|---|
| 1 | Postman, request "T8 Send draft", Body tab (external_id PA-APR-004 after the first try failed): Send | 200, "received", within seconds |
| 2 | Chrome, Power Automate, Approvals: Refresh, open "First reply to lead PA-APR-004 needs approval" | The draft text and the four buttons |
| 3 | Click Send draft, then Confirm | The approval moves to Received/History |
| 4 | Chrome, Power Apps, Leads table: Refresh | PA-APR-004, status "reply approved" |
| 5 | Postman, "T9 Write it myself" (PA-APR-002): Send | 200, "received" |
| 6 | Approvals: open PA-APR-002, click I'll write it myself, Confirm | The button choice |
| 7 | Leads: Refresh | PA-APR-002, status "writing personal reply" |
| 8 | Postman, "T10 No response" (PA-APR-003): Send. Approvals: show PA-APR-003 waiting; do not click | 200; the request is waiting. PAUSE about 6 minutes |
| 9 | Leads: Refresh | PA-APR-003, status "overdue" |

## Must never appear

- The flow's web address: it contains the secret key (`sig=`). Postman shows `{{pa_intake_url}}`; never hover over it, and never open the Params tab of an original request.
- The flow details page, and the trigger card inside a run (both can show the account email or the address).
- Any email address on the approval panel. Claude checks the panel before step 2 is recorded; if an address shows, keep the mouse and the circle away from it and crop it in editing.

## Claim check

The script and captions describe only what is on screen; they don't list what the build doesn't do (that lives in [limitations.md](../cases/rivertown-lead-intake/limitations.md) and the [approval map](../cases/rivertown-lead-intake/approval-map.md)). One line not to cross on screen: don't say the reply email is sent. Here, Send draft records the approval as a status.

## Re-shoot setup

Use new external_ids (PA-APR-005 onward; 001 to 004 are used). Answer each approval within the 5-minute limit. One app at a time, maximized on the monitor OBS records; switch apps during pauses (the PowerToys layout scattered the windows on 2026-10-18). Zoom in so text is readable on video: Postman text large, Chrome Ctrl + plus on each tab. Postman environment "Rivertown Power Automate". Leads table (Edit view) sorted by Created On, oldest to newest, so each new lead appears at the bottom; status added through "+ more". Power Automate open on Approvals with environment "Josh Maurer's Environment". OBS records the screen only (no mic).

## Evidence

Same runs as frozen tests T8 to T10: [test-cases.md](../cases/rivertown-lead-intake/test-cases.md), 2026-10-18. Decisions: [approval-map.md](../cases/rivertown-lead-intake/approval-map.md).
