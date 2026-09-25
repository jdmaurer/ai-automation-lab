# Checklist: Reviewing a One-Page AI Evaluation Memo

Version 1, 2026-09-25. Every item has exactly one owner:
- **CODE** checks it automatically against the approved facts and word lists.
- **EDITOR** is the AI editing pass. It fixes writing issues and flags judgment issues without fixing them.
- **YOU** are the consultant at final review.

A code failure gets one automatic fix attempt; anything still failing is flagged in the draft. Guide rule numbers are in brackets.

## Code checks

| # | Question | Guide |
|---|---|---|
| C1 | Does every number in the draft match an approved fact? | 9.1 |
| C2 | Does the draft contain a target verdict ("met your target" or "below your target") that matches the calculated result? Skip if no target. | 3.2 |
| C3 | Does "roughly 1 in X" appear at most once, and next to its exact count? | 2.2 |
| C4 | Is the draft free of banned softeners, hype, safety claims, hedges, and technical terms? | 8 |
| C5 | Does the first result in the memo carry a test qualifier ("in testing" or "in [N] test [items]")? | 1.1 |
| C6 | Are all seven sections present, in order? | Outline |
| C7 | Is the draft under about 650 words (one printed page)? Flag anything over 500 for review; fail only over 650. | Outline |
| C8 | Which sentences run over 20 words? (Flag only, never fail.) | 7.2 |

## Editor checks

| # | Question | Guide |
|---|---|---|
| E1 | Is every sentence in plain business language, with no technical terms? | 7.1 |
| E2 | Are long sentences split, and is the voice active? | 7.2 |
| E3 | Are harmful actions reported separately from referrals to a person? | 2.3 |
| E4 | Are results described as test results, not as properties of the system? | 1.3 |
| E4a | If any harmful action occurred, is each one described, not just counted? | 1.2a |
| E5 | Does the draft state what was not tested? | 6.2 |
| E6 | Does the decision section say what the pilot will measure? | 4.4 |
| E6a | Could an owner picture the consequence of each option without reading another section? | 5.3 |
| E7 | Do the top summary and the decision section recommend the same thing? (Flag only; never fix.) | 5.2 |
| E8 | Is there anything the approved facts can't support, or a gap they can't fill? (Note only.) | 9.3 |

## Your checks

| # | Question | Guide |
|---|---|---|
| Y1 | Is the proposed recommendation the one you would sign? | 5.2 |
| Y2 | Is each option a genuine choice the client could make, with a different consequence? (Not filler.) | 5.1 |
| Y2a | Would the owner understand each option's consequence on first read, without asking you? | 5.3 |
| Y3 | Are the case-specific limits complete and correct? | 6.1 |
| Y4 | Does anything sound better than the data supports? | Principle |
| Y5 | Does the memo describe accurately what the system does and does not do? | 1.5 |
| Y6 | After one page, could the owner answer these four questions: What happened in testing? What did not happen? What am I deciding? What uncertainty am I accepting? | Principle |
