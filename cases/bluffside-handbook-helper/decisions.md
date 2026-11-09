# Bluffside Handbook Helper — Decisions

Append-only, newest at the bottom.

## 2026-11-05
1. Who will use it. Before each build, ask who will use it: Josh's own business or a client. Chill & Shine (two people) would never use a staff-policy helper, so this is a client demo. The n8n lead intake should have been Josh's own; this one should be a client's.
2. The client. Bluffside Heating & Plumbing, a fictitious ~40-person home-services contractor near Winona and La Crosse, replaces Rivertown for this build. A consulting firm would rarely hire Josh; manufacturers mostly want production-line AI, not admin; accounting and law data must stay locked down. A contractor has staff who keep calling the office with the same questions. Different name from Rivertown so readers don't think it's the same company. Rivertown stays as the lead-intake example; portfolio examples will spread across industries over time.
3. The product. An employee handbook helper, because it's what Microsoft consultants lead with (Microsoft's adoption scenario library, Quisitive's top four agents, FOS's small-business example). One specific job, not a mix. The write-up will list the same build tuned to other needs (field tech helper, onboarding, IT basics, equipment manuals, sales). Real owners at chamber events are the final check: "How often do your people call the office, and about what?"
4. One helper for all staff. Everyone gets the same handbook. Refusals depend on what's in the handbook, not on who's asking.
5. Builder. Standard (classic) agent this week: it has topics (fixed scripts), which the next session's lesson needs, and it's mature. Microsoft points new agents to the new GitHub Copilot experience, so the timed build at the end of the week uses that one.
6. Solution. Its own solution, Bluffside Handbook Helper (publisher jdmaurer Labs, prefix jdm), set as preferred, so it exports and hands over on its own. One solution per build.
7. Web Search off, so it can't pass off a website's rule as Bluffside's.
8. Parked: a real university handbook, only as a private stress test (never committed or recorded) or, after Week 12, a faculty handbook helper built with a school's permission.

## 2026-11-06
9. Baseline not recorded on video; screenshots instead. The helper changes in the next two sessions, so the demo take is the finished run (the 30-case test plus the request action).
10. N3 (groceries) was a test defect, not a helper failure (see test-cases.md).
11. Safety fix (emergency script) deferred to the next session, where it is the fixed-script lesson. Nobody can reach the helper meanwhile.

## 2026-11-06 (evening)
12. Emergency script wording is Josh's, in four rounds: no "if anyone is in danger" (asks a scared person to judge danger); no "get everyone out" (reads as go searching for people); no "then call the office" and add "get well away from the building" (someone calling from the front step); "badly hurt" with concrete signs, since a cut finger is not a 911 call. For a real client the words come from their safety procedure or gas utility (some ask you to call the utility as well as 911).
13. Every script ends with End all topics, so the AI can't add advice after the fixed words.
14. The instructions' emergency line now matches the topic word for word. The AI picks topics differently from run to run (N6, N8, N10 skipped Escalate tonight; Thursday it was used), so the fallback has to say the same thing.
15. Repair questions go to the service manager, not the office manager: the tech needs someone who knows furnaces. It got its own topic because the Escalate card kept winning over the instructions line.
16. HB-05 (customer homes, uniform, phones) added with a planted conflict: HB-04 allows hands-free phones while driving, HB-05 forbids it. Both Current, same date.
17. Handbook files name roles, not people (Josh: people turn over, and naming Dana in the file makes the hand-off test too easy). HB-05 uses roles only; Dana's name lives in the instructions, one line to change when the office manager changes. HB-01 to HB-04 still name Dana; left for now.
18. When two current policies disagree, the helper shows both and hands off; deciding which wins is the owner's job. No yes or no first (Josh, strict: a tech reads "No" and stops).
19. Skipped a manual 38-question rerun tonight: nobody can reach the helper (unpublished trial), and the Evaluate grader covers it next session.

## 2026-11-07
20. Grading: Meaning match (pass score 70) plus a Custom grader holding the approved rules; Claude reads every reply in full and the approved rules decide. Answer quality dropped (can't pass a correct refusal).
21. N10 counted as a pass on safety, logged as a consistency finding. Hand-offs keep naming "Dana Lindgren, Office Manager" for now: every other line and the answer key already do. Name vs role is the client's call; in real life, ask (Josh: in schools, secretaries and administrators turn over often).
22. Full rerun after the request action, not before: adding the action changes the helper, so one run checks the fixes and the regression together. Friday keeps its clean final check.
23. Time-off request users: everyone on staff, designed for a field tech on a phone. Techs ask most of the questions in the test set; Dana approves and is not a user.
24. Requests are stored in a Dataverse table (Time Off Request, jdm_TimeOffRequest) in the Bluffside solution. The lab has no SharePoint; Rivertown proved Dataverse keys.
25. Time Off Request columns: Request ID (main column), Requester email (email, required), Requester name (required), First day off and Last day off (Date only, required), Leave type (Vacation, Unpaid; required), Note (multiple lines, plain text), Request status (Pending, Approved, Declined; default Pending). Named "Request status" because the table already has Microsoft's Status and Status Reason.
26. Key "One request per person per first day" (Requester email + First day off). Email, not name: two people can share a name. The flow will also check first, so the tech gets a friendly message; the key is the backstop.
27. Copilot drafting in agent flows: it renamed cards and added a condition and a Terminate, but could not add connector actions (Dataverse, Respond to the agent) even after the Dataverse connection existed, and it reported adding trigger inputs it never added. Rule for builds: Copilot for logic, connector cards by hand, and check every card; the card is the proof, not Copilot's message.
28. Flow kept to one update card: RecordDecision sets Request status with if(outcome = Approve, Approved, Declined) instead of a Condition with two branches. Same result, fewer cards.
29. Hard confirm (Copilot Studio's "Ask the end user before running") dropped for Bluffside. Its text version looped on "yes"; the button-card version was not built. Reason: the request is never final at the tech's yes; Dana's approval is the hard stop and a mistaken slip is simply declined, so one AI read-back is enough (Josh: four "are you sure?" questions would annoy anyone). Client rule: use a hard confirm only when the action can't be undone (sending to a customer, paying, deleting).
30. Requester identity comes from the sign-in, never from the chat: email = User.PrincipalName (the sign-in name), name = User.DisplayName. User.Email came through empty in the test chat; the sign-in name is always there when someone is signed in, which is also safer for a client.
31. Approval goes to the lab account standing in for Dana, entered in the people picker (Code view confirmed the address saved). For a client: the office manager's mailbox, or a shared approvals group.

## 2026-11-08
32. Empty-email guard placed first, before CheckExisting (Josh's call): the cheapest check runs before anything touches the table. It uses a Condition (EmailMissing), a Respond card and a Terminate set to Failed, because a missing email means the sign-in broke, a real fault that should show red in run history.
33. Every "Respond to the agent" card in one flow must send the same outputs, descriptions included. The first publish failed ("The schema definitions for actions with same status code must match") until RespondMissingEmail's descriptions matched the existing cards word for word.
34. Note removed from the helper's tool (Josh's decision, 12:24). Two fixes failed: Copilot Studio's own input asking reads "no" or "none" as clearing the field, re-asks up to twice, then hands off. Made required (11-07) it loops the same way. Note stays optional in the flow, so it can return. Field fix if a client wants notes: a topic that asks with two buttons ("Add a note" / "No note") and then calls the flow. This is also a data-minimization choice: the slip collects only what Dana needs to decide.
35. T7 not forced: making the email input optional just to reach the guard would cost a republish to test a lock already covered by the sign-in and the required input. Logged as defense in depth.
36. T6 wording gap (does not ask for the right date) logged, not fixed today; safety part passed.
37. Full rerun as one run, not two halves: rate-limited rows are asked by hand instead (H5 did this on 11-07). Fewer clicks, same evidence.
38. Grader rubric v2 keeps the live rubric's layout and changes two lines (911 script words; "pay" means wages, mileage is a handbook answer). 1,352 of 1,500 characters. Saved as evaluation/grader-rubric-v2.md.
39. Repair topic narrowed after A9 regressed ("wrench" pulled the Repair topic): it now says not to use it for buying, expensing, or reimbursement of tools or parts. R1 and R2 rechecked by hand.
40. Guides reviewed with Josh 2026-11-08 (evening), each written for its real reader and checked against one test: would an expert reading the portfolio raise an eyebrow? Staff guide: a tech on a phone. Maker guide: Dana (trained to look after it) and the builder. Admin questions: written to the client's admin, not to us.
41. The staff guide describes the helper as a client would get it (in Teams). The trial status lives in the README and limitations only (Josh: describing what it does once set up isn't a false claim; promising something it doesn't do is).
42. Changes are made in a development copy and moved to production as a managed solution. The trained person releases changes themselves (needs import permission, admin question 14), so the client doesn't depend on the builder (Josh: an owner would be bothered by "ask the builder").
43. In client maintenance, old handbook versions are removed, not marked REPLACED. The lab's REPLACED file stays: it is a safety test (someone forgot to take the old policy down), not a maintenance practice.
44. Release rule: every answer matches its expected answer; never release on an emergency, refusal, or request-test failure. The 36-question set doesn't cover the request flow, so flow changes also need the hand-run request tests.
45. In a client tenant the request flow's connections run under a service account the client owns. Copilot Studio's publish check shows the tool runs on the author's credentials; action-contract.md corrected (it said end user).
46. Admin questions cut from 17 to 15 (merged two overlapping pairs). Licensing question written against current pricing: Copilot Studio is billed by usage in Copilot Credits; staff with a Microsoft 365 Copilot license are included.
47. DEMO-04 recording moved to the next session after setup steps were skipped (Josh). Order stays: record DEMO-04, then export and release, before Week 8, so demos never pile up.

## 2026-11-09
48. Released as both: managed (the release for the live environment) and unmanaged (the editable source copy for development and the handover folder), same version number, 1.0.0.1. Josh first read "managed" as "the client can never change it"; the client changes it in the development copy and releases a new version, so nobody is locked out when the office manager changes (Josh: "Dana might leave tomorrow").
49. The flow's two connection references (Standard approvals, Microsoft Dataverse) were outside the solution; the export listed them as missing and they were added. They hold no sign-in, so the client connects its own service account at import.
50. The table travels without rows, on purpose (Josh): the client starts with its own data, not lab test slips, and the test slips carried the builder's email.
51. Release gate in the maker guide: don't release with a critical or high solution-checker issue (Josh agreed).
52. Undo is a forward release: the live environment refuses a managed solution with a lower version number than the one installed (Microsoft Learn), so the maker guide's "import the last released copy" was wrong. A bad change is fixed in the development copy and released with the next version; the Tools switch and the Teams block cover the meantime.
53. The maker guide names the import permission itself (System Customizer security role) instead of pointing to admin question 14, which Dana never sees (Josh).
