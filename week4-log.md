
## Monday 9.21.26 - Self-hosted n8n, v1 re-verified

Moved off n8n Cloud onto my own laptop. Installed n8n through npm (PowerShell blocked npm until I used npm.cmd), backed up the encryption key, activated the free community license, and proved persistence with a restart.

Rebuilt the Rivertown table from the seed CSV, imported v1, repointed the four table nodes, recreated the Header Auth credential, and re-ran all ten Postman cases. All passed, same as on Cloud. Along the way: browser Postman can't reach localhost (installed the desktop app), a Postman body set to Text instead of JSON gets correctly rejected, and the CSV export shifts every timestamp by five hours. I also caught that allowing Node through the firewall had exposed n8n to my network, and turned those rules off.

Fixed the stray "=received_at" field name and pushed v1.1.

## Tuesday 9.22.26 - Lead Intake v2: AI triage

Rebuilt v2 from scratch in case-study mode after a rough first attempt. The AI only sees leads the rules can't route. It returns a category, a confidence label, and a one-sentence reason, forced into a strict schema. A confidence gate auto-routes only when the AI is highly confident and the category is real; everything else goes to a human with the AI's opinion recorded. An AI failure routes to review instead of losing the lead.

I wrote the prompt myself, including category definitions and a fence around the customer's message so instructions hidden in it are treated as data. The ideas that stuck: store the AI's opinion separately from the outcome so it can be graded; "who decided" and "why" are different columns; a low-confidence answer is not the same as a failure; copying a workflow inside one instance silently points at the original's table and webhook.

Tested end to end: Ingrid ("ongoing monthly advisory work") auto-routed to consulting at high confidence. Desmond ("not sure what the next step is") came back Training at medium and went to review. Both passed through the real URL from Postman.

Process lessons: the teaching works when I'm asked to propose and then corrected, not handed finished answers. Show me the test record when asking me to predict. Closeout is straight directions only.

Next: test the Error path, then build a frozen evaluation set.

## Tuesday 9.22.26 (late session) - Error path tested, evaluation set built

Woke up from a nap around 8 and decided to keep going after the earlier session.

Broke the AI on purpose. Made a fake Groq credential and swapped it in so the model call would fail, then sent a new lead through Postman. The lead survived: 200 response, every field saved, AI columns blank. But the row said routed_by "rules," which wasn't true. The rules didn't decide; a failure did. Changed it to an expression so failures now say ai_failure, then proved both sides: Marisol's failure reads ai_failure, and Desmond's message resent under a new ID still reads rules, with the exact same rationale as the earlier run.

Found along the way: retry was in my decision log but switched off in the build. The duplicated Postman request still pointed at v1's URL (fixed every v2 request). Swapping credentials silently erased my model, and n8n filled in a different one.

Then designed the evaluation set: 27 synthetic leads, clear, ambiguous, prompt injection, and empty. Labeled every one myself, one at a time with the definitions right next to it. Labeling showed me my own category definitions have gaps: a workshop at a conference can read as training or speaking depending on how literally you take them. I decide by format; the definitions don't mention format.

Set the release rule: zero leads auto-routed somewhere I didn't approve, and at least 14 of 17 clear ones auto-routed correctly. Cautious is fine. Confidently wrong is not.

WHAT I PUSHED BACK ON:
- Twice I was told to delete something when a new record would do. Duplicate and use a new ID instead; don't destroy earlier evidence.
- Too much information at once, again, and design questions about things I had no context for. Context first, then the question.
- JSON packed onto one line is hard to read.
- The closeout came as one giant message. One step at a time, every time.

Exact stopping point: error path tested, eval set labeled and saved, threshold set. v2.1 exported and unpublished.
Exact next step: run the 27 eval cases through v2 and score them against the threshold.

## 2026-09-23 - Evaluation day: from 4 dangerous routes to 0

What I did: ran the frozen 27-case evaluation set against Rivertown Lead Intake v2 and kept going until it passed the release threshold, then tested it on 10 new cases it had never seen.

How: Postman's Collection Runner wanted a paid plan for data files, so I switched to Newman (Postman's free command-line runner). One templated request, the eval CSV as the data file, a run ID added to every external_id so reruns get past dedup without deleting earlier evidence.

What happened:
- R1 was spoiled by Groq's free-tier rate limit (7 cases failed). Lesson: check the error before blaming the model. Slowed the pacing.
- R2 baseline: 4 dangerous auto-routes, all ambiguous leads the model called "high".
- I walked through each failure and put my own labeling reasoning into the prompt as rules. No change (R3).
- Bigger model (gpt-oss-120b) fixed 2 of the 4 (R4). Another prompt rewrite fixed nothing (R5). The model just echoed whatever words the definitions used.
- Changed the design instead: the model now lists other categories a reasonable reader could choose, and the workflow only auto-routes if that list is empty. R6: 0 dangerous, 14 of 17 useful. Passed.
- Holdout (10 new cases, labeled before running): safety held, usefulness 4 of 6, below target. Not tuned afterward.

What I learned:
- Asking a model how sure it is and asking it what else the message could mean are different questions. It is bad at the first and decent at the second.
- Change one thing per run.
- Rewording a prompt changes the model's vocabulary before it changes its decisions.
- Tuning against the same test set is not proof. The holdout is.
- The last call on usefulness belongs to the client.

Stopping point: v2.5 exported and unpublished; docs updated. Next: client-facing evaluation summary, then Week 5 evaluation and security work.


## Friday 9.25.26 - Client summary, deep research, and rules for automating it

Started out to write the Rivertown client summary by hand and pushed back. Writing reports is exactly the busywork a consultancy would automate, so we're building that instead: an n8n workflow that drafts client evaluation summaries. It's useful for my own practice and a portfolio piece.

Also called out the last two days: 15-16 hours for about an hour of real learning. New working rule: name the learning goal up front, go Socratic only on new concepts, and run evidence work fast.

Ran the same deep research prompt in ChatGPT, Perplexity, and Gemini, with an identical output format so they could be compared. Claude compared them. ChatGPT's was clearly the strongest, but we weighed the evidence rather than voting. Worked through six conflicts one at a time: exact counts plus one "roughly 1 in X"; limits before the decision so the memo ends on the action; a plain verdict on a missed target with honest context; no forecasts from a hand-built test; an AI can edit but never approve; flag long sentences instead of failing them.

My own contributions that became rules: an editor pass (the "can you do better?" habit) instead of an AI judge; the governing principle that an oversold client does more damage than a lost sale; and "make it easy, not impressive."

Then pulled Claude back when the pipeline got over-engineered. The goal is the best draft with the fewest inputs; my review is the safety net.

Reviewing revision 3 of the summary caught real problems neither code nor an AI editor would have:
- "Sends it to the team" was wrong. The build only records the team in a table; delivery was never built.
- Option B described a mechanism ("loosening the check") instead of what happens to the business.
- "Clear inquiries" and even "inquiries" were jargon. Now "straightforward requests" and "messages."
- A pilot commitment hid that it depends on the client's teams.
- The 500-word cap was cutting real content. It's now a target, with one page as the ceiling.

Most of these became permanent rules in the guide.

What I learned:
- Before automating a deliverable, make one good example by hand. It's the test for the automation.
- Judge a source by whether it fits the claim, not where it's published.
- Double-barreled questions produce wrong assumptions. One question at a time.
- If it takes a PhD a moment to follow, a manager will call you.

Stopping point: rules, template, checklist, and the approved Rivertown summary are done. Next: define the standard input format, then build the n8n workflow.



## 2026-09-26 - Eval Summary Drafter: built and running

Built the workflow that drafts client evaluation memos. It runs end to end on Rivertown: code computes the facts, one AI drafts, a second edits, code checks, one automatic fix, recheck. Anything still wrong arrives as a flag.

The morning went badly: unclear questions and talking over me. Once we set the plan (six steps, time-boxed) it moved.

What I built:
- Two input files: a test-results file (one line per test item) and a one-time client setup.
- Eight workflow versions, each fixing what the last run showed.
- Code checks for numbers, banned words, groups, the target question, units, and numbers written in words.
- An options playbook in the guide, so the choices at the end come from a rule, not the AI's imagination.

What I learned:
- When the AI invents a fact, the fix is usually a missing input, not a better prompt. The first draft said the client's staff wrote the tests, because nothing said who did.
- An AI editor only fixes what its checklist names. Mechanical rules belong in code.
- Give the AI a short name for a concept ("wrong route") or it pastes the long definition.
- Test the checker on memos you already have, including the approved one. That caught bugs in my own checks.
- Test on a second, deliberately different client. Rivertown wording had leaked into code meant for everyone.
- Groq's two errors mean different things: too many requests (wait) vs request too large (send less).

Problems: rate limits, an empty draft from a token cap, long pastes getting cut off, and a slow start.

Last step: a live run on a made-up invoice client. Right client, right numbers, the wrong amount described, fix-and-retest recommended. It generalizes.

Stopping point: the drafter is done (v9). Drafts need 2 to 4 small edits, and those are judgment calls, which is my job by design. Next: Week 5 security work.



## 2026-09-28 - Week 5 security block: threat model for both builds

Started 9/27, finished 9/28. Threat matrix, OWASP/NIST tags, four controls in Rivertown v2.6, a live attack run, and a threat model that goes public.

The morning went badly: tried using voice in Claude for the first time and it started talking over me before I could finish asking a question. It's too bad, as hearing and reading could really help learning. Finally, after a decently long conversation about waiting for me to finish, it said it could not hold a real conversation, as a breath taken is very similar to hitting enter in the text box. It was an ongoing problem for the last two days, and I've finally given up on voice. Closed voice and set the plan. Once we set the plan (time-boxed) things moved at a regular pace, but slower because of the manual reading and changes to improve professionalism and accuracy.

What I built:
- Threat matrices for Rivertown (10 rows) and the drafter (5 rows), each tagged to the OWASP LLM 2026 list, the OWASP Agentic list, and NIST AI 600-1.
- Rivertown v2.6: a blank-message check (the AI never sees an empty message), a 5-second retry wait, and a documented kill switch with rollback.
- A seven-request abuse collection in Newman. 17 of 19 checks passed; the two failures were the gaps I predicted before the run (card number stored, guessed-ID attack blocks a real lead).
- threat-model.md, a v2.6 README for the case, and updates to the runbook, decisions, limitations, and n8n-patterns.

What I learned:
- The core idea: you never fix the AI. You fix what reaches it, what it's allowed to do, and where the human looks.
- The five terms to know for client conversations: prompt injection, sensitive information disclosure, excessive agency, hallucination, overreliance.
- You can't reliably filter out every bad input, so limit what a fooled AI can do.
- Write the expected result before a test runs. A test that passes when the system is off is worthless; my first run proved it.
- A safety feature built for honest mistakes (dedup) can be turned against real customers.
- Check the decision log before calling something a bug. A "finding" turned out to be a choice I'd made on 9/22.
- A workflow export is the design, not the evidence. Save test logs separately.
- Write documents for the reader: past tense, no "new" or "now," sources for every claim, and say plainly when Rivertown is fictional.

Problems: too much information at once, again. The edits landed in the original workflow instead of the copy (duplicating opens a new tab), fixed by swapping names. A "restore" to clean up line endings would have wiped the day's edits; caught on a double-check.

Stopping point: security block done and committed. Before any real client data: random form IDs, a form note plus a retention limit, and detailed errors turned off.


## 2026-09-28 (evening) - Week 5 Friday: release rules, a failed regression, and a second opinion

Planned: finish the release thresholds, rerun the frozen test set on v2.6, tag the release. What happened: v2.6 failed, and I built v2.7.

What I did:
- Wrote the full release rules before any test ran: hard lines (no badly formatted answer routed, no forbidden actions, no worse on trick, empty, or ambiguous messages) and budgets (AI failures, reply time, cost, review load).
- R7 on v2.6 failed. EVAL-07 ("Could someone present on AI tools to our staff at our quarterly all-hands meeting? About an hour.") went straight to Speaking. R8 did the same thing, word for word. On 9/23 the AI had said "maybe Training" and that maybe was the only thing stopping it. Nothing changed on our side.
- Asked myself what I'd do if I couldn't trust the sorter to say "not sure": ask somebody else. Built a second opinion from a different company's AI (Qwen), only on leads about to be sent automatically. Both have to agree, be sure, and list no maybes.
- The first smoke test sent a clear lead to a person even though Qwen agreed. The gate was comparing against literal text because one box wasn't in expression mode. One-lead smoke test, one-minute fix.
- R9 on v2.7: 0 dangerous, 14 of 17. Qwen held exactly one lead, EVAL-07. Holdout H2: 0 dangerous, 4 of 6, same as before.
- Asked the manager question: if Qwen caught it, why isn't Qwen first? Tested Qwen alone: 16 of 17 on the practice set, but 4 of 6 on the holdout, exactly the same as the OpenAI model (gpt-oss). Better on the practice leads, no better on new ones. Set the verdict before running, so the answer was clear: v2.7 stays.
- Saved everything, tagged lead-intake-v0.2-evaluated. Rivertown is done.

What I learned:
- One passing run isn't proof. The same AI gave a different answer on a different day.
- A second opinion earns its place by being independent, not by being better. A checker that can only say "no" makes a system safer, never more useful.
- I put the second check right after the first AI's "yes" and before the lead gets sent automatically. Leads going to a person already get a human look, so checking them again would only cost more.
- If different AIs keep "missing" the same test leads, check the answer key before blaming the AIs. The answer key is the list of correct answers I wrote for each test lead. For H-04 ("new supervisors don't know how to run one-on-ones") and H-06 ("team feels disconnected since we went hybrid"), I said each should go straight to one team. But both AIs, in every setup, said "this could be Training or Consulting." When two different AIs keep hesitating on the same messages, maybe the messages really are unclear, and my answer is the thing that's off. The fix isn't to change my answers to get a better score. It's to ask the client how their own staff would route those messages.
- A {{ }} value only works in expression mode.
- Decide what a result will mean before you run the test. Before the Qwen runs, we wrote down the rule: Qwen alone only counts as a real option with 0 dangerous routes, at least 14 of 17 on the practice set, and at least 5 of 6 on the holdout. We ran the holdout first because it was smaller and told us more. It came in at 4 of 6, so Qwen alone was out, and the second practice run couldn't change that. Skipping it saved about 15 minutes and Qwen's daily allowance. Same idea as writing the release rules before R7: nobody gets to move the goalposts after seeing the score.

Problems: the day started with a page and a half of directions at once, and I said so. Three days of mostly documents felt like I wasn't learning anything; tonight's design work fixed that. Paste-ready values kept showing up messages earlier instead of at the step, so that's now a rule.

Stopping point: Rivertown Lead Intake closed at v2.7, committed and tagged. Next: Week 6, Microsoft access, and a Gate 1 score.
