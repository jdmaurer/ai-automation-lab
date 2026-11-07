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
