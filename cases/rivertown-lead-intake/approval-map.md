# Rivertown Lead Intake - Approval map

Every action the lead-intake workflow could take, and who is responsible for it. Written 2026-10-18, before the Power Automate approvals build (CURRENT_STATE.md, decisions 2026-10-15, item 2). Applies to both builds (n8n and Power Automate). Rivertown is fictional; all data is synthetic.

An "action" here is anything the workflow does that changes something outside itself: it writes a row, sends a message, or answers the form. Steps that only read or decide (Compose, Condition, List rows) are not rows.

Three columns:
- **Runs alone**: the workflow does it with no person involved.
- **A person approves first**: the workflow prepares it; nothing happens until a named person approves.
- **A person does it**: the workflow never does it; a person does it by hand.

## The map

| # | Action | Decision | Built in | Why |
|---|---|---|---|---|
| 1 | Answer the form (200 / 400) | Runs alone | n8n, Power Automate | The sender needs an instant answer; no judgment involved |
| 2 | Save a new lead | Runs alone | n8n, Power Automate | Recording is safe and reversible |
| 3 | Count a resend on the existing lead | Runs alone | n8n, Power Automate | Adds 1 to a counter; never creates a second row |
| 4 | Route to a team by the dropdown rule | Runs alone | n8n | The prospect chose the service themselves |
| 5 | Route by the AI's suggestion | Runs alone **only** when both models agree, are sure, and list no alternatives; otherwise row 6 | n8n | Tested: 0 wrong routes in 37 cases (v2.7) |
| 6 | Put a lead in the review queue | Runs alone; a person picks the team from there | n8n | The queue is where a person takes over |
| 7 | Email the team lead about a new lead | Runs alone | Not built | Internal notice; nothing leaves the firm |
| 8a | "We got it" email to the prospect, with a booking link | Runs alone, instantly (weekends included) | Not built | Waiting makes the lead go cold, which is the problem being solved. Generic template, nothing specific promised |
| 8b | The real first reply to the prospect (drafted from their message) | **A person approves first** (team lead). Time limit: if nobody answers, nothing sends | Power Automate (2026-10-18; tests T8 to T10) | The only action where the firm's name and specifics reach someone outside the firm; a wrong reply cannot be taken back |
| 9 | Add a new source to the Source table | A person does it (admin, by hand; runbook) | Not built | An unknown source is more likely a typo or a made-up name than a new channel. The Source table is a check; an Approve button would turn it into a rubber stamp |
| 10 | Delete or merge leads | A person does it | Not built | Destroys or combines records |
| 11 | Assign the lead to a named consultant | A person does it (team lead) | Not built | Depends on workload and fit, which the workflow cannot see |
| 12 | Mark "contact made" | A person does it (consultant) | Not built (status column exists, not written) | Only the consultant knows; this is how the lead "comes back" into the record |
| 13 | Flag a stale lead as urgent to a backup person | Runs alone | Not built | Covers 8b's time limit and row 11/12 delays (the "follow-ups that slip" problem) |

## Decisions behind the map (2026-10-18)

- **8a and 8b are different emails.** 8a is an instant, generic acknowledgement; 8b answers what the prospect actually asked. Only 8b needs a person.
- **Four buttons, not Approve/Reject (Josh):** "reject" hides different reasons (the draft doesn't fit, wrong team, not a real prospect), and each needs a different next step. Status words say what happens next, because people read the table later without context.
- **When 8b's time limit passes:** nothing unapproved is sent. The lead is marked overdue; sending it to a backup person as urgent is row 13 (not built yet). Sending the draft anyway was rejected: the approval would stop meaning anything. Time limit: 5 minutes for testing; about one business day for a client.
- **Booking link in 8a:** the team's calendar only when the prospect picked the service in the dropdown themselves (row 4); a general "intro call" calendar when the AI or the review queue routed it. Reason: a team-specific link would let an AI routing mistake reach the client instantly. **Client-dependent:** a one- or two-person firm needs only one calendar; a firm where sales books first would use the general calendar for everyone. Ask in discovery.
- **The handoff is client-dependent.** For Rivertown: the table is the record, the team lead is emailed, the team lead assigns the consultant, and the consultant marks contact made. For a real client, ask "how does work get picked up today?" (Week 11 discovery guide).

## Where each "a person" decision lives

| Row | Power Automate | n8n |
|---|---|---|
| 8b | Approvals connector, "Start and wait for an approval", Custom Responses: Send draft / I'll write it myself / Wrong team / Not a fit. Each writes a status (reply approved / writing personal reply / needs routing / closed); no answer in time = overdue. Built 2026-10-18 | Not built; the equivalent would be a Wait node, or a Gmail or Slack node's "Send and wait for response" |
| 9 | Not in any flow; runbook step for the admin | Same |

For a client that already pays for Copilot, Gemini, or Claude connectors, each row would also map to a setting in that tool. Not applicable to Rivertown's flows.
