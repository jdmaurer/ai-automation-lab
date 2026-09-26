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
- Second draft (2026-09-26): the input fixes worked (our team wrote the tests; the playbook options appeared). Remaining problems were rule-following: pasted setup text, a garbled verdict sentence, groups not described, no target question. New guide rule 7.5 (write setup facts naturally); the rest goes to the editor pass.
- Editor pass (v3): the editor only fixed what its checklist names; rules with no checklist item (2.3a, 3.4, 7.5) were skipped by both AIs. Those moved into code checks. The editor's prompt carries a trimmed copy of the rules (no citations, word lists or non-editor checks) to stay under Groq's 8,000 tokens per minute; a 65-second pause separates the AI calls.
- Code checks (v4, v5): C1 to C8 plus groups named (2.3a, by key words, not exact wording), target question (3.4), pasted setup text (7.5), gap units ("short by 1 percent" or "point" fails; the gap is in items), and numbers in words ("approximately four-fifths" fails). Failures get one AI fix with the exact problems named, then a recheck; anything left is flagged. Checked against the approved Rivertown memo: it passes except its own date.
- Code node sources live in code/ so the repo shows exactly what runs.
- Overfitting check (v8), using a made-up invoice client (tests/): outcome labels, a harmful action, no "sent to a person" group, target met. Facts, scenario (harmful), the harmful item's description, and the prompt all worked. Found and fixed three Rivertown phrases hard-coded in the code (an example sentence, the "test messages" pattern, a fix hint about "the wrong team"). The group check (2.3a) was too loose when group words are everyday words for the client; it now needs one sentence with the group's count and at least half its key words, which matches how the approved memo says it ("23 were straightforward requests for one service").
- v9 (2026-09-26): absolute claims (all, every, never) are listed as a flag for review, and the editor is told to test them against the counts; code can't judge them. Live run on the invoice client passed with no failures and correct client-specific content, so the drafter generalizes. Outputs and review notes are in tests/.
