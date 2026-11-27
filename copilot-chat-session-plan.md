# Free Copilot Chat session: plan (about 90 minutes)

Written 2026-11-26, checked against Microsoft's current pages the same evening. Do this before the lab Business Basic subscription ends (it reads "Expires on December 9, 2026"). Better before about December 6, while the Copilot Studio trial is still active, so Block 4 shows the agent builder as a client would see it.

Where: the blue "jdmaurer Labs" Chrome window, signed in as josh@joshmaurer.onmicrosoft.com, at https://copilot.microsoft.com (or the Copilot app from microsoft365.com).
Data: synthetic only. Files to use are in `copilot-session/`.
Notes: keep `copilot-session/notes.md` open and write one line per block.

## Why this session

Small businesses on Microsoft 365 will ask "can't we just use Copilot?" This gives you a firsthand answer about the free tier they already have.

What Microsoft says it includes today (check each one yourself):
- Copilot Chat is included for Microsoft 365 business users at no extra cost, and what you can do depends on whether an admin assigned a paid Microsoft 365 Copilot license.
- Since April 15, 2026, users without the paid license no longer get Copilot directly inside Word, Excel, PowerPoint and OneNote. They keep web chat, the Word, Excel and PowerPoint agents in the Copilot app, and Copilot in Outlook with inbox and calendar grounding.
- Web-grounded agents come at no extra cost; agents grounded in shared company data are billed by consumption.
- Paid users get priority access to file upload and image generation.

Rule: no pay-as-you-go billing, no paid agent. If a screen asks for billing, stop and write down what it asked for. Copilot training stays "not on the site yet" until you decide.

## Blocks

### Block 1: Which Copilot is this? (10 min)
- Open Copilot. Look for the label: "Copilot Chat (Basic)" means the free tier; "M365 Copilot (Premium)" means the paid license.
- Find the Work/Web switch if there is one, and the data protection marker (a shield or "protected").
- Write down: the label you see, and word for word what the screen promises about your data.

### Block 2: Same tasks you'd give Claude, scored (25 min)
Run each in Copilot, then the same prompt in Claude.
1. Upload `copilot-session/driftless-10-emails.md`. Prompt: "Sort these 10 emails into Sales, Support, Finance, General, Internal or Unknown. Mark each Urgent or Routine, and say which need the owner's review today. Answer as a table."
   Then score both answers against `copilot-session/driftless-10-emails-key.md` (do not upload the key). Count right categories out of 10.
2. Upload `cases/invoice-review-queue/test-data-draft/files/i04-northstar-hvac-NH-2051.pdf`. Prompt: "Give supplier, invoice number, date, total and each line item as a table." Correct: Northstar HVAC Parts, NH-2051, 2026-11-12, total 240.09; lines 1 x Draft inducer motor 182.00, 1 x Pressure switch 41.60.
3. Upload `cases/invoice-review-queue/test-data-draft/display/h04-wo-5203-scan-display.png`. Same prompt. Correct: cartridge 54.00 (45.00 is crossed out), O-ring kit 6.00, Jane 1.5 hours, total 202.50.
- Watch for: upload limits, "upgrade" prompts, slow answers, refusals.
- Write down: a small table: task, Copilot score, Claude score.

### Block 3: Copilot in Outlook on the lab inbox (15 min)
This is the free feature closest to your Driftless build.
- Open Outlook on the web as the lab mailbox and open Copilot.
- Ask: "Which emails from the last month need the owner's attention today, and why?" Then: "Draft a reply to the newest sales question." Do not send anything.
- Watch for: does it actually read the inbox? Does it move, label or log anything, or only answer in chat?
- Write down: what it did that your Driftless flow also does, and what only the flow does (routing, labels, the exception queue, the log).

### Block 4: Agents, without paying (20 min)
- In the Copilot app, find the Excel agent. Upload `cases/invoice-review-queue/test-data-draft/answer-key-documents.csv` and ask: "Count documents by expected_status, and list the exception reasons."
- Then try creating a simple agent with instructions only: "Kettle Creek office helper. Answer questions about the paperwork review rules." Paste the "Rules the key assumes" section from `cases/invoice-review-queue/test-data-draft/README.md` as its knowledge. Do not connect SharePoint or any data source.
- Watch for: anything marked pay-as-you-go, Copilot Credits, admin approval, or Copilot Studio.
- Write down: free, needed billing, needed an admin.

### Block 5: Pages (5 min)
- Turn your Block 2 email table into a Copilot Page and edit one line.
- Write down: would a client team keep an SOP draft here? Yes, no or maybe.

### Block 6: Your verdict (15 min)
Five lines in the notes:
1. What a Business Basic client gets free, in plain words.
2. The first wall they'd hit (likely: no Copilot inside Word and Excel without the paid license).
3. One task where free Copilot is good enough, so you wouldn't build anything.
4. One task where your n8n build clearly does more: logging, duplicate protection, the exception queue, scoring against a key.
5. Whether this belongs in a training offer: yes, no or later.

## After the session

- Commit `copilot-session/notes.md`.
- Then turn off the flows that use the lab mailbox (CURRENT_STATE, before-December-8 list).

## Sources (checked 2026-11-26)

- Microsoft Support, "How Copilot Chat works in Microsoft 365 apps": https://support.microsoft.com/topic/676db5e8-9568-4bdb-bf0b-e207e29e056b
- Purdue IT, "Microsoft removes in-app Copilot Chat features for non-licensed users" (effective April 15, 2026): https://it.purdue.edu/newsroom/articles/260403-microsoft-removes-in-app-copilot-chat-features-for-non-licensesd-users.php
- Microsoft, Copilot Chat product page (availability in Word, Excel, PowerPoint and OneNote "may vary by market and customer licensing"): https://www.microsoft.com/microsoft-365-copilot/chat
- Microsoft Learn service description, Microsoft 365 Copilot (web-grounded agents included; agents on tenant data billed by consumption): https://learn.microsoft.com/office365/servicedescriptions/office-365-platform-service-description/microsoft-365-copilot
