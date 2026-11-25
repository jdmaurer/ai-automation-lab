# Week 9 Log

## Saturday 11.22.26 to Wednesday 11.25.26 — Choosing Weeks 9-12 from what people actually buy

I brought the "what gets built" research into the intensive: four AI research runs on what consultants actually build for small businesses. Claude's first answer was far too long, but the main finding was right. Four of the seven most-requested builds already exist in my repo: lead intake (Rivertown), email triage, quote drafts and the weekly report (Driftless), and the document assistant (Bluffside). Rebuilding them on new sample data would be hours with nothing new learned.

What's actually new: invoices and receipts into a review sheet, and meeting notes into decisions and follow-ups. I've done invoices into Excel by hand for a client before, so I know that one is real, and I made sure it didn't get dropped as just a research item. The output has to open in Excel.

Decision: the invoice build becomes Week 9 itself, in n8n. Week 9's real skills (calling the AI service directly, logging every run, a spending cap, a fixed test set rerun after every change, a code scorer) all fit inside it, so nothing from the original Week 9 is lost. Meeting notes go inside Week 11. Payment and quote reminders stay on the list. Local models come after Week 12.

I pushed on the Microsoft deadlines. I put a card down for the mailbox trial, and I didn't want a surprise in two weeks over the holidays. We went through every account with a card or an end date. Nothing in Weeks 10-12 needs paid Microsoft. Before December 8: record the Driftless demo, a short Copilot session, a 10-minute account check, and turn off the mailbox flows.

I also had Claude read three talks: Diego Oppenheimer on AI research, the Atlassian CEO, and the Dock founder. Diego's method is the useful one here: write claims, not reports, and test only the uncertain claims in conversations. That shapes my December talks. The other two are marketing material, and I passed them to the marketing project with a video idea.

Independent: insisting the invoice-to-Excel build stays because I've seen the need firsthand; catching the risk of a surprise Microsoft charge; asking that nothing be dropped just because it wasn't confirmed; deciding which of the videos mattered.

With help: mapping the research onto my existing cases; checking Week 9 piece by piece; the deadline and billing table; writing it all into CURRENT_STATE so the next chat starts by asking me about the parked items.

Overnight (Claude, while I slept): a demo record for the Driftless video (DEMO-05) and a draft invoice test set (12 files, answer key, supplier list), marked draft until I answer the open questions.
