# Start of Session — 2026-09-16

Delete or overwrite this file once the session is underway. It exists so the
first ten minutes are not spent reconstructing where things stood.

---

## Before opening a chat

1. **Confirm the repo is current.** In PowerShell:
   ```powershell
   cd "$HOME\ai-automation-lab"
   git status
   ```
   Expect "nothing to commit, working tree clean."

2. **Sync the GitHub source in the Claude Project.**
   Project knowledge → GitHub → Sync. Without this, the chat reads yesterday's
   files.

3. **Update the Project instructions** (the text pane in Project settings).
   Two lines are now stale:
   - N8N102's format is no longer "UNVERIFIED" — the course is complete
   - Lead Intake v1 is no longer upcoming — it is built and awaiting live
     testing

## Opening the chat

New chat **inside the AI Skills Intensive Project**, not a regular chat.

**Nothing needs to be uploaded.** Everything lives in the repo and syncs
through Project knowledge. The master calendar and tracker are already Project
files.

Paste this as the first message:

> Read CURRENT_STATE.md first, then cases/rivertown-lead-intake/. Continue
> from the exact next step. Explain why before giving steps, one step at a
> time, spell out all values in full, and give me the pin data JSON with any
> test instruction.

## Today's work, in order

**1. Reset the Data Table.**
Clear all rows in `rivertown leads seed`, re-import
`cases/rivertown-lead-intake/rivertown_leads_seed.csv`.
Ten rows. Rows 1-3 keep `duplicate_count` null on purpose — case A depends on
it.

Do NOT export the table from n8n and use that as the seed. An export is live
state including test rows.

**2. Configure the webhook for real use.**
- Change Path from the generated GUID to `rivertown/lead-intake`
- Set Authentication to Header Auth and create the credential
- Confirm Respond is set to "Using 'Respond to Webhook' Node"

**3. Publish the workflow.**

**4. Run all ten cases through Postman** against the Production URL.
Cases and payloads are in `cases/rivertown-lead-intake/test-cases.md`.
For each: record status code, response body, and resulting table state.

This is the real test. Pin data proved the logic; only a real POST proves the
response, the method, and the auth.

**5. Fill in the Postman column** of the results table in `test-cases.md`.

**6. Unpublish.**

**7. Export the workflow** to
`cases/rivertown-lead-intake/lead-intake-v1.json`.

**8. Commit and push.**

## If there is time after that

- Check the Excel tracker — completion has not been recorded for several
  sessions
- Check n8n Cloud trial days remaining; decide self-host vs paid
- Verify the Data Table column count (it reported 15; expected count is worth
  confirming)
- Claude Code install — still pending, matters from around Week 4

## Then

N8N103: In Practice — AI, Testing and Best Practices. Master calendar Week 5.
N8N101 stays out of scope except diagnostic sections.
