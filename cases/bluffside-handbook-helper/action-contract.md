# Bluffside Handbook Helper — Time-off request action (contract)

Approved by Josh 2026-11-07 as the starting layout; fields can change during the build. Master calendar Week 7 Wednesday: an allow-listed create_review_request action with required arguments, no direct production write, duplicate protection, and a human confirmation step.

## Who uses it
Everyone on staff. Designed for the hardest user: a field tech on a phone (short questions, one at a time). Approver: Dana Lindgren, Office Manager (in the lab, Josh's lab account in Power Automate Approvals).

## The slip
| Field | Source | Why |
| --- | --- | --- |
| Who | The signed-in user, automatic, never typed | Nobody can request time off for someone else |
| First day off | Helper asks | |
| Last day off | Helper asks | One question at a time |
| Type | Vacation or Unpaid | Sick time is "tell the office" (HB-02), not a request |
| Note | Optional | |
| Status | Starts Pending; only the approver's click changes it | No direct write |
| Request ID | Made by the flow, shown to the worker | Proof the slip went in |

## Rules
- Duplicate: same person + same first day off = already turned in; the flow says so and creates nothing.
- Human confirmation: the helper reads the slip back and the worker must say yes before anything is sent.
- The helper never approves or denies. It may mention the busy-season rule (HB-01) but does not decide.

## Trial limits found 2026-11-07
- Trial and developer environments: 10 AI requests per minute, 200 per hour. A 36-question Evaluate run hit it (H5, GenAIToolPlannerRateLimitReached). Full reruns go in two halves.
- Agent flows (Tools > Add a tool > Agent flow), Dataverse, and Approvals are available in Josh Maurer's Environment.

## As built (2026-11-07)
- Table: Time Off Request (jdm_TimeOffRequest), in the Bluffside solution. Columns: Request ID (main), Requester email (email), Requester name, First day off, Last day off (Date only), Leave type (Vacation 832990000, Unpaid 832990001), Note (plain multiple lines), Request status (Pending 832990000 default, Approved 832990001, Declined 832990002). Key: One request per person per first day (Requester email + First day off), Active.
- Agent flow "Submit time-off request" (Copilot Studio, published): Skills trigger with six text inputs (RequesterEmail text, RequesterName text_1, FirstDayOff text_2, LastDayOff text_3, LeaveType text_4, Note text_5) -> CheckExisting (List rows, filter email + first day, row count 1) -> IsDuplicate (length > 0; a second empty row could not be deleted, harmless) -> True: Respond to the agent (Status duplicate, RequestID of the found row), TerminateDuplicate -> False: SaveRequest (Add a new row, Request ID concat('TOR-', yyMMdd-HHmmss UTC), Leave type mapped by if(), status Pending), Respond to the agent 1 (Status created, RequestID), ApproveTimeOff (Start and wait, Approve/Reject first to respond, assigned to the lab account), RecordDecision (Update a row, Request status by outcome).
- Tool on the helper: description carries the read-back rule; RequesterEmail = User.PrincipalName, RequesterName = User.DisplayName (custom values, never AI-filled); "Ask the end user before running" = No (decision 29); credentials: end user.
- 2026-11-08: EmailMissing guard added first (Condition -> RespondMissingEmail missing_email/none -> TerminateMissingEmail Failed). Note optional in the trigger and removed from the tool (decision 34). Approve and decline tested (T3, T4). Results: test-cases.md 2026-11-08.
