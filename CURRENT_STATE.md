# CURRENT STATE — updated 2026-11-25 — RESUME HERE

Canonical baton under [AI_HANDOFF_PROTOCOL.md](AI_HANDOFF_PROTOCOL.md). Active Week8 case: [Driftless Inbox Triage](cases/driftless-inbox-triage/README.md). **Scope frozen. Essential documentation complete; overall release NOT_ESTABLISHED.**

## Exact stopping point — Claude closeout, November 23

Claude's independent review (November 19) found the remaining Week 8 work was desk work, not more testing. Josh approved a bounded closeout: three desk items from saved evidence, a one-line acceptance verdict, then Josh's honest Gate 2 score. **No flows, prompts, connections, tests or exports were touched.**

Done November 23:
- **Rates and slices** from the saved v2 run, offline: missed urgent 1/7 (DRI-12), false urgent 0/23, required review missed 0/23, forbidden draft 0/16, review rate 23/30. Reproduces the official score. [evaluation/README.md](cases/driftless-inbox-triage/evaluation/README.md).
- **Low/base/high operating-cost scenarios** with current licensing. Since November 1, 2026, new Premium licenses carry no AI Builder credits; prompts bill through Copilot Credits. [runbook](cases/driftless-inbox-triage/runbook.md).
- **Incident tabletop** for a wrong classification and a sensitive-data exposure, with implemented, procedure and recommended controls separated. Gaps found: no urgency alert, run-history exposure unverified, disable path never drilled.

**Prototype acceptance verdict: FAIL** on the frozen v2 run's critical rule (DRI-12 missed urgency). The v3 order-change rule is a published candidate fix, targeted-tested only. The pending v2 owner ratings cannot change that verdict. They are closed as *not collected*.

DRI-12 is a failure of the charter's acceptance rule. It is **not** one of the Master Calendar's six Gate 2 critical failures.

**Gate 2 (Josh, November 23):** market evidence scores 0 because operator conversations are deliberately scheduled for December, not missing. Claude's proposed technical scores total 13/18; Josh has not finalized them. No calendar critical failure was identified.

**November 24 — guided walkthrough (read-only).** Claude opened the live main flow in the Claude desktop app's built-in browser (signed in as josh@joshmaurer.onmicrosoft.com) and taught it block by block. For each block it gave the Power Automate action name, the n8n equivalent and a plain two-line purpose. The whole main path is covered, from the trigger through Log - Complete. **Nothing was saved or published.** Three limitations were added to limitations.md: keyword resend detection, non-threaded drafts, and send-capable connection.

**New way of working:** Josh clicks, and Claude reads the page as text and explains, one block at a time. Short answers: one table row per block (Power Automate name, search term, n8n equivalent, what it does). No screenshots unless needed.

**November 24, later:** the Secure inputs/outputs change was **stopped**. The Outlook trigger offers no such setting in either designer. The run-history exposure is verified and logged as a limitation; the code-level route is untested. Nothing was saved or published.

**v3 fair-test rules approved by Josh (Nov 24), before any run:** [POLICY_V3_SCORING.md](cases/driftless-inbox-triage/evaluation/POLICY_V3_SCORING.md).
- Charter thresholds unchanged (27/30, zero critical, 80% usable drafts, Sales pricing).
- Effective priority scored, raw kept.
- Josh rates drafts only.
- One shot.
- DRI-22 second number is informational only.

Scorer `evaluate-policy-v3.mjs` passes 11 artificial-only tests. The v1 and v2 suites still pass 12/12 each. No run has been prepared or made.

**v3 fair test RAN, November 24, 2026: FAIL.** One run, no tuning; [results](cases/driftless-inbox-triage/evaluation/runs/run-2026-11-24-frozen-policy-v3/README.md).
- Primary 27/30 ✅, critical failures 0 ✅ (DRI-12 is fixed), Sales pricing 6/6 ✅.
- **Usable drafts 10/13 (77%) ❌.** AI drafts were 8/8; the fixed Support sentence was 2/5.
- Josh's finding: a canned acknowledgment is not useful for urgent customer problems; urgent order issues should be flagged, not drafted.
- Per the one-shot rule, **no further tuning or reruns.** The Driftless build is closed.

**WEEK 8 CLOSED, November 24, 2026.**
- Plain-English case README published (Josh-approved).
- Gate 2 scored by Josh, by purpose: **18 of 18** on nine areas, passed, no critical failure. [Scores and evidence](cases/driftless-inbox-triage/runbook.md).
- Market evidence moved out of the gate; operator conversations happen in December, when they happen.
- The one gap (never restored the backup) closed the same night. The backup was restored into a separate Trial environment, "Driftless Restore Practice" (expires about Dec 24), with zero runs. The restored main flow came up On despite the import setting and was turned off.
- Tagged `week8-portfolio-v0.5`.

**Standing rule (Josh):** a gate is a checkpoint that shows what to work on. Score by purpose. Things he could reasonably do tomorrow, or that can't be done yet, don't hold him at a gate; genuinely thin skills get real work.

**Single next action:** open the next chat by going through the "Ask Josh first" list below, one question at a time. Then the before-December-8 Microsoft items, then Week 9.

## Weeks 9-12 direction (chosen with Claude, November 22-25)

Source: the November "what gets built" research (marketing-track `research/what-gets-built-comparison-2026-11.md`) plus Josh's judgment. Builds 1, 2, 4, 5 and 6 from that research already exist: lead intake (Rivertown, n8n and Power Automate), email triage (Driftless), document assistant (Bluffside), quote drafts from an approved price sheet (Driftless), weekly report with formulas plus AI commentary (Driftless). Do not rebuild them. Their demos come from the existing cases.

**Before December 8 (Microsoft access ends; about 3 hours total):**
1. Record the Driftless demo. Needs the live lab mailbox. Plan, emails and shot list: [demos/demo-05-inbox-triage.md](demos/demo-05-inbox-triage.md) (written Nov 25).
2. Free Copilot Chat session in the lab account, about 90 minutes. Free Copilot Chat needs an eligible Microsoft 365 subscription, which ends with the mailbox. Copilot training stays "not on the site yet" until Josh says.
3. DROPPED Nov 25 (already done): Business Basic was set to cancel on expiration with Claude on Nov 9 (page reads "Expires on December 9, 2026", no charge), and notes show no pay-as-you-go billing attached. Only leftover: accept the Copilot Studio 30-day extension if Microsoft offers it around Dec 6. Original item: 10-minute account check: Business Basic still set to "Cancel on expiration" (a card is on file); no pay-as-you-go billing plan attached for Copilot Credits; Copilot Studio trial end date (about Dec 6; accept the 30-day extension if offered).
4. Turn off flows that use the lab mailbox so nothing errors over the holidays.
- Around December 20: open the Developer environment once. Microsoft disables it after 30 days unused. Solution exports in the repo are the backup (restore proven Nov 24).
- Driftless Restore Practice environment expires about Dec 24: let it go.
- Nothing in Weeks 10-12 needs paid Microsoft: Week 10 retrieval and MCP run in n8n/Claude (calendar allows "Copilot Studio or n8n"; Bluffside already covers the Copilot Studio side); Week 11 uses saved pricing; Driftless is closed, so Week 12 uses its saved runs.

**Week 9 = the paperwork review queue: n8n workflow + Python test bench** (revised Nov 25 morning with Josh; replaces the overnight "all in n8n" version):
- Rule (Josh): the program only ADDS. Research on what clients buy picks the case; it never removes a Master Calendar skill. The overnight version had quietly dropped the calendar's "go beneath low-code" method. Restored.
- The job (from the four "what gets built" runs, checked Nov 25): documents arrive, only the needed fields go into fixed Excel columns, checks run (math, required fields, known sender), repeats are caught, uncertain reads go to an exception queue, nothing reaches the books, every file is logged. The research does not mention handwriting, and its evidence of paid jobs is thin (ChatGPT run: 0 confirmed paid invoice jobs; one self-reported $3,650 project; Fiverr offers $25-200).
- Correction: Josh's firsthand client job was NOT invoices. It was a nonprofit manager's admin paperwork: people filled in pre-printed handwritten forms, and a custom GPT pulled specific boxes from several forms into the computer. Handwritten forms go into this build as one document type (2-3 types max). It is Josh's firsthand evidence, not research: add it to the December claim list. Avoid sensitive nonprofit records (case notes, client intake); volunteer hour sheets or donation slips are low risk.
- Split (agreed): n8n runs the workflow a client would buy and keep. Python is used only where it is genuinely the better tool: the test bench (score the frozen set against the answer key, compare two models, repeat runs, the report), one direct call to the model service to see what n8n's AI block hides, and the failure tests. Claude Code writes the code; Josh reads, supervises and explains it back. In n8n, Claude drafts the whole workflow and Josh checks it, not click-by-click.
- Calendar Week 9 skills kept: direct model call with a spending cap; the model in one swappable spot; a deterministic fallback; failure tests (missing key, timeout, rate limit, bad output, service down); secrets only in environment variables plus .env.example; run traces with correlation IDs and a summary command; one failure rebuilt from the log alone; a deterministic scorer plus a human-reviewed rubric scorer, with agreement checked on 10 cases; repeated runs and results by slice; the calendar's 50 cases (the 12-file draft is a start); Claude Code vs Codex on the same broken scorer.
- Laugh test DONE Nov 25 ([replies](cases/invoice-review-queue/laugh-test-2026-11-25/README.md); AI role-play, ideas not evidence). Changes adopted, with Claude's cutbacks. Rule: an addition is in if it means "capture a field" or "flag with a reason"; it is out if it means "make the business decision."
  - Duplicate vs revision: same file = duplicate; same ticket number with different content = revision, keep both versions and flag the change.
  - Document type field: invoice, credit memo, statement, packing slip, work order, other.
  - Business flags: margin notes such as N/C, warranty, callback, "bill landlord", "paid cash" are captured and flagged with a reason; a person decides billing.
  - Silent-failure test: every file received appears with a status.
  - Two linked tables: documents and line items (parts and technicians), with a job-number column. No jobs table (that is job-costing software).
  - Messy documents: one multi-page invoice is read; back-of-form and two-forms-in-one-photo go to exceptions.
  - Number sense check for misread handwriting (e.g., more than 12 hours on one visit).
  - Signature: captured as signed yes/no, never transcribed.
  - To limitations: splitting a supplier invoice across jobs, billable vs worked hours, price vs quote, finding lost tickets.
- Handwritten files (Josh, Nov 25): Josh writes them alone, on plain paper, no printer or scanner (setting them up would cost half a day). About 6 short sheets; Claude supplies the exact text. Most saved with the phone's scan mode (flat PDF, like an office scanner, which matches Josh's real nonprofit case); a couple as plain phone photos (tech in the field). One sheet can make several cases: rescan after adding a line = revision; a tilted, dim photo of the same sheet = bad photo. Only handwriting-specific cases are handwritten; all rule cases are generated.
- Output must open in Excel (two sheets: documents, line items). Google Sheets once, for Josh's confidence.
- Python learning path: OPEN, Josh has more questions (Nov 25). Discussed: DataCamp Intermediate Python for Developers, then Introduction to APIs in Python, chapter by chapter before the build piece that uses it; or learning Python through Colab, Streamlit, Gradio and Hugging Face. Not decided. The project record still names Google's Crash Course on Python; Josh actually did DataCamp Introduction to Python (Oct 14).
- Done: every test file lands where the answer key says; clean fields match; a second full run adds zero rows; an alert fires on an error or on a run that produces nothing; a one-page runbook with a 30-day check question; Josh explains each major piece back; a demo labeled "a demo built on sample data, modeled on a common request," people named only Jack, Jill, John, Jane.
- First piece (still fine as the n8n front door): an n8n form trigger (search "On form submission") with a file field, to see a file arrive as binary data.
- Sample business: the bakery is a placeholder and now likely wrong (the real need was handwritten forms). Draft test set needs reworking before freezing. Draft files, answer key and generator (not frozen): [cases/invoice-review-queue/test-data-draft/](cases/invoice-review-queue/test-data-draft/README.md).

**Later builds (from the approved November 7 list; nothing removed):**
- Meeting notes to decisions, owners, due dates and follow-up drafts, in n8n, inside Week 11 (discovery calls). Josh's own business would use it.
- Payment reminders plus quote follow-up reminders: small, mostly no AI, after the invoice build.
- Block 5 sign-up flow stays in the marketing track. Josh's n8n runs on his laptop, so a live website form needs n8n reachable from the internet: decide at Block 5.

**After Week 12:** local-models track: LM Studio, then Ollama, then swap the invoice build's AI step to a local model and run the same answer key. Check laptop memory first. Any public claim about where companies are going needs a source.

**Design rules for every new build:** a person approves before anything goes out; AI sorts and drafts, formulas and rules do the math and actions; an exception queue; duplicate protection and safe reruns; an alert for failures and for runs that produce nothing; a one-page runbook; a 30-day check.

## Ask Josh first (next chat, one question at a time)

1. ANSWERED Nov 25: not invoices; nonprofit handwritten admin forms on pre-printed layouts, specific boxes pulled from several forms. See Week 9 above.
2. DECIDED by Claude Nov 25 (Josh asked Claude to run the build choices): a small heating and plumbing service company (~8 people). Techs fill handwritten work orders on pre-printed forms (phone photos, no printer at home: write on plain paper with the form layout on screen); suppliers send printed parts invoices (PDF); the office manager (Jill) types both into Excel. Two document types. Laugh test (item 4) runs on this plan before the test set is rebuilt and frozen.
3. IN PROGRESS Nov 25, claim by claim (revised list adds handwritten forms; claims Josh has seen firsthand need no December test). Claim 1 "small businesses and nonprofits still type invoices and paper forms into a spreadsheet by hand": CONFIRMED by Josh firsthand, not tested. Constraint for the handwritten test files: no printer at home. Claim 2 "they would pay to stop": NOT asked. Josh: the research already shows it annoys people, but it is not what brings a manager or owner to the table (they rarely feel the pain and won't pay ~$3,000 for it as a first buy). It is a follow-on offer after trust: "I've seen your people do this by hand; this saves them real time." Possible exception to watch: bookkeepers and CPA firms, where the person with the pain is the buyer. Claim 3 "Excel matters more than Google Sheets": CONFIRMED enough by Josh firsthand (every live session and speaker he has seen uses Microsoft); bottom of the December list, ask only if it comes up. Josh can't ask owners many questions at events, so the list must stay short. Add one Google Sheets output somewhere as a one-off, for Josh's own confidence in saying "I've done it," not for marketing. Claim 4 "resent/duplicate documents are a costly problem": DROPPED from the December list (unknown, and it doesn't change the build). Duplicate protection stays a build standard in every build: it comes from the Master Calendar's reliability rule (automations retry and rerun, so the automation itself can double-enter), it is a plain rule, not AI, and Josh has already proven it in n8n/SQLite and Power Automate/Dataverse. Claim 5 "drafts held for approval beat automatic replies": DROPPED. Josh: it is context-driven (office hours or "yes, we offer that" could auto-reply; others need a draft first), most owners will want both, so we need to know how to build both. No rule change (Josh, Nov 25): practice builds keep the calendar's "nothing sends on its own" rule. For clients, a fixed pre-written auto-reply ("thanks, we got your message") is normal and fine to offer, with the risk explained. Claim 6 "short summary beats a dashboard": NOT asked. Known demand: AI tools now lead with daily briefings, a past prospect asked Josh for a daily competitor/market briefing, and the research lists recurring reports 4 of 4. Owners can't judge summary vs dashboard in the abstract: show both side by side instead of asking. Visual sells. Claim 7 "handwritten forms are common and owners name typing them as a pain": forms common = CONFIRMED firsthand; owner pain = NO except one-person or under-5-person shops. Bigger owners hand it to an assistant, so the pain is staff time, same as claim 2; pitch it as freeing the assistant's time. CLAIM LIST DONE Nov 25: no claim needs a December owner question. Original item: Diego Oppenheimer method, test A (claim ledger): turn the research into about six claims that could be wrong and test only the uncertain ones in the December conversations. Draft claims: (1) small-business owners or bookkeepers still type supplier invoices into a spreadsheet by hand; (2) they would pay to stop, as long as a person checks before anything is posted; (3) Excel matters more than Google Sheets for this group; (4) resent and duplicate invoices are a real, costly problem; (5) owners want email drafts held for approval more than automatic replies; (6) owners want a short weekly summary more than a dashboard. Josh confirms, edits or drops each.
4. Test B ("insider laugh test"), before freezing the invoice answer key: in ChatGPT or Gemini (saves Claude usage), ask a 10-year small-business bookkeeper persona why they would laugh at the invoice plan. Add any real case it raises (statements, partial payments, sales tax, multi-page invoices, credit memos) to the test set.
5. DONE Nov 25 (Claude, public-facing claims only): marketing-track research/source-check-2026-11-25.md. 4 supported (Goldman Sachs survey, Hazel Quimpo prices, CLA/Black & Co. with caveats, Palavir as self-report), 1 partly (Ted Taylor is restaurant cash reconciliation, not invoices), 2 not found (Reddit $2,000/month, the 9-person Midwest firm): don't use those. Original item: Test C (independent checker): have a different model open every source cited in the "what gets built" comparison and mark each supported, partly supported, out of date, or not found. The whole Weeks 9-12 plan rests on that research.
6. December outreach, Diego style: Claude drafts the outreach emails as Gmail drafts (allowed); Josh reviews and sends every one himself; Claude tracks replies.
7. ANSWERED Nov 25 (already decided before; recorded in marketing-track research/library/nvidia-nontechnical-tools-list-2026-11.md): tools a consultant needs come in through the builds; the rest go on the back burner until after Week 12, likely as website material for educators and learners in the marketing track. Not a path to work through now. Winona State program (ORIGIN, so Josh never has to explain it again: Winona State got a grant; the grant funder's contact gave Josh this 20-tool list as what that company teaches ALL of its non-technical staff; it was then adapted for the classroom with no tools or skills dropped. Treat it as an employer-grade curriculum for non-technical people, not a school-only list. Never name the company or person publicly.) Python link (Nov 25): Colab, Kaggle, Hugging Face, Gradio and Streamlit are where Python gets practiced on days no build lines up; the coding agents on the list (Codex, Claude Code, Copilot, Cursor) are read-and-supervise practice. the Nov 22 brief said learning all ~20 tools on the contact's list is a job-portfolio move. Not yet discussed. Never name the company or person publicly. Josh's ratings: high (core videos) ChatGPT, Claude, Gemini Notebook, n8n; medium LM Studio, Lovable, Teachable Machine, Ollama; low to medium TensorFlow Playground, Hugging Face, Streamlit, Langflow; low (link out only) Replit, Google AI Studio, Copilot Student + VS Code, Cursor, Colab, Kaggle, Orange, Gradio.
8. Marketing items already handed over (Nov 24 prompt): the "two founders, two rules about hitting send" video (Diego vs Mike Molinet of Dock); "managing AI is management"; Atlassian CEO lines for change-management videos (check his bank-branch claim first; US branch counts may be falling); Diego's claims-not-reports and laugh-test prompt as a workshop exercise; a plain agent definition. Dock's numbers are his own unsourced claims. Diego's weekly news sweep is a fit for the marketing competitor watch. Nothing for builds from Dock (its agents act on their own, on the "never" list).
9. Out-of-date points in the Nov 22 brief, for marketing to decide: its scope rules predate D127 (building one workflow for a client is on sale); the research file's "learn in this order" list was written as if nothing had been built.

## Verified build and evidence

| Item | Current recorded status |
|---|---|
| Main triage | Published, includes required-type Parse JSON/FI-02 recovery repair promoted November17. Original classifier/drafter inputs verified at publication. LOG-02 and earlier bounded smoke checks passed; REVIEW-01 remains an automatic-logging failure with assisted recovery. |
| Frozen30 helper | Published/manual isolated batch, no actual mailbox drafts/table writes. v1 primary25/30 FAIL; policy-v2 primary27/30 FAIL due to missed DRI-12 urgency. All original files/scores/blank forms preserved. |
| Order-change policy v3 | Main/helper Published, inputs verified. Every recognized actual/proposed/conditional/question-form existing-order change => Urgent + manager review regardless of date. E targeted4/5 exact,3/3 order cases; no new formal v3 score. |
| Accepted limitation | Contact-only update may be classified Support/change true and unnecessarily Urgent, with existing eligible fixed Support acknowledgment routing. Josh accepted it as noncritical. No tuning or relabelling. |
| Weekly report | Original Published. WS-01/WS-02 passed existing two-row count/output cases. Owner-review Outlook draft is unsent; final wording judgment pending. |
| FI-01 | Scoped classifier-action-failure recovery PASS, run `08584066687962115280420875208CU04`. |
| FI-02 | Original `08584066475931016390512579185CU11` remains FAIL. Separate repair `08584066464556424522963834692CU18` scoped PASS; main repair subsequently Published without retesting. |
| FI-03 | Scoped completion-write-failure recovery PASS, run `08584066443970741245268372506CU25`; one actual unsent fixed reply, review/same-row fallback retained actual draft and owner fields. |
| FI-04 | Scoped continuation/incomplete-retrieval stop PASS, one November19 run `08584064815087764006108930441CU17`,281ms. Original False stop `IncompleteWeeklyLogRetrieval`; counting/render/AI/report draft Skipped. Cloud Failed is intentional, not a failed FI-04 result. |
| Baseline | November17 original unmanaged ZIP/hash preserved. **Predates later FI-02 main repair**; published action snapshots document the delta. Not an exact current-version full recovery export. Restore/import untested. |
| Handoff | Runbook/operator reference, admin/ownership/retention/adoption guidance and acceptance/Gate evidence map complete as documentation. Operational training, client approval and Gate pass are not claimed. |

[Failure-test evidence](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/README.md), [FI-04 publication fix/result](cases/driftless-inbox-triage/evaluation/failure-testing/isolated-2026-11-17/execution/fi04/fixture-fix/README.md), [preserved baseline](cases/driftless-inbox-triage/baselines/published-policy-v3-2026-11-17/README.md), [published FI-02 delta](cases/driftless-inbox-triage/evaluation/configuration/fi02-main-recovery-publication-2026-11-17/README.md).

## What is still open — no automatic work authorized

1. **Owner judgments:** v2 packet still has30 behavior/safety,14 reply-quality and7 Sales judgments pending. Usability/80% threshold/90% target remain unestablished. Weekly report's final wording judgment pending. Historical failed full30 cannot be made a pass by later targeted results or owner ratings.
2. **Unproven runtime coverage:** exact-ID/alternate-key enforcement/concurrency, live resend handling, weekly nonzero Edited/Rejected, pending no-draft review, changed final category, empty/date-boundary cases. FI-01..04 are completed scoped simulations; do not repeat them as unfinished tests.
3. **Current-policy/recovery acceptance:** no formal v3 acceptance; future scoring would require prospective effective/raw-priority treatment and a new preserved run. Original ZIP alone would revert the later FI-02 repair; current-version full package and actual restore are not proven. No repeat export/import authorized now.
4. **Measured benefit/adoption/client readiness:** no measured20% effort reduction, completed operating-cost scenarios, training sign-off/backup, real-client identity/permission/retention approvals or support agreement. Thirty-day tracking retention is a pilot policy; automatic enforcement not demonstrated.
5. **Gate2:** authoritative standard is16/20 with zero critical failures. Evidence map exists; no full Gate score/pass or market-conversation counts invented. Wider curriculum evidence must be reconciled before a Gate decision.

These are disclosure/decision items. Documentation completion does not assert a clean release or require an open-ended production-hardening effort. Preserve agreed thresholds and all failed runs.

## Guardrails and live identifiers

Environment `88301e40-6106-ee47-900c-67a24cbc121e`; lab mailbox `josh@joshmaurer.onmicrosoft.com`; existing solution BluffsideHandbookHelper `90a43d55-5bd9-f111-a05d-000d3a367f8a`; log `jdm_table1s`, row ID `jdm_table1id`.

Original main runtime `53209c07-ca63-bcd9-c7f3-04b29c1f562a`; weekly `5712f23d-44e0-f111-84ea-000d3a367f8a`; evaluator `9ca55e5e-afe0-f111-84ea-000d3a367f8a`. Shared classifier `614118d4-6ca8-4344-b945-8659eb8bb3d8`; other-category drafter `e9c13e46-ec62-4cd4-b52f-b2f596db5821`; explanation `93a1dc08-e7e4-484e-98c6-0da214657570`.

**Fault copies remain manual-only Published with faults installed:** triage `bca4414b-abe2-f111-84ea-000d3a367f8a` (FI-03 fixture/completion fault); weekly `b2c2285f-60e4-f111-84ea-000d3a367f8a` (FI-04 continuation fixture/model-safety tripwire). Never use as normal originals or add Inbox triggering.

No automatic send/forward/delete/archive/move/resolve, order change, shadow body archive or real-client rollout. Synthetic data only. Baseline/export dependency and working connections are settled; do not revisit them.

Explain purpose/result before changes; concise steps, actual live UI, exact labels rather than color. Stop unreliable browser control; no retry loops. Shared prompt saves have reset input references: any separately authorized future prompt edit must verify both flows' classifier/drafter inputs before publication.

GitHub is updated remotely; fast-forward `C:\Users\joshu\ai-automation-lab` before local repo work. Sync GitHub source in Claude Project before switching assistants. Recorded lab mailbox trial end: December8,2026; no new entitlement check or renewal authorized.
