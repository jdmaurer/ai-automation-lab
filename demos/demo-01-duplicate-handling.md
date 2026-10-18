# DEMO-01: A resent form is counted, not saved twice

| | |
|---|---|
| Build | [Rivertown lead intake](../cases/rivertown-lead-intake/): Power Automate flow "Rivertown - Lead Intake (Power Automate) v1" with Dataverse, solution 1.0.0.2 |
| Recorded | 2026-10-17. Raw take 3:25, silent, 1920x1080 at 30 fps, MKV |
| Raw file | On Josh's computer, outside the repo (OBS recording folder) |
| Status | Raw recorded. Editing, voice, captions, and publishing: marketing track, `scripts/demo-01-duplicate-handling.md` (private) |

Written after recording (the shot list below is the plan that was run). From DEMO-02 on, records are written before recording.

## The business problem

A lead form gets sent twice: a double click, a retry after a slow connection, or the person submitting again. Without a check, the office ends up with two records for one person, and two people may call the same client. Rivertown Professional Services is a made-up 30-person consulting firm; all data is synthetic.

## What it proves

1. A new submission is saved: reply 200 "received", one new row.
2. The same submission sent again is counted on the existing row instead of saved twice: reply 200 "duplicate", still one row, duplicate_count 1.
3. A submission from a source the firm doesn't recognize is refused and nothing is saved: reply 400 "Unknown source", no new row.

## Shot list (as recorded)

| # | On screen | Proof to see |
|---|---|---|
| 1 | Postman, request "T4 New Copy", Body tab (external_id PA-DEMO-001): Send | 200, "received" |
| 2 | Same request: Send again | 200, "duplicate" |
| 3 | Chrome, Power Apps, Leads table: Refresh; row highlighted across to duplicate_count | One PA-DEMO-001 row, duplicate_count 1 |
| 4 | Postman, "T6 Unknown source Copy": Send | 400, "Unknown source" |
| 5 | Chrome: Refresh | No new row (15 rows) |

Mouse circles mark the key parts. Quiet stretches were left in so the circles can be cut if they don't work.

## Must never appear

- The flow's web address: it contains the secret key (`sig=`). Postman shows `{{pa_intake_url}}` instead; never hover over it (the popup shows the address), and never open the Params tab of an original request.
- The flow details page in Power Automate (it shows the account email).

## Claim limits (check every script against these)

- A learning prototype with made-up data, not a production system or a client deliverable.
- Shows duplicate handling with a unique key (form number plus source). It does not claim to handle two copies arriving at the same instant: that run errors ([limitations.md](../cases/rivertown-lead-intake/limitations.md)).
- What a person still does: nobody is alerted when a submission is refused, so a person checks the run history. Nothing in this flow approves anything yet; approvals are the next build.

## Re-shoot setup

Change the body's external_id to **PA-DEMO-002** (PA-DEMO-001 is used). Click the "Screen Recording Layout" desktop icon (PowerToys Workspaces) and check the OBS preview. In Postman, select the environment "Rivertown Power Automate". Leads table sorted by external_id, with duplicate_count showing. Mute the mic in OBS.

## Evidence

The same results as frozen tests T4 to T6: [test-cases.md](../cases/rivertown-lead-intake/test-cases.md), 2026-10-17.
