# Bluffside Handbook Helper — Guide for the person who maintains it

Draft 2026-11-08, for Josh's review. Written for whoever keeps the helper running: an office manager with some admin access, or the IT partner.

## What's in the box

Everything sits in one Power Platform solution, "Bluffside Handbook Helper" (publisher jdmaurer Labs, prefix jdm), so it exports and moves as one package.

| Part | What it does | Where |
| --- | --- | --- |
| Agent "Bluffside Handbook Helper" | Answers from the handbook files only; Web Search off | Copilot Studio > Agents |
| Instructions | The rules: answer from Current policies, name the policy, refuse and hand off, the 911 line | Agent > Overview > Instructions. Copy: `agent-config/instructions-v2.md` |
| Knowledge | Six handbook files, including one marked REPLACED on purpose | Agent > Knowledge. Copies: `handbook/` |
| Topics | Fixed scripts: Emergency (911), Escalate (hand-off to Dana), Repair questions (service manager) | Agent > Topics. Copy: `agent-config/topics.md` |
| Tool "Submit time-off request" | Files a request; email and name come from the sign-in | Agent > Tools (open it from the Tools list, or its inputs don't show) |
| Agent flow "Submit time-off request" | Checks for a missing email, checks for a duplicate, saves the request as Pending, replies with the ID, sends Dana an approval, records her answer | Copilot Studio > Workflows |
| Table "Time Off Request" | One row per request; key: one request per person per first day | Power Apps > Tables |
| Test set "Bluffside full regression v1" | 36 questions with expected answers and two graders | Agent > Evaluation. Copies: `evaluation/` |

How the request works, end to end: `action-contract.md`.

## Changing the handbook

1. Edit the policy file. Give it a new version number and a Status line (Current or REPLACED).
2. Upload it under Knowledge. Mark the old version REPLACED rather than deleting it at once, so the helper can say "that policy was replaced."
3. Wait for the file to show Ready.
4. Add or update test questions for the change, then run the test set (below).

## Changing the rules (instructions or a topic)

- Change one thing at a time, then test it and the questions near it. A topic's description decides when the AI picks it, and a small wording change can pull in questions it shouldn't (11-08: "wrench" pulled the Repair topic until its description said what it's not for).
- Every refusal names someone. A refusal that names no one is a fail.

## Changing the request flow

- Save draft after each finished card, then Publish.
- Every "Respond to the agent" card must send the same outputs with the same descriptions, or Publish fails with "schema definitions ... must match."
- If Publish shows "instanceUrl is undefined": Save draft, refresh the page (F5), then Publish. Don't click "Recover flow" if you've saved since; it brings back an older copy.
- Don't add an optional question to the tool (for example a note). Copilot Studio reads "no" as "erase it" and asks again. Use a topic with buttons instead.

## Testing before you release a change

1. Agent > Evaluation > "Bluffside full regression v1" > Run.
2. Read every reply, not just the scores. The graders sort rows; they make mistakes (on 11-08 they still flagged two correct answers).
3. Release only if every emergency row is the 911 message and nothing else, and no row gives an answer it should have refused.
4. Rows that say "rate limit" didn't run. Ask those by hand.

## Watching it

- Requests: the Time Off Request table. Anything Pending for more than a few days means Dana hasn't answered.
- Failed runs: the agent flow's Overview > run history. A red run from the email guard means the sign-in didn't pass an email, a real fault worth chasing.
- Conversations: Agent > Activity, to see what people actually ask. New common questions become new test rows.

## Turning it off

- Stop the request action only: Agent > Tools > "Submit time-off request" > Enabled switch off. Questions still work.
- Stop the whole helper: remove it from the Teams channel (in a client's tenant), or unpublish it.
- Undo a bad change: Copilot Studio keeps the instructions text in the repo copy (`agent-config/`); paste the last good version back and rerun the test set. The flow has Version history in its designer.

## Known limits

See `limitations.md`. The big ones: it runs on a trial here and can't publish to staff; the AI chooses topics, so topic routing can change between runs; the content filter can show an error instead of the hand-off; no note on requests.
