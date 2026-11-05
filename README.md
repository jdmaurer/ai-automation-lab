# AI Automation Lab

Working repository for a 12-week AI implementation intensive. Focus: APIs,
integration, workflow automation, and AI agent design for small and
medium-sized businesses.

Building toward SME-facing AI implementation advisory, training, and low-code
prototyping.

---

## Portfolio cases

| Case | What it is | Status |
|---|---|---|
| [`cases/rivertown-lead-intake/`](cases/rivertown-lead-intake/) | Webhook-driven lead intake, deduplication, and routing for a synthetic 30-person B2B consulting firm | Built and tested in n8n and Power Automate, with a [client comparison memo](cases/rivertown-lead-intake/platform-comparison-memo.md) |
| [`cases/eval-summary-drafter/`](cases/eval-summary-drafter/) | Drafts one-page client summaries from AI test results; a person reviews every draft | Built and tested (v9) |

Each case folder holds the workflow export, seed data, test cases with
results, a decision log with reasoning, a limitations statement, and a
runbook.

All examples use synthetic data from a fictitious company.

---

## What I can deliver now

<!-- Confirmed by Josh 2026-11-04. Updated at each gate and after each finished build; the marketing track's claims follow this list. -->

| Offer | Status | Backed by |
|---|---|---|
| Team sessions that teach your people to teach themselves AI, starting with their own real work; plus AI literacy workshops and executive briefings | Available | Teaching and strategy background |
| Workflow-opportunity review: find the repeat work, map the process, rank what to try first | Available | Strategy and management background |
| Paid diagnostic (the Team AI Map plus cost, outside interviews, process fixes, and a recommendation) | Once the form exists and has had one free test run | Week 11 discovery work on Rivertown |
| Approval workflows in Power Automate: a person signs off before anything reaches a client, and someone is alerted if a step breaks | Available | Rivertown Power Automate build (approval, overdue handling, failure alert; tests T8 to T13) |
| Lead intake with AI sorting: most leads are assigned to the right department automatically, with AI reading unclear messages and a person reviewing any it isn't sure about. New leads are saved within seconds, and repeats are caught | Available | Rivertown lead intake, built in both n8n and Power Automate (37 test leads, none sent to the wrong department) |
| Choosing an automation tool: a plain-language comparison of Power Automate and n8n for your firm, covering cost, upkeep, and where your data lives | Available | [Rivertown comparison memo](cases/rivertown-lead-intake/platform-comparison-memo.md), built from both tested samples |

Not offered: production AI systems, enterprise governance, autonomous agents, or Microsoft tenant administration.

---

## Reference

| File | What it is |
|---|---|
| [`n8n-patterns.md`](n8n-patterns.md) | n8n gotchas and course documentation defects — the things worth not relearning |
| [`CURRENT_STATE.md`](CURRENT_STATE.md) | Where work resumes |
| [`demos/`](demos/) | One record per demo video: the problem, what it proves, the shot list, and claim limits |
| [`AI_HANDOFF_PROTOCOL.md`](AI_HANDOFF_PROTOCOL.md) | How sessions open and close across ChatGPT and Claude |

---

## Progress

### Week 1 — environment, HTTP, JSON, Git
- Development environment (Git, Node, Python, VS Code)
- Postman API Beginner path — mock API with full CRUD and passing tests
- n8n: live API calls, query parameters, JSON extraction
- n8n: list operations — filter, sort, aggregate
- GitHub Skills: branch, commit, pull request, merge

Log: [`week1-log.md`](week1-log.md)

### Week 2 — webhooks, n8n Academy N8N102
- First webhook receiver — POST, ticket ID generation, custom JSON response
- N8N102 Section 1: API integration pipeline, merging, branching, batching
- N8N102 Section 2: webhook, validation, Data Tables, sub-workflows,
  duplicate checking
- Built the ChatGPT/Claude handoff system with GitHub as source of truth

Log: [`week2-log.md`](week2-log.md)

### Week 3 — integrations, auth, control flow, first portfolio build
- N8N102 complete — course certificate earned
- Hands-on: cURL import, Response Format, pagination, node-level and
  workflow-level error handling
- **Lead Intake v1** — first portfolio artifact

Log: [`week3-log.md`](week3-log.md)

---

## Scope

This is learning and prototyping work. It does not claim production AI
engineering, security specialization, Microsoft tenant architecture, or
autonomous agent development.
