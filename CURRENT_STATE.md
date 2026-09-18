# CURRENT_STATE

Project: AI Skills Intensive — 12 Week
Last updated: 2026-09-17

## Current objective
N8N103 Section 1 — AI Introduction is complete. Both hands-on projects were
completed, the Practical Assessment is 3/3, and the Section 1 knowledge check
was completed.

Next curriculum item: N8N103 Section 2 — Testing & Debugging.

## Current build

### N8N103 Project 1 — Section 1 - Feedback Pipeline
Completed workflow:

```text
TriggerManual → GetFeedback → SetFeedbackItem → ClassifyFeedback
  → SetClassificationResult → GenerateReply → SendGeneratedReply
```

- Classification model: `openai/gpt-oss-20b`
- Reply model: `openai/gpt-oss-120b`
- Structured Output Parser returns sentiment, topic, urgency, and key_issue.
- Final Academy classify-and-enhance submission passed.
- Important lesson: structured output controls shape, not truthfulness. During
  multi-item testing, generated replies invented unsupported timelines, actions,
  and procedures. Prompts need explicit grounding and authorization limits.

### N8N103 Project 2 — Section 1 - Feedback Agent
Completed agent with three HTTP Request Tools:

- `ToolGetOrderStatus` → order-status endpoint using AI-supplied `order_id`
- `ToolGetCustomerInfo` → customer-info endpoint using AI-supplied `customer_id`
- `ToolGetProductInfo` → product-info endpoint using AI-supplied `product_name`

The course-specified `llama-3.3-70b-versatile` model was not available in the
current Groq selector. Used `openai/gpt-oss-120b` instead; all three graded
tool calls passed.

Graded tests completed:
- Order status: `ORD-011`
- Account/subscription: `CUST-010`
- Product: Enterprise License features and pricing

Academy Practical Assessment: 3/3.

## Exact stopping point
- Section 1 AI Introduction completion banner reached.
- Section 1 practical grading: 3/3.
- Section 1 knowledge check completed.
- Optional Simple Memory stretch goal was not done.
- The Project 2 documentation sticky note has not yet been added.

## Process rules reinforced this session
- Group routine same-screen changes when there is no decision point.
- Before a hands-on project, map relevant knowledge-check questions to the
  build and ask them at the moment the concept is being used. Do not save them
  for a post-project quiz.
- During quiz/knowledge-check work, do not reveal the answer or give hints until
  Josh asks. When he answers, state clearly whether it is correct before adding
  nuance.
- For n8n paste-ready fields, keep field labels and field values in separate
  copy blocks. Never combine a label and a value intended for different UI
  fields in one block.

## Exact next step
1. Add the Project 2 sticky note documentation. Use the actual model
   `openai/gpt-oss-120b`, not the outdated course model.
2. Correct the sticky-note Order Status description to use `order_id`, not
   `customer_id`.
3. Skip the optional Simple Memory stretch unless Josh explicitly chooses it.
4. Begin N8N103 Section 2 — Testing & Debugging.
5. Before starting the Section 2 hands-on work, map its knowledge-check
   questions to the practical so they can be asked inline while Josh is using
   those concepts.

## Open items
- N8N103 course defect: Project 2 specifies `llama-3.3-70b-versatile`, which
  was unavailable in the current model selector.
- N8N103 documentation defect: Project 2 sticky-note instructions refer to
  `Section 2 - Feedback Agent`, although the exercise creates
  `Section 1 - Feedback Agent`.
- N8N103 documentation defect: sticky-note template says Order Status looks up
  by `customer_id`; the actual tool requires `order_id`.
- Rivertown Lead Intake v1 remains unchanged and unpublished after successful
  live verification.
- Rotate the Rivertown Header Auth secret before any real client/production use.
- n8n Cloud trial status still needs a self-host vs paid decision before expiry.
- Claude Code install remains pending and matters from around Week 4.

## Working rules for AI assistants
- State purpose and expected result before instructions.
- Teach in pieces alongside the clicking; do not front-load a page of reading.
- Group routine same-screen actions with no decision point; otherwise proceed
  one meaningful step at a time.
- For known/recombined tools, use case-study mode: requirement → ask Josh what
  he would build → confirm/correct.
- During course hands-on work, weave relevant knowledge-check questions into
  the moment the concept is being used. Do not save them all for the end.
- During quiz questions, withhold answers/hints until Josh asks. After he
  answers, say plainly whether it is correct, then add nuance if useful.
- For paste-ready n8n fields, field labels and field values must be in separate
  copy blocks.
- For PowerShell, one command per copy block and use `git --no-pager` for diffs.
- Read screenshots literally and verify after 2–3 reasoned attempts rather than
  guessing.
- End each distinct concept with a one-line KEY MESSAGE.

## Source hierarchy
1. `CURRENT_STATE.md` for where to resume
2. Relevant N8N103 hands-on exercise for exact build instructions
3. Relevant N8N103 course reading/questions for concepts
4. `n8n-patterns.md` for known gotchas and course defects
5. 12-week Master Calendar for strategy and sequencing
6. `cases/rivertown-lead-intake/` when portfolio-case context is needed
7. Current and earlier `weekN-log.md` for history

## End-of-session note
This closeout was written directly to GitHub so Josh did not have to manually
edit and commit the handoff files. The local Windows clone will need a
fast-forward pull before local repo work continues.
