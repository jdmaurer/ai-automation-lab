# Week 2 Log

## Wednesday 9.9.26 - Webhooks

Built Webhook Receiver in n8n. First workflow that runs without me pressing
Execute - Postman sends a POST, the workflow fires.

Webhook set to POST (sending data, not asking for it). Path changed from a
random string to coi-intake so the URL says what it does.

Incoming data arrives nested under "body" - so it's $json.body.client_name,
one level deeper than yesterday's expressions.

Generated a ticket ID with {{ "COI-" + $now.toMillis() }} - milliseconds
since 1970, so every ticket is unique without storing a counter.

Respond to Webhook node sends a real response back. Set the webhook's Respond
to "Using Respond to Webhook Node" first, or it replies immediately with a
generic message.

THREE THINGS THAT TRIPPED ME UP:
- "Listen for test event" only arms the webhook node. Once there were
  downstream nodes I had to use Execute Workflow to arm the whole thing.
- Respond to Webhook doesn't need a wire back to the trigger. n8n holds the
  caller's connection open until it answers.
- My first response returned the literal text {{ $json.ticket_id }} because
  the field was set to Fixed instead of Expression. Fixed sends text exactly
  as typed.

Test URL vs Production URL: test only listens while you're watching,
production runs silently once published.

## Thursday 9.10.26 - N8N102 Section 1: API Integration Pipeline

Completed the Section 1 hands-on project — real graded checkpoints for
merging order and customer data, routing by subscription tier and region,
batching priority orders, and a full pipeline summary.

What stuck:
- n8n runs a node once per every item it receives as input. Chain two API
  calls together and you get a multiplied result, not the number you
  expect (10 orders into a customer lookup = 100 results, not 10).
- Merge only works when both sources run independently in parallel from
  the trigger, not chained one after another.
- IF is for yes/no; Switch routes to more than two outcomes, with a
  Fallback Output so nothing silently disappears.

Two real course bugs caught, not my own mistakes:
- Loop Over Items batch size: written instructions said 5, grading
  criteria said 10 - conflicting.
- FinalizePipeline expected values with zero stated answer anywhere in
  the instructions - took real elimination testing to resolve.

Biggest actual lesson of the day: n8n's own AI Assistant proposed a "fix"
for the FinalizePipeline error that looked like it worked - but it had
deleted a correctly-built node to get there, and the "success" it
reported came from a simulated run, not a real one. Caught it before
accepting it. Check what an AI fix actually changed, not just whether it
claims success.

~9 hours, longer than it should've been because of the course's
text-heavy format - but the actual skills (branching, merging, batching,
real debugging) are solid, and I can explain every part of it.

## Friday 9.11.26 - Building the Claude <-> ChatGPT handoff system

Ran out of time mid-session in Claude (stopped right at Step 1.2 -
WebhookNewOrder auth/path config) and needed a way to keep going without
losing context. Pasted a summary of that Claude session into ChatGPT and
asked two things: was the pasted info enough to continue accurately, and
should I keep working in one chat or set this up somewhere more permanent
so I can go back and forth between ChatGPT and Claude long-term.

ChatGPT's answer: don't make either AI's Project the master record, since
neither one automatically sees inside the other's Project. Use GitHub as
the actual source of truth instead, with a small CURRENT_STATE.md file as
the baton - the one thing both AIs read first when picking up a session -
and weekN-log.md as the real running history. The ChatGPT Project and
Claude Project both just become "working rooms" pointed at the same repo,
holding the stable reference material (master calendar, tracker, current
course reading).

ChatGPT built starter versions of three files - CURRENT_STATE.md,
AI_HANDOFF_PROTOCOL.md, SESSION_LOG_TEMPLATE.md - plus a first session log,
and gave me a zip to drop into the existing repo root rather than making a
new one.

Connected ChatGPT to GitHub directly through a connector so it could read
the repo instead of me re-uploading files every session.

Went looking for the equivalent on the Claude side myself and found the
steps: in a Project, use the + in the upper-right of Knowledge, choose
GitHub, authenticate, paste the repo URL, pick files or folders, then
Sync whenever the repo changes later. Slightly different location than in
a regular chat, where the + sits in the message box instead.

Made the first real edit to AI_HANDOFF_PROTOCOL.md - documenting the
finished ChatGPT+Claude workflow - and went through git add, commit, push
with ChatGPT's guidance. Confirmed live on GitHub afterward.

WHAT CONFUSED ME:
- Wasn't obvious at first which AI should be "in charge" of the shared
  state. Landed on neither - GitHub is, both Projects just point at it.
- Realized the files existing in the repo isn't
  the same as either AI actually being connected to read them.

Exact stopping point: Handoff system built and pushed to GitHub. ChatGPT
Project connected via its GitHub connector. Claude Project connected via
Project Knowledge -> GitHub source.

Exact next step: Continue N8N102 Section 2, Step 1.2 - configure
WebhookNewOrder (POST, course/n8n102/new-order, Header Auth, n8n Academy
API Key, Respond via Respond to Webhook node). No n8n work happened this
day - this carries over unchanged.