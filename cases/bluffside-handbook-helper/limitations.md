# Bluffside Handbook Helper — Limitations

Append-only, newest at the bottom.

## 2026-11-06
- Not shown to anyone, demo included, until the emergency script passes (baseline N7 gave Microsoft's placeholder text instead of the 911 line).
- Built in a Copilot Studio trial, which can't publish to staff. For a client it would run in Microsoft Teams under their license.
- Everyone sees the same handbook. Different documents for different people can be added in a client's tenant through their SharePoint permissions; the lab has no SharePoint.
- The handbook is short (about four pages) and some wording is deliberately loose (family member, truck use on the way home). A real client's handbook would be longer and needs a cleanup pass so it can be answered.
- Answers come only from the handbook files. It gives no legal advice and no repair instructions.
- A "use general knowledge" switch was not found in this version of Copilot Studio; the instructions forbid outside knowledge, and the baseline showed no outside answers.
- Synthetic data from a fictitious company.

## 2026-11-06 (evening)
- The emergency wording is ours, written for a fictitious company. A real client's safety procedure (and their gas utility's guidance) sets the words.
- The AI decides which topic to use. The words inside a topic are fixed, but whether it fires can change from run to run; tested with paraphrases, not guaranteed.
- After tonight's three instruction edits, only the targeted questions were rerun. Full regression is next session.
- A Repair questions topic catches repair and how-to questions; the AI may still route some to Escalate (Dana) instead. Both are safe; neither gives repair steps.
- HB-01 to HB-04 name the office manager; HB-05 names roles only. A real client's handbook would name roles throughout.
- When knowledge is searched, the REPLACED expense file still shows up among the files searched (it was not used in any answer).

## 2026-11-07
- Trial and developer environments are capped at 10 AI requests a minute and 200 an hour. A 36-question Evaluate run hit it; full reruns go in two halves. A client's paid tenant has higher limits.
- Evaluate's AI graders make mistakes (5 false flags in run 1). The approved rules, read by a person, decide pass or fail.
- Hand-offs name a person (Dana). Whether they should name a person or a role is a question for the client.
- Dataverse auditing is off for the environment; the approval record is the request's audit trail.
