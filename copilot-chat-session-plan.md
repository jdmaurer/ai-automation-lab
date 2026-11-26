# Free Copilot Chat session: plan (about 90 minutes)

Written 2026-11-26 by Claude for Josh. Do this before December 8, 2026, when the lab Microsoft 365 account ends.
Where: the blue "jdmaurer Labs" Chrome window, signed in as the lab mailbox, at m365copilot.com.
Data: synthetic only (Driftless, Rivertown, Kettle Creek files from this repo). No real client or personal files.

## Why this session

You will be asked "can't we just use Copilot?" by small businesses on Microsoft 365. This session gives you a firsthand answer about the free version, the one most of them already have. Microsoft describes it as web-grounded AI chat with Pages, file upload and image generation, with agents added pay-as-you-go. It also says the paid Microsoft 365 Copilot license is what lets Copilot reason over all of a person's work data (email, files, meetings), and that paid users get priority access to file upload and image generation. The question to answer for yourself: what can a Business Basic customer do with the free version today, and where does it stop?

Rule for this session: do not turn on pay-as-you-go billing or any paid agent. If a screen asks for billing, stop and write down what it asked for. Copilot training stays "not on the site yet" until you decide.

## Blocks

Each block: what you're doing, what to watch for, and one line of evidence to write down. Keep a notes file open: `copilot-chat-session-notes.md`.

### Block 1: Where it lives and what it says about data (10 min)
- Open m365copilot.com in the blue window. Find the Work/Web toggle if there is one, and the enterprise data protection marker (a shield or "protected" label).
- Watch for: does it say your chats are protected and not used for training? Does it say it can see your mailbox or files without upload?
- Evidence: one sentence on what the screen promises about data, word for word.

### Block 2: Same three tasks you'd give Claude (25 min)
Run each task in Copilot Chat, then the same prompt in Claude, and note differences.
1. Upload `cases/driftless-inbox-triage/` sample emails (one .md or .txt file) and ask: "Sort these into Sales, Support, Finance, Other and say which need the owner today."
2. Upload a Kettle Creek invoice PDF (`i04-northstar-hvac-NH-2051.pdf`) and ask for supplier, number, date, total and line items as a table.
3. Upload a handwritten display copy (`display/h04-wo-5203-scan-display.png`) and ask the same fields. Watch: does it read 54.00 (not the crossed-out 45.00) and 1.5 hours?
- Watch for: upload limits, whether it says "upgrade" anywhere, how long answers take, any refusals.
- Evidence: a 3-row table (task, Copilot result, Claude result).

### Block 3: Copilot inside the apps (15 min)
- Open Word online and Excel online in the lab account. Look for the Copilot pane.
- In Excel, open a small sheet (paste 10 rows from `answer-key-documents.csv`) and ask: "Total by document type" and "Which rows are exceptions and why?"
- Watch for: does free Copilot Chat see the open file without upload? Does it offer to write a formula or only describe?
- Evidence: what it could and couldn't do with the open file.

### Block 4: Pages (10 min)
- Turn one answer from Block 2 into a Copilot Page. Edit it. Try sharing (inside the lab tenant only).
- Watch for: is a Page something a client team could keep as an SOP draft?
- Evidence: one line on whether you'd show this to a client.

### Block 5: Agents, without paying (15 min)
- Open the agents area. Look at the built-in agents (Word, Excel, PowerPoint agents, Researcher, Analyst, if listed) and the option to create an agent.
- Try creating a simple agent with instructions only ("Kettle Creek office helper: answers questions about the review queue rules"), using a pasted rules list, not a data connection.
- Watch for: which steps say pay-as-you-go, Copilot Credits, or admin approval. Stop at any billing prompt.
- Evidence: a list of what was free, what needed billing, and what needed an admin.

### Block 6: Your verdict (15 min)
Write five lines in the notes file:
1. What a Business Basic client gets free, in plain words.
2. The first thing they'd hit a wall on.
3. One task where free Copilot is good enough, so you wouldn't build anything.
4. One task where your n8n build clearly does more (hint: logging, duplicate protection, exception queue).
5. Whether this belongs in a training offer (yes/no/later).

## After the session

- Commit `copilot-chat-session-notes.md`.
- Then turn off the flows that use the lab mailbox (CURRENT_STATE, before-December-8 list).
