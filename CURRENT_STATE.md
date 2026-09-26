# CURRENT STATE - updated 2026-09-26 - RESUME HERE

Per AI_HANDOFF_PROTOCOL.md this file is overwritten each session. Earlier states are in git history and the weekly logs.

## Objective
Eval Summary Drafter: an n8n workflow that drafts the one-page client evaluation memo from test results. Case: cases/eval-summary-drafter/ (README, decisions.md, code/, tests/).

## Where things stand
- Built and running on local n8n: eval-summary-drafter-v9.json (import it; v0-v8 are earlier steps; tests/eval-summary-drafter-v9-invoice-test.json is the same workflow with the invoice client pinned). Pipeline: ReceiveInputs (Rivertown input pinned) > ComputeFacts > BuildPrompt > DraftMemo > BuildEditPrompt > PauseBeforeEdit (65 s) > EditMemo > SplitEdit > CheckMemo > if anything fails: BuildFixPrompt > PauseBeforeFix > FixMemo > RecheckMemo. Code node sources are in code/.
- AI calls: Groq openai/gpt-oss-120b, temperature 0.2, Maximum Number of Tokens 8000 (the 3,072 default returns an empty draft).
- Inputs: cases/rivertown-lead-intake/summary-inputs/setup.json and results.json. Formats and grading rules are in the drafter's decisions.md (2026-09-26).
- The workflow reads the guide, outline and checklist from GitHub main at run time. Push a rule change before testing it. Guide is version 1.1 (new rules 1.6, 5.5 options playbook, 7.5).
- Rivertown results: every run gets the numbers right. Final v8 run passed all checks except one flag ("expected to" used in a non-hedge sense). One claim error no check catches: section 3 said all straightforward requests went to a team (5 went to a person). Drafts now need 2 to 4 small edits at review.
- Overfitting check passed: live v9 run on a made-up invoice client (tests/). Correct client, item word, numbers, harmful item described ($4,200 entered as $420), playbook options (fix and retest first). No failures; the same 2 to 4 review edits as Rivertown. Rivertown phrases removed from the code along the way; group check tightened.
- v9 adds a flag listing absolute claims (all, every, never) for review, and tells the editor to test them against the counts. Both final outputs are saved in tests/ with review notes.
- Groq free tier is 8,000 tokens per minute. "Too many requests" means wait (the 65 s pauses); "request too large" means send less (the editor gets a trimmed copy of the rules). Wait a minute between full runs; one run takes about 4 minutes.

## Next
1. The drafter is done for now. Optional polish when it is next used: a check that each option states its consequence (E6a; the invoice memo listed options without them), and a decision on the "expected to" false positive.
2. Week 5 security work: NIST GenAI Profile, OWASP LLM lists, and a threat model for both builds (Rivertown intake and the drafter).

## Open items - Rivertown, do before any pilot
- Build and test email delivery to each team. Routing currently only records the team in the Data Table.
- Add a blank-message check before the AI, with a quick retest.
- Lengthen the retry wait (1000 ms vs Groq's ~2.5 s), with a quick burst test.
- Test a scrambled or unparseable AI answer. Only the rejected-key failure has been tested.
- Rotate the webhook API key before any public exposure. This is promised in the client summary.
- Single labeler. The summary offers a client-written test set before the pilot.

## Working rules
- Name the learning goal for each block. Case-study mode for new design questions; fast, complete directions once a concept lands.
- One question at a time, context first. Explain like a fifth grader when asked. Wait until Josh has finished before replying.
- Choices: why each option is good, what's bad, a recommendation, and a table when the difference isn't obvious.
- One instruction at a time, purpose and expected result first. Long code goes in files (import or copy from VS Code), never pasted from chat.
- Long n8n outputs: send as a .txt attachment, not a paste.
- Keep the design lean; flags, not stops; Josh's review is the safety net. Time-box, and say when something isn't teaching anything.
