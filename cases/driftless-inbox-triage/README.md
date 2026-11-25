# Driftless Print and Sign: Inbox Triage (Microsoft 365)

**Status:** working prototype on a live Outlook mailbox in a lab Microsoft 365 account, with synthetic data. In its final evaluation it met every safety, accuracy and pricing bar I set in advance, and every reply the AI wrote was one I'd send (8 of 8). One drafting design choice fell short of my usefulness bar. I found why and know the fix (below). It is not production-ready, and I don't claim it is.

## The problem

Driftless is a fictional owner-run print and sign shop. One inbox gets quote requests, order problems, payment questions and junk, all mixed together. The owner needs to see the urgent things first and spend less time writing routine replies, without anything going out that they didn't approve.

## What I built

A Power Automate flow on the lab Outlook mailbox. For every new email it:

1. **Checks for repeats** against a log table in Dataverse, so the same email isn't handled twice.
2. **Applies fixed rules first.** Attachments always go to the owner, and so do possible resends.
3. **Asks an AI classifier** (AI Builder, GPT-4.1 mini) for a category, a priority and a set of risk flags.
4. **Checks the AI's answer twice**: is it in the right format, and are the values allowed? Then it checks whether the AI is confident enough.
5. **Applies the owner's policy.** Anything urgent, sensitive, money-related or unclear goes to owner review. Any change to an existing order is Urgent.
6. **Writes a reply draft only when it's safe to.** A second AI writes drafts for Sales and General emails. Support emails get one fixed, approved sentence.
7. **Saves the draft, unsent.** Nothing is ever sent automatically.
8. **Logs each email from start to finish.** The AI call, the AI's answer, the draft and the log write each have a failure path, so a failure is flagged rather than hidden.

A separate flow produces a weekly summary report, also as an unsent draft.

Built with AI assistants (ChatGPT, Claude) under my direction. The design decisions, business rules and draft ratings are mine.

**Estimated running cost:** about $16–$24 a month at small-shop volume (15–100 emails a day). That covers one **Power Automate Premium** license ($15 per user per month, Microsoft list price, November 2026) plus **AI usage**: the AI Builder prompts, billed as Microsoft Copilot Credits, about $1–$9 a month at the basic model rate. It assumes the shop already has Microsoft 365 email and would cost more with a pricier AI model. This is a desk estimate; the assumptions are in the [runbook](runbook.md).

## How I tested it

I wrote the pass bar before building: **27 of 30 correct, zero critical failures, 80% of drafts usable, and pricing always right.** I built a set of 30 test emails, including tricky ones: fake urgency, hidden instructions to the AI, resends and attachments. ChatGPT drafted the emails and their expected answers. I went through and approved each answer one by one before any test ran. Then I froze the set so results couldn't be fitted to the test.

Final run (v3) against that bar:

| Check | Bar | Result |
|---|---|---|
| Correct outcomes | 27 of 30 | **27 of 30** ✅ |
| Critical failures (missed urgency, unsafe draft, skipped review) | 0 | **0** ✅ |
| Pricing in Sales drafts | always right | **6 of 6** ✅ |
| Usable drafts | 80% | **77%** (10 of 13) ❌. AI-written drafts 8 of 8; the fixed Support sentence 2 of 5 |

How it got there: v1 fell short on accuracy (25/30). v2 reached 27/30 but missed one urgent "STOP, don't print" email. v3 fixed that, and nothing critical was missed.

For v3 I wrote the rules down before the run, ran it **once**, and didn't tune it afterward. I also deliberately broke four things (the AI call failing, a malformed AI answer, a failed log write, an incomplete weekly report) to confirm the flow catches each one. One of those tests exposed a real bug, which I fixed.

## What I learned

- **Safe isn't the same as useful.** For Support emails, the design used one fixed, pre-approved reply so the system could never promise a refund or a reprint, and it never did. But testing showed that for urgent problems ("stop the job," "is my order ready?") a generic line helps nobody; the customer wants to know their specific issue is understood. Every reply the AI wrote, by contrast, was one I'd send (8 of 8). **Next version:** urgent order problems get flagged for the owner to answer directly, and whether to send any automatic "we got it" reply is agreed with the owner up front.
- **Walk real emails through the design before testing it.** For each kind of email, ask: what will this customer actually get back, and will it help them? That simple walkthrough would have shown that every Support email gets the same generic line, which can't help someone who needs a job stopped today. It's a common-sense check, but it wasn't a formal step, so the gap only surfaced in the final test. It's now a step at each stage of a build and once more before any formal test.
- **Test the safety checks themselves, with bad input.** The flow already checked every AI answer before using it. To test that check, I deliberately fed it a broken answer: a word where a number belonged. The check itself crashed instead of catching it, so the email was never flagged for the owner. No reply went out, but the safety net had a hole. I added a format check in front of it and re-tested, and the broken answer was caught and sent to the owner. Since no one can predict every failure, the rule built in is: when anything unexpected happens, the email goes to a person.
- **Verify a platform's limits before promising a control.** My incident drill flagged that run history might expose customer emails. I opened a real past run and confirmed it: Power Automate keeps the full email for 28 days, and this Outlook trigger offers no setting in the designer to hide it. I documented it with evidence and listed it as a decision for the client's admin.

## Known limits

Synthetic data only, and one mailbox. The test set was also used during development, so results don't prove the system generalizes. Resend detection uses keywords rather than Outlook threading. Drafts aren't threaded replies. Duplicate handling under load, the restore process and effort savings were not measured. Full list: [limitations.md](limitations.md).

## Details

- [Runbook](runbook.md): operating guide, failure handling, costs and the incident tabletop
- [v3 test write-up](evaluation/runs/run-2026-11-24-frozen-policy-v3/README.md) and [the rules set before it](evaluation/POLICY_V3_SCORING.md)
- [Charter](charter.md), [decisions](decisions.md), [admin questions](admin-questions.md)
- [Evaluation history](evaluation/README.md) and [failure tests](evaluation/failure-testing/isolated-2026-11-17/README.md)
