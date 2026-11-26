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

## Wednesday 11.25.26, morning — Correcting the Week 9 plan

I caught two problems. First, my own memory: the client job I'd done wasn't invoices. It was a nonprofit manager's admin paperwork, handwritten pre-printed forms, with a GPT pulling specific boxes from several forms. Second, the overnight plan had moved Week 9 into n8n and quietly dropped the calendar's point of going beneath low-code, and with it the place Python gets applied. The rule is that we add what clients buy; we never lose a skill.

We read the research again. All four runs list documents into a sheet with a review step, but none mention handwriting, and proof of paid jobs is thin. What's actually sold is the reliable process around the reading, not the reading. Handwritten forms stay in as my firsthand evidence, to test in December conversations.

Agreed split: n8n for the workflow a client would keep; Python only where it's genuinely the better tool, mainly the test bench that proves the workflow works. Claude writes the code; I supervise and explain it back. How I learn Python is still open; I have more questions.

Independent: catching the invoice mistake in my own memory; spotting that skills were being replaced, not added; asking whether Python was being forced.

With help: rereading the four research runs; comparing the plan to the calendar's Week 9 line by line.

## Wednesday 11.25.26, evening, to Thursday 11.26.26, 1 am — First build night (DRAFT, written by Claude for Josh to edit)

The test set got rebuilt around a made-up heating and plumbing company, Kettle Creek: supplier parts invoices plus technician work orders, 50 cases. The workflow (v0.1) went into my n8n with the AI reading step left as a stand-in, so the rules could be tested first.

The night started badly. Claude went back to click-by-click instructions after we'd agreed it drafts the workflow and I check it, then had me fight file pickers and table imports for an hour. What fixed it: I signed Claude into the browser panel and it did the n8n setup and test runs itself. It found a real bug on the first run: the Data Table check drops the attached file, so a "Restore file" block puts it back.

Then I predicted where four files would land before each run: the same file sent twice, a damaged PDF, 14 hours on one visit, and a revised invoice. All four were right.

Python, under the low-code layer: one direct call to Groq, then eight failure tests (no key, wrong key, rate limit, service down, garbled answer, wrong shape, timeout, real call), 8 of 8 safe. Every run leaves a trace line with a tracking ID and a time, and one command summarizes them. A scorer reads my n8n tables through the API and compares them to the answer key, sliced by invoices, work orders and handwritten. The 100% it showed tonight only proves the rules: the reading was pinned answer-key values, not AI.

Reading step decision: Groq for text PDFs and photos; Gemini 3.5 Flash-Lite for phone-scan PDFs, because Groq's vision reads images, not PDFs. Checked first: free tier allows 500 a day, and free-tier data may be used by Google, so synthetic data only.

Handwritten files: four sheets, seven files. Writing "|" between columns made "2 washers" look like 21, which became a test of its own. The originals stay private because the signatures look like mine; public display copies have the signatures blacked out. A logic check before the freeze found that revision and resend pairs fail twice if the first copy fails, so the scorer now reports those as blocked. Frozen as week9-testset-v1.

Independent: catching that the n8n work had slipped back to click-by-click; pushing Claude to drive n8n itself instead of sending me on errands; four correct predictions; spotting that "|" reads as a 1; asking whether my handwriting should be public, then pointing out it's exactly what a client wants to see; asking for a logic test before freezing; arguing that sealed results work as well as predicting before the run.

With help: the workflow JSON and its debugging; the Python scripts; the Groq, n8n and Gemini key setup; checking Gemini's limits and data terms.
