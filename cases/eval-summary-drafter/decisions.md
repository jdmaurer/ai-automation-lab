# Decisions - Eval Summary Drafter

Append-only. Newest at the bottom.

## 2026-09-25 - Scope, platform, and rules

- Automate the client evaluation summary instead of hand-writing each one. The consultant's value is judging the draft (what to claim, what to ask), not typing it.
- Platform: n8n. It is the intensive's platform, it keeps facts in a Code node, and it is credible client-facing portfolio evidence. A Custom GPT or Claude Project was rejected because the AI would do the math. A Claude Skill was rejected as Claude-only. The rules are plain documents, so they can be rebuilt in Power Automate or Copilot Studio later.
- Review happens in a chat (this Claude Project), not in the workflow.
- Rules came from three deep research reports run with one identical prompt and output format. The reports were not given the draft, so their research stayed independent. Evidence was weighed, not voted: ChatGPT's report was strongest overall, but it was not treated as right on every question.
- Sources are judged by fit to the claim, not by venue. Practitioner posts are good evidence of practice, weak evidence of effectiveness.
- Governing principles: the memo's job is an informed decision, not a yes; make it easy, not impressive.

## 2026-09-25 - Six conflicts resolved

1. Numbers: exact counts first, percentage second. One code-calculated "roughly 1 in X" per memo, always beside its exact count.
2. Section order: decision summary, what it does and how we tested it, safety, usefulness, trade-off, limits, then what we need from you. Limits come before the choice; the memo ends on the action.
3. Missed targets: a plain verdict ("below your target"), factual context beside it, and an invitation to revisit the target. No softeners, hype, or unmeasured savings.
4. Uncertainty: no forecasts or statistical ranges from hand-built test sets. State test size and the one-item swing; hedge words banned; the pilot supplies planning numbers. Set this expectation at kickoff.
5. AI checking: code checks facts; an AI may edit but never approve. The editor is a fresh call with a defined job and only the approved facts. It fixes writing, flags judgment, and lists changes.
6. Sentence length: flag sentences over 20 words, never fail.

## 2026-09-25 - Simplified pipeline

- Over-engineering was reversed. Goal: the best draft with the fewest inputs. The only inputs are the test results file plus a one-time client setup. The AI proposes the recommendation; nothing stops the workflow; problems become flags; the consultant's review is the safety net.
- The client setup includes: client name, target, outcome categories, usefulness measure, what the system does and does not do, known limits, and banned names.

## 2026-09-25 - Rules added during the Rivertown review

- Options state business consequences, not system mechanisms (guide 5.3).
- Pilot activities say who does what; client actions are requests in the final section (5.3a).
- Groups of test items are described in everyday words every time, never with a defined label (2.3a).
- If a harmful action occurred, describe each one, not just the count (1.2a).
- Length is a target (350 to 500 words) with a ceiling of about 650, one printed page. Cut repetition and wording, never content (7.4).

## 2026-09-26 - Input format, first automated draft, options playbook

- Two inputs. The test results file changes every run: test_date plus items with id, item, correct_answer, system_did, held_back. The client setup is filled in once per client. Both are JSON. Rivertown's copies: cases/rivertown-lead-intake/summary-inputs/.
- Code grades by matching correct_answer to system_did. Correct answer is the person label and the system routed it: harmful. Correct answer is a team and the system chose another team: harmful. Correct answer is a team and it went to a person: referral. Usefulness is measured on items whose correct answer is not the person label.
- Optional per-item `outcome` for clients whose grading is not a simple match (for example, partly-correct invoices). Its labels are defined in setup `outcome_labels`. An unknown label is flagged, never guessed.
- Universal banned words live in guide 8 and the code check. Setup `banned_words` holds only the project's own names (models, tools, run labels).
- The workflow reads the rule files from GitHub main at run time, so the guide stays the single source of truth. The full rules (about 5,800 tokens) fit the Groq free tier; the draft call needs Maximum Number of Tokens 8000 (the first run returned an empty draft: finish_reason length at the 3,072 default).
- First automated draft: every number correct. Every error came from a fact missing from the inputs; worst, it said the client's staff wrote the tests. Setup gains test_authors, harmful_action, handled_group and person_group. New guide rule 1.6: write [MISSING: ...] instead of guessing.
- Options come from a playbook (guide 5.5). Code sets the scenario (below_target, met_target, harmful, no_target); the AI writes the options as business consequences; an optional setup `options` list overrides it.
