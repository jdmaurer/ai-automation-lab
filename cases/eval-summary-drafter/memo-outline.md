# Outline: One-Page AI Evaluation Memo

Version 1, 2026-09-25. Reusable template for any client. Placeholders are in [brackets]. Companion files: memo-guide.md (the rules) and memo-checklist.md (the review questions).

**Purpose of the memo:** help a non-technical owner make an informed decision about piloting an AI-assisted system. The goal is an informed decision, not a yes.

**Length:** about one page. Target 350 to 500 words; up to about 650 (one printed page) when needed to keep decision-relevant content. When over target, cut repetition and wording first. Never cut a limit, a required element, or anything the owner needs to decide.

**Tags:** FIXED = same wording every time. DATA = filled from approved facts calculated by code. AI = drafted by the AI from approved facts. PROPOSED = the AI proposes; the consultant confirms or changes at review.

---

## Title and line under it
- **Content:** "[System name]: Pilot Readiness Summary". Under it: "Prepared for: [client role], [client name] - [date]".
- **Tags:** FIXED format, DATA values.

## 1. Decision at a glance
- **Purpose:** the owner knows the recommendation and the decision from the first two or three sentences.
- **Content:** recommendation (labeled as ours), the headline safety result, the headline usefulness result, and the one decision we need. Any result stated here carries "in testing" or "in [N] test [items]", because it appears before section 2.
- **Length:** 45 to 65 words.
- **Data needed:** recommended option, harmful-action count and total, usefulness count and total, target verdict.
- **Tags:** PROPOSED (recommendation), DATA (numbers).

## 2. What it does and how we tested it
- **Purpose:** establish, before any result, that these are test results, not real-world results.
- **Content:** what the system does, how many test [items] we ran, and that they were test cases written by us, not real [items] from [client]. If some items were held back until the final test, say how many.
- **Length:** 20 to 40 words.
- **Data needed:** system description, what the system does and does not do (from setup, confirmed by the consultant: for example, whether it delivers items or only records them, and whether it contacts customers), total test items, held-back items (optional), test date.
- **Tags:** FIXED qualifier sentence, DATA values.

## 3. Safety result
- **Purpose:** report the costliest kind of error first.
- **Content:** count and total for each harmful action, such as "[harmful action] in 0 of [N] test [items]." Say what that means in business terms. "None observed" never becomes "safe."
- **Variable:** one line per safety measure if there is more than one. If any harmful action occurred, describe each one in plain words (what the item was, what the system did, what should have happened). The owner needs to see them, not just count them.
- **Length:** 40 to 65 words.
- **Data needed:** harmful-action name(s), count(s), total(s).
- **Tags:** DATA, AI (business meaning).

## 4. Usefulness against your target
- **Purpose:** report how much the system handled on its own, compared with the owner's target.
- **Content:** count, total, percentage, the target (attributed to the owner), a plain verdict ("met your target" or "below your target"), and the one-item swing ("one more would have made it [X] percent").
- **Variable:** if the owner has no target, report the result and ask for a target in section 7.
- **Length:** 50 to 75 words.
- **Data needed:** usefulness count, total, percentage, target, verdict (from unrounded values), one-item swing.
- **Tags:** DATA, FIXED verdict wording.

## 5. The trade-off and your team's role
- **Purpose:** explain what happens to the items the system did not handle, and what that means for the owner's staff.
- **Content:** where unhandled items go and why (the design choice behind it), one real example from the test set, how many went to a person in testing (the one place a "roughly 1 in X" may appear, next to its exact count), that the reviewer reads the item itself rather than accepting the system's suggestion, and that real volume is measured in the pilot.
- **Length:** 60 to 90 words.
- **Data needed:** referral count and total, "roughly 1 in X" phrase (code-calculated), one example item text, design reason (from setup).
- **Tags:** DATA, AI.

## 6. Limits
- **Purpose:** everything the owner should know before choosing.
- **Content:** mandatory limits (test cases, not real ones; test size; who set the correct answers), what was not tested, and the known limits from the client setup.
- **Length:** 3 to 6 bullets, 50 to 90 words.
- **Data needed:** mandatory limits (FIXED), not-tested list and known limits (setup).
- **Tags:** FIXED, DATA (from setup), AI (plain-language rewording).

## 7. What we need from you
- **Purpose:** end on the action.
- **Content:** two or three real options (no invented middle option), our recommendation labeled as ours, "the choice is yours," what the pilot will measure, and an invitation to revisit the target if it was missed or never set. Then any other confirmations needed from the owner (from setup).
- **Length:** 60 to 100 words.
- **Data needed:** options, recommendation, pilot measures, open questions (setup).
- **Tags:** PROPOSED, AI.

---

## Overfitting test

Checked against a second, imagined system: an invoice-data extractor for a bookkeeping firm.
- **Fits without change:** sections 1, 2, 5, 6, 7. Harmful action = "wrong amount entered without review"; item = invoice.
- **Gap found:** some systems have partly-correct outcomes (some fields right, some wrong), and some always go to a person, so "handled on its own" means something else, such as "accepted without edits." Fix: the outcome categories and the usefulness measure are defined in the client setup, not assumed. Handle this in the standard input format (next step).
