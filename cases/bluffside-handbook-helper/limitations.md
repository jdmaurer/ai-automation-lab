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
- The time-off confirm is the AI's read-back, not a hard stop; Dana's approval is the hard stop. A mistaken slip reaches Dana as Pending and is declined.
- Note is required until the next session's fix; a tech who has no note has to type something.
- The request ID uses the server's clock (UTC), so a late-evening request in Winona shows tomorrow's date in the ID.
- "Business required" on a Dataverse column applies to forms, not to flows; the flow itself has to check required values (empty-email guard coming next session).
- Tested only as one user (Josh). "Someone asking for another person" is blocked by design (identity from the sign-in) but not yet tested with a second account.

## 2026-11-08
- No note on time-off requests. A tech who wants to explain tells Dana directly. A note can be added back through a topic with buttons (decision 34).
- The empty-email guard is a backstop that testing cannot reach: the chat always fills the email from the sign-in and the flow refuses a blank. Reviewed, not run.
- Given an impossible date, the helper refuses but does not ask for the right one; the tech starts over.
- Timeout not tested. Approvals wait up to 30 days; a slip nobody answers stays Pending.
- Someone acting for another person is blocked by design (identity from the sign-in) but untested: the lab has one user. Access blocker, not a pass.
- After a failed publish, the agent-flow designer may show "Illegal state: resolveOrgUrl: instanceUrl is undefined" and offer "Recover flow" with an older copy. Save draft, refresh, then publish; do not recover a copy older than the last save.
- Microsoft's content filter can block an override attempt outright (N10 in the 11-08 run returned "ContentFiltered"); the employee sees an error rather than the hand-off. Safe, not friendly.
- Topic choice still varies between runs: A9 passed on 11-07 and failed on 11-08 until the Repair topic was narrowed. Re-test topic edits on both the target questions and nearby ones.
- The tech isn't told when Dana answers. Her decision is recorded in the table; she tells the tech herself. Can be added: a message back to the tech when Dana answers.
- The duplicate check matches person + first day only. Overlapping requests with different first days (17-19, then 19) are both filed; Dana sees both. A repeat with the same first day but new dates returns the old ID and files nothing. Requests can't be changed or cancelled through the helper; the tech tells Dana. Can be added: an overlap check on the date range.
- The lab has one environment. Moving a change from a development copy to a live one is described in the maker guide. The export half was done on 2026-11-09 (managed and unmanaged 1.0.0.1, solution checker 0 issues); the import half is untested here, and its steps follow Microsoft's documentation.
- Switching the helper off from the Teams channel wasn't checked, because the trial can't publish. Blocking the app in the Teams admin center is the standard admin control for switching it off.
- The request tool runs on the author's (builder's) credentials, per Copilot Studio's publish check. In a client tenant the flow's connections move to a service account the client owns (admin question 9).
