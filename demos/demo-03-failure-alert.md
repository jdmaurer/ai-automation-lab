# DEMO-03: When something breaks, someone hears about it

| | |
|---|---|
| Build | [Rivertown lead intake](../cases/rivertown-lead-intake/): Power Automate flow "Rivertown - Lead Intake (Power Automate) v1", Try/Catch block (2026-11-03) |
| Recorded | Planned 2026-11-03, as the live test runs T11 to T13, paused during waits and fixes |
| Raw file | On Josh's computer, outside the repo: `Videos\Demos\DEMO-03_raw_2026-11-03.mp4` (remux in OBS first) |
| Status | Record written before recording. Script (first-draft voice-over): marketing track, `scripts/` (private) |

## The business problem

Automations fail quietly. A step breaks, the tool marks a red line in a log nobody opens, and the lead just sits there. The firm finds out weeks later, when the prospect has already gone with someone else. Rivertown Professional Services is a made-up 30-person consulting firm; all data is synthetic.

## What it proves

1. When a step really breaks, an alert lands in the Approvals inbox of the person who looks after the workflow, with the lead's ID and a Got it button.
2. A normal lead still goes through exactly as before: instant "received", the team lead approves, the status is written, and no alert.
3. A slow team lead is not a breakdown: when nobody answers in time, the lead is marked overdue and no alert goes out. The alarm rings only when something breaks.

## Shot list

Pause the recording at every PAUSE and whenever something needs fixing.

| # | On screen | Proof to see (circle with the mouse ~3 s) |
|---|---|---|
| 1 | Postman, request "T11 Crash", Body tab: point at the very long external_id, then Send | An error comes back, not "received" |
| 2 | Chrome, Power Apps, Leads table: Refresh | No PA-ERR row |
| 3 | Chrome, Power Automate, Approvals: Refresh. PAUSE until it arrives | The request "ALERT: Rivertown lead intake failed - lead PA-ERR-001..." |
| 4 | Open the alert | The lead ID, the run ID, and the Got it button |
| 5 | Postman, "T12 Normal" (PA-APR-005): Send | 200, "received", within seconds |
| 6 | Power Automate, Approvals: Refresh, open "First reply to lead PA-APR-005 needs approval", click Send draft, Confirm | The choice |
| 7 | Leads: Refresh | PA-APR-005, status "reply approved" |
| 8 | Approvals: Refresh (2 minutes after step 6) | No new ALERT request |
| 9 | Postman, "T13 No answer" (PA-APR-006): Send. Approvals: show PA-APR-006 waiting; do not click | 200; the request is waiting. PAUSE about 6 minutes |
| 10 | Leads: Refresh | PA-APR-006, status "overdue" |
| 11 | Approvals: Refresh | Still no new ALERT request |

## Must never appear

- The flow's web address: it contains the secret key (`sig=`). Postman shows `{{pa_intake_url}}`; never hover over it, and never open the Params tab of an original request.
- The flow details page (its connection list shows the account email) and the trigger card ("manual") inside a run.
- Any email address on the approval panel. Keep the mouse away; crop in editing if one shows.
- The old PA-APR-003 request still sits in Approvals (left over from T10). Leave it alone; don't circle it.

## Claim check

The script and captions describe only what is on screen; the gaps live in [limitations.md](../cases/rivertown-lead-intake/limitations.md). Lines not to cross: don't say the prospect is emailed (no reply is sent; approving writes a status), don't say the alert tells you what broke or fixes it (it names the lead and the run), and don't say overdue leads alert anyone (they're marked only).

## Setup

New external_ids: PA-ERR-001 (crash, 101 characters long) and PA-APR-005, PA-APR-006. Answer the T12 approval within 5 minutes. One app at a time, maximized on the monitor OBS records; switch apps during pauses. Zoom in: Postman text large, Chrome Ctrl + plus on each tab. Postman environment "Rivertown Power Automate". Leads table (Edit view) sorted by Created On, newest at the bottom, status column showing. Power Automate open on Approvals with environment "Josh Maurer's Environment". OBS records the screen only (no mic).

## Evidence

Same runs as frozen tests T11 to T13: [test-cases.md](../cases/rivertown-lead-intake/test-cases.md), 2026-11-03.
