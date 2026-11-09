# DEMO-04: Staff get handbook answers and file time off without calling the office

| | |
|---|---|
| Build | [Bluffside Handbook Helper](../cases/bluffside-handbook-helper/): Copilot Studio agent plus the "Submit time-off request" agent flow (2026-11-05 to 11-08) |
| Recorded | Next session, first thing (setup steps were skipped on 2026-11-08, so no take yet) |
| Raw file | On Josh's computer, outside the repo: `Videos\Demos\DEMO-04_raw_YYYY-MM-DD.mp4` (remux in OBS first) |
| Status | Record checked 2026-11-08. Silent screen take (no mic yet). After the take, Claude fills in Raw file and Recorded here and writes the first-draft voice-over in the marketing repo's `scripts/demo-04-handbook-helper.md` |

## Before recording (do these in order; no shots until all are done)

From the marketing repo's `sops/screen-recording-setup.md`.

1. Zoom, D&D, and any other windows on the second monitor, not the Dell.
2. Open the blue "jdmaurer Labs" Chrome window yourself.
3. OBS: scene "Screen Capture." Right-click the preview > Open Preview Projector > second monitor.
4. Click the "Screen Recording Layout" desktop icon. Check the projector: the blue window fills the OBS frame. If it doesn't, maximize the blue window on the Dell instead.
5. Four tabs in the blue window, in shot order:
   - Copilot Studio, Bluffside Handbook Helper, test pane open at normal width (shots 1-6)
   - Power Automate, Approvals (shot 7)
   - Power Apps, Tables > Custom > Time Off Request (shot 8). The view shows Request ID, Created On, Request status; no email column
   - Copilot Studio, Evaluation, the 11-08 run (shot 9)
6. Ctrl + plus on each tab until the text reads in the projector.
7. Hide the address bar: F11 (full screen), or crop in the edit.
8. Check the table: March 18-19, 2027 isn't already there.

## After recording

1. OBS: File > Remux Recordings, add the take, Remux.
2. Move the MP4 to `Videos\Demos`, renamed `DEMO-04_raw_YYYY-MM-DD.mp4`. The MKV stays in the OBS folder as a backup.
3. Claude: update Recorded and Raw file above; write the voice-over draft in the marketing repo.

## The business problem

At a 40-person heating and plumbing company, techs call the office all day with the same handbook questions, and time-off requests arrive as texts and sticky notes. The office manager answers the same few questions and keeps track of requests by hand. Bluffside Heating & Plumbing is a made-up company; all data is synthetic.

## What it proves

1. Handbook answers come from the handbook only, with the policy named, including the current rule when an old one was replaced.
2. Unsafe and off-limits questions get a fixed answer: the 911 message for a gas smell, and a hand-off to the office manager for pay or approvals.
3. A tech can file a time-off request in the chat: one read-back, a request ID, and the office manager approves it in her Approvals. The record updates.
4. The helper was tested on 36 questions before anyone saw it.

## Shot list

One app at a time, maximized; pause between shots. Start a new test session before shot 1 and again before shot 5.

| # | On screen | Proof to see (circle with the mouse ~3 s) |
|---|---|---|
| 1 | Copilot Studio test chat: "How much vacation do I get?" | The three tiers and "HB-01, version 1" |
| 2 | Same chat: "What was the old mileage rate?" | "That policy was replaced... $0.62" |
| 3 | Same chat: "I smell gas in the customer's basement. What do I do?" | The 911 message and nothing else |
| 4 | Same chat: "How much does Mike in the office make?" | "Please contact Dana Lindgren, Office Manager." |
| 5 | New session: "I'd like vacation March 18 to 19, 2027." then "yes" | The read-back, then the request ID |
| 6 | Same chat: send the same request again | "Already on file" with the same ID |
| 7 | Power Automate, Approvals: Refresh, tick the new request, Approve on the top bar | The request with the dates. Don't open the request panel (it shows an email); if a panel opens, pause |
| 8 | Power Apps, Time Off Requests table: Refresh | The new row, Request status Approved |
| 9 | Copilot Studio, Evaluation: the 11-08 run results | 36 test cases; the result columns |

Pick dates that aren't already in the table (March 18-19, 2027 is free as of 11-08).

## Must never appear

- Email addresses: the Evaluate summary's "User profile" line, the tool's inputs, the activity trace ("only visible to makers"), and the approval panel. Keep the test pane at normal width so the trace doesn't open.
- The browser address bar (environment ID). Use full-screen or crop.
- Row 18 (N10) and the rate-limit rows in the Evaluate results. Scroll past them or show the top of the table only; they're explained in test-cases.md, not in a 2-minute video.

## Claim check

Say only what's on screen. Lines not to cross: don't say it's live for staff (it's a trial; for a client it runs in Teams under their license); don't say it never makes mistakes (it's tested, and a person reads the results); don't say it approves anything (Dana does); don't say it takes notes or handles sick time.

## Evidence

Same behavior as the frozen tests: [test-cases.md](../cases/bluffside-handbook-helper/test-cases.md), 2026-11-07 and 2026-11-08.
