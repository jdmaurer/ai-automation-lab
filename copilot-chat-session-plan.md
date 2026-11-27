# Microsoft Copilot: learning plan

Rewritten 2026-11-26 with Josh. It replaces the earlier 90-minute free-Copilot session plan. Why it changed: Josh already knows chatbots, so comparing Copilot Chat with Claude taught little. The real gaps are Copilot inside the Office apps, which needs the paid license and can't be seen in the lab account, and confidence in Copilot Studio. Bluffside was built, but in Week 7 Josh got around Copilot Studio "with help," not on his own.

Do this after the run 1 predictions and the sealed score walk-through (see CURRENT_STATE).

## Order

| # | What | Time | Deadline |
|---|---|---|---|
| 1 | DataCamp: Working with Microsoft Copilot, whole course | 2 hr | none |
| 2 | Inbox check in the lab account | 20 min | before the lab subscription ends Dec 9 |
| 3 | DataCamp: Microsoft Copilot in Excel | 3 hr | none |
| 4 | DataCamp: Building Agents with Microsoft Copilot Studio, whole course | 3 hr | none |
| 5 | Solo rebuild of a small piece of Bluffside | 1 hr | only if Microsoft offers the Studio trial extension around Dec 6 |

Why this order: easiest first, and the only hard deadline (step 2) comes early. Step 1 covers Copilot in Outlook, so step 2 makes sense when you get to it. Step 3 is the skill the people you'll train will use most. Step 4 is the deepest, and step 5 checks whether it stuck.

The DataCamp courses use none of your Claude usage, so they fit low-usage days.

## 1. Working with Microsoft Copilot (2 hr)

https://www.datacamp.com/courses/working-with-microsoft-copilot

Chapters: Prompting with Microsoft Copilot; Applying Prompts in Microsoft 365 Apps; Building and Enhancing Custom Agents; Seamless Workflows with Copilot App and Agents.

- Chapter 1 teaches GCSE (Goal, Context, Source, Expectation), Microsoft's prompt framework. Client staff with Microsoft training will know these terms.
- Chapter 2: Copilot inside Word, PowerPoint, Excel, Outlook and Teams.
- Chapter 3: Agent Builder. This is not Copilot Studio. Clients mix them up.
- Chapter 4: the Analyst and Researcher agents.
- First check: does it run real Copilot or a simulation? You'll know within a minute.
- Write down: one line on when a client needs Agent Builder versus Copilot Studio.

## 2. Inbox check in the lab account (20 min, before Dec 9)

Why: this is the free tier a Business Basic client already has, and only your own account can show it. Free users lost Copilot inside Word, Excel, PowerPoint and OneNote on April 15, 2026. They keep web chat and Copilot in Outlook.

Where: the blue "jdmaurer Labs" Chrome window, signed in as josh@joshmaurer.onmicrosoft.com.
Data: synthetic only. No pay-as-you-go billing, no paid agent. If a screen asks for billing, stop and write down what it asked for.

1. Open https://copilot.microsoft.com. Look for the label. "Copilot Chat (Basic)" means the free tier.
2. Open Outlook on the web as the lab mailbox, then open Copilot there.
3. Ask: "Which emails from the last month need the owner's attention today, and why?"
4. Ask: "Draft a reply to the newest sales question." Do not send it.
5. Watch for: does it really read the inbox? Does it move, label or log anything, or only answer in chat?

Write down three lines in `copilot-session/notes.md`:
- The label you saw.
- What Copilot did that the Driftless flow also does.
- What only the flow does (routing, labels, the exception queue, the log).

Spare, if you have time: `copilot-session/driftless-10-emails.md` plus its key let you score Copilot's sorting out of 10.

## 3. Microsoft Copilot in Excel (3 hr)

https://www.datacamp.com/courses/microsoft-copilot-in-excel

Chapters: Getting Started with Copilot in Excel; Copilot-Powered Analysis Workflows; Data Quality, Insights, and Oversight.

- It covers tables and formulas, lookups across tables, summaries and charts, flagging blanks and duplicates, and validating multi-step analysis.
- Watch for Agent Mode versus ask-only mode. Clients will ask which to use.
- Write down: two tasks you'd teach a small-business team first.

## 4. Building Agents with Microsoft Copilot Studio (3 hr)

https://www.datacamp.com/courses/building-agents-with-microsoft-copilot-studio

It runs in a Microsoft 365 environment that DataCamp provides, so you don't need a license or the trial.

- Chapters 1 to 3 will feel familiar from Bluffside. That's the point: this time it's your hands.
- New to you: the activity map (chapter 1), the RSS trigger (chapter 2), a directory connector and a spreadsheet as knowledge (chapter 3), and all of chapter 4.
- Chapter 4 does what the trial blocked: publishing to channels, the Share dialog, the Monitor dashboard, and the Flow checker (which is not the solution checker).

## 5. Solo rebuild (optional, about 1 hr)

Only if Microsoft offers the 30-day Studio trial extension. If it doesn't, skip this step and don't reorder anything for it.

In your own trial, build one topic and one grounded answer from the Bluffside handbook, without directions. Claude only answers questions. Write down where you got stuck.

## After

- Commit `copilot-session/notes.md`.
- Turn off the flows that use the lab mailbox (CURRENT_STATE, before-December-8 list).
- Copilot training stays "not on the site yet" until Josh decides.

## Sources (checked 2026-11-26)

- DataCamp course pages linked above (outlines; Studio course environment and no-credit route).
- Microsoft Support, "How Copilot Chat works in Microsoft 365 apps": https://support.microsoft.com/topic/676db5e8-9568-4bdb-bf0b-e207e29e056b
- Purdue IT, "Microsoft removes in-app Copilot Chat features for non-licensed users" (effective April 15, 2026): https://it.purdue.edu/newsroom/articles/260403-microsoft-removes-in-app-copilot-chat-features-for-non-licensesd-users.php
- Microsoft Learn service description, Microsoft 365 Copilot: https://learn.microsoft.com/office365/servicedescriptions/office-365-platform-service-description/microsoft-365-copilot
