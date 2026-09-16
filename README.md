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
| [`cases/rivertown-lead-intake/`](cases/rivertown-lead-intake/) | Webhook-driven lead intake, deduplication, and routing for a synthetic 30-person B2B consulting firm | Built and tested; live testing pending |

Each case folder holds the workflow export, seed data, test cases with
results, a decision log with reasoning, a limitations statement, and a
runbook.

All cases use synthetic data only.

---

## Reference

| File | What it is |
|---|---|
| [`n8n-patterns.md`](n8n-patterns.md) | n8n gotchas and course documentation defects — the things worth not relearning |
| [`CURRENT_STATE.md`](CURRENT_STATE.md) | Where work resumes |
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
