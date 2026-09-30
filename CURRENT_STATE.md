# CURRENT STATE - updated 2026-09-29 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Objective
Master calendar Week 6 is under way. The Monday block (Microsoft access) is done: free developer environment obtained, $0 spent. Next: the Week 6 Tuesday block, the first Power Automate build.

## Where things stand
- Microsoft access: see microsoft-environment-decision.md. Own organization joshmaurer.onmicrosoft.com, display name "jdmaurer Labs", one user (me, Global Administrator). No paid products active.
- Power Apps Developer Plan: environment "Josh Maurer's Environment", created 2026-09-29. Dataverse (Tables) and Flows available. Limits: 750 flow runs/month, 2 GB; disabled after 30 days unused.
- Sign-in: josh@joshmaurer.onmicrosoft.com, password saved in the Chrome profile "jdmaurer Labs" (blue). Microsoft Authenticator app handles sign-in approval. Use that profile for ALL Microsoft work; the regular Chrome profile picks the wrong account.
- No Microsoft 365 apps license: no Outlook, SharePoint, or Teams. Week 6 data goes in Dataverse. Week 8 inbox triage needs a decision then (Business Basic trial or design-only Outlook steps).
- Copilot Studio trial: NOT started on purpose. Sign up on the first day of Week 7.
- Rivertown Lead Intake: unchanged, closed at v2.7 (tag lead-intake-v0.2-evaluated). n8n workflow "Rivertown - Lead Intake v2.7" unpublished.

## Browser setup (name the window in every instruction)
Chrome has two profiles. Every instruction says which window to use, by color and name.
| Window | Signed in as | Use it for | Bookmarks bar |
|---|---|---|---|
| **Orange "Joshua"** | joshuadmaurer@gmail.com (Google) | GitHub, Claude, ChatGPT, Gemini, NotebookLM, Gmail, Google Drive, n8n at localhost:5678, Postman web | Favorites, Claude, ChatGPT, Google Gemini, NotebookLM, github |
| **Blue "jdmaurer Labs"** | josh@joshmaurer.onmicrosoft.com (Microsoft work) | Everything Microsoft: admin center, Power Apps, Power Automate, Copilot Studio, Entra | Admin, Power Apps, Power Automate, Copilot Studio, Entra |
- Never do Microsoft work in the orange window; it offers the personal Microsoft account and the admin center refuses it.
- Private (incognito) windows are no longer needed.
- Switch windows with the profile picture at the top right of Chrome, or pick the window from the taskbar.

## Next
1. Master calendar Week 6, Tuesday block: Power Automate. Learn: Get Started modules of "Automate a Business Process Using Power Automate" (Microsoft Learn; text-heavy, so interleave reading with building). Practice: manual, scheduled, and event-triggered toy flows; look at run history. Build: a solution-aware Rivertown Lead Intake flow in Josh Maurer's Environment (trigger, normalization, required-field validation, record creation in Dataverse). Save: flow diagram plus an n8n-to-Power Automate terminology table.
2. Gate 1 score (skipped at Week 4). Claude pre-scores the 10 criteria from repo evidence; Josh reviews (about 20 minutes).
3. Save the environment screenshot (Power Apps home, "Josh Maurer's Environment" with the developer banner) as evidence for microsoft-environment-decision.md.
4. Rivertown follow-ups, not blocking: Eval Summary Drafter on v2.7 results; H-04 and H-06 as a client question.

## Open items - Rivertown, before any real client data
- Random form IDs, or treat a repeated ID with a different email as a conflict (threat-model F2).
- Form note on sensitive details plus a table retention limit (F3).
- Turn off detailed error responses; the inactive-webhook 404 leaks local paths (F1).
- Rotate the webhook API key before any public exposure. Confirm the Postman workspace is private (F4).
- Build and test email delivery to each team; revisit the threat model first.
- Force a second-opinion failure to prove it goes to review (designed to fail closed; not yet tested).
- Single labeler. Offer the client a test set written by their own staff.

## Working rules
- Name the learning goal for each block. Case-study mode only when it teaches something; otherwise draft and let Josh review.
- One question at a time, context first. Explain like a fifth grader when asked. Wait until Josh has finished before replying; he types, not voice.
- Choices: why each option is good, what's bad, a recommendation, and a table when the difference isn't obvious.
- One instruction at a time, purpose and expected result first. Paste-ready values (version names, descriptions, commands) go in the same message as the step that uses them, every time; never "see above."
- Long code goes in files, never pasted from chat. Long n8n outputs come as .txt attachments.
- While Josh reads a document, queue changes and apply them together when he says done; then send a list of what changed and where.
- Check decisions.md before calling anything a bug. Check which files a restore or reset touches before running it.
- Write pass/fail rules and experiment verdicts before the run. Check model token budgets before planning several runs.
- n8n: Export JSON lands in Downloads; Claude moves it into the repo. Publish only for testing; unpublish at the end of the session.
- Evidence dates match when things happened. Documents for outside readers: past tense, no "new"/"now", a source for every claim.
- Keep the design lean; flags, not stops; Josh's review is the safety net. Time-box, and say when something isn't teaching anything.
- Microsoft work happens only in the Chrome profile "jdmaurer Labs". Billing edits can trigger a 1-2 day account review; never make them right before a trial sign-up.
