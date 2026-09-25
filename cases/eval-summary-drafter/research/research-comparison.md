# Deep Research Comparison: One-Page AI Evaluation Memos

Synthesis step 1, 2026-09-25. Inputs: ChatGPT (open ai deep-research-report.md), Perplexity (perplexity AI Evaluation Memo Guidance.md), Gemini (Gemini AI Evaluation Memo Research Plan.docx). All three used the same prompt and the A to H format.

## Overall quality

| Report | Strength | Weakness |
|---|---|---|
| ChatGPT | Strongest by a wide margin. Peer-reviewed and government sources throughout (NIST AI 100-1 and 600-1, Cochrane reviews, IPDAS risk primer, Zipkin 2014, Maynez 2020, TofuEval, the NAACL 2024 table-to-text study). Evidence labels are honest; it says when evidence is transferred from healthcare. Worked directly with our numbers. | Inline citation markers broke on export (they show as "citeturn..."); the source list in section H is intact. The 2026 Green Book and Ancker 2025 could not be independently confirmed here. |
| Perplexity | Clean and practical. Good on plain language (HHS, Digital.gov) and on stating limitations up front (UK Government Statistical Service). Adds "state what was not tested" and "never make the reader do math." | Thin on automation evidence: cites vendor blogs (IBM, Future AGI) where peer-reviewed work exists, and says it found no study of number errors in data-to-text drafting (ChatGPT found one). Some example phrasings invent facts ("most of these were edge cases the system was not designed to handle"). |
| Gemini | Two useful ideas the others missed: human reviewers tend to rubber-stamp the machine's suggestion (automation bias), and a drafting model tends to soften bad news for the client (sycophancy). Its core psychology sources are real peer-reviewed work (Parasuraman and Manzey 2010, Tversky and Kahneman 1971, Gigerenzer and Hoffrage 1995, van der Bles 2020), even where linked through unofficial copies. | Source-to-claim fit is uneven: practitioner posts (Medium, Reddit) are cited for engineering claims they can illustrate but not establish, and an "epistemic placebo" paper could not be confirmed. Labels its own structure "strong evidence" without support. Recommends forecasting future volumes from test results ("350 to 420 of 500"), which breaks claim discipline. Mixes up false positive and false negative between sections B and E. Its example for our exact case says "coming close to your 80% target," the softening it warns against elsewhere. |

## Where all three agree (settled)

1. Answer first: recommendation and the decision up top.
2. Show counts with their denominators ("18 of 23"); a percentage can sit beside the count but never replaces it.
3. Report wrong actions separately from referrals to a person. No single "accuracy" figure.
4. Say plainly that results come from synthetic test cases, and put that near the results, not only at the end.
5. "0 observed" never becomes "safe" or "zero risk."
6. The target belongs to the client ("your 80 percent target").
7. Give real options with an explicitly labeled recommendation; the owner decides.
8. Plain business language; no technical terms.
9. Limits must be specific to this test, not generic AI disclaimers.
10. Automation: code computes every number, a checker matches every number in the draft to the source data, required caveats are checked for, and a human owns and approves the recommendation.

## Conflicts (need Josh's decision)

C1. "About 1 in 5" vs exact counts. ChatGPT: report "5 of 23"; "1 in X" formats with changing denominators mislead (IPDAS; Zipkin 2014 found frequency vs percentage comparisons inconclusive). Perplexity and Gemini use "1 in 5." Recommendation: exact counts first, percentage second, no "1 in X." Strongest evidence.

C2. Section order. ChatGPT: decision summary, test basis, safety, usefulness, trade-off, options, limits. Perplexity: same but limits before options. Gemini: decision, recommendation, results, limits, human review protocol. Recommendation: ChatGPT's order. It keeps decision first, and puts the synthetic-test statement right before the results.

C3. How to report a missed target. Perplexity and Gemini: treat the target as context, not a verdict. ChatGPT: say plainly it was missed; never "close to" or "nearly met." Recommendation: combine. State the miss plainly ("below your 80 percent target"), then the owner decides whether it is acceptable. Ban "close," "nearly," and "just short."

C4. Uncertainty. Gemini: give numerical ranges projecting future performance. ChatGPT: no forecasts or confidence intervals from a hand-built synthetic test set; show how much one case moves the figure and let the pilot measure. Recommendation: ChatGPT. A forecast from synthetic tests is the overclaim we are trying to prevent.

C5. AI checker. Gemini: an AI "semantic validator" can reject drafts. ChatGPT: AI judges are unreliable fact-checkers (TofuEval); deterministic checks own facts, a human owns judgment, an AI check can only flag. Recommendation: ChatGPT.

C6. Sentence length. Perplexity: 20 words or fewer, as a hard rule. ChatGPT: short sentences, but no grade-level targets. Recommendation: an automated check that flags sentences over 20 words for human review, not an automatic fail.

## Useful points from one report only (proposed to adopt)

U1. ChatGPT: "Code owns facts; the model owns phrasing; a human owns judgment." The drafting model receives a fixed list of approved facts and renders them; it never calculates.
U2. ChatGPT: decide met/missed on the unrounded value, then round for display.
U3. ChatGPT: clean the input into named fields before drafting. The NAACL 2024 study cut factual errors 52 to 76 percent by fixing input problems.
U4. ChatGPT: flag "may" becoming "will" and similar certainty upgrades.
U5. ChatGPT: do not invent a middle option to look balanced.
U6. ChatGPT: final human test. After one page, can the owner answer: What happened in testing? What did not happen? What am I deciding? What uncertainty am I accepting?
U7. Perplexity: state what was not tested.
U8. Gemini: the reviewer should read the inquiry itself, not just accept the assistant's suggested team (automation bias).
U9. Gemini: check the draft for softened bad news about the client's target (sycophancy). Covered by C3's banned words.

## Impact on revision 2 of the Rivertown summary

- "About 1 in 5" appears three times; replace with exact counts (C1).
- Add a one-line statement of what was not tested (U7).
- Add the reviewer line (U8).
- Keep "one inquiry short" and the "each case moves the figure about 4 points" line; both match C3 and C4.

## Revisions after second pass (2026-09-25)

R1. Source judgment is by fit, not venue. A practitioner source (Reddit, Medium) is good evidence of what practitioners do and experience, weak evidence of what works. A Scribd copy of a peer-reviewed paper is still the peer-reviewed paper.
R2. Drop "within that margin" from the draft. It borrows statistical language that C4 rejects. Use the concrete version: one more handled inquiry would have made it 19 of 23 (83 percent).
R3. Sycophancy check (U9) is not covered by banned words alone. The draft must contain a met/missed statement that matches the computed result (U2).
R4. The chosen order (C2) has no place for team workload and the reviewer's role. Fold both into the trade-off section; the owner needs them to decide.
R5. Before the guide cites specific findings (for example the 52 to 76 percent error reduction), verify the few load-bearing sources directly.
