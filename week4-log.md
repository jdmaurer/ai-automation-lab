
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
