# Guide: Writing One-Page AI Evaluation Memos

Version 1.1, 2026-09-26 (added 1.6 and 5.5). Rules for any client memo, whether drafted by hand or by the automation. Built from three independent deep research reports (ChatGPT, Perplexity, Gemini), compared and decided in the Rivertown sessions. Companion files: memo-outline.md and memo-checklist.md.

Evidence labels: STRONG = systematic reviews, peer-reviewed studies, or standards bodies with direct support. MODERATE = government guidance or strong evidence transferred from another field. OPINION = expert judgment.

## The governing principle

**The memo's job is an informed decision, not a yes.** A client who was warned about the limits forgives problems during a pilot; a client who was oversold does not. When a draft makes things sound better than the data, that is a failure, not polish. (MODERATE: expectation-disconfirmation research on customer satisfaction, Oliver 1980.)

**Make it easy, not impressive.** Making a complex subject easy to understand is the skill; the reader should never have to translate. Use the plainest word that is still accurate ("message," not "inquiry"; "straightforward request," not a defined label).

**Set the expectation before testing starts.** In the proposal or kickoff, tell the client: "The test shows how the system behaves on cases we design. A test this size can't support estimates; the pilot provides those." The memo then confirms what the client already agreed to.

## 1. Claims

1.1 **Label test results as test results, before the first number.** Say they come from test cases we wrote, not real [items]. The top summary counts: any result there carries "in testing". (STRONG: NIST AI 100-1 and NIST AI 600-1 on documenting test conditions and not extrapolating from narrow tests.)

1.2 **"None observed" never becomes "safe."** Write "[harmful action] in 0 of [N] test [items]," never "safe," "zero risk," or "error-free." (STRONG: NIST AI 600-1.)

1.2a **If a harmful action occurred, show it.** Describe each one in plain words: the item, what the system did, what should have happened. A count alone hides the thing the owner most needs to judge. (OPINION, follows from NIST AI 100-1 on disclosing residual risk.)

1.3 **Describe the system's results, not the system.** "In testing, it handled 18 of 23" is correct. "It handles 78 percent" turns a test result into a property of the system. (STRONG: NIST AI 600-1.)

1.4 **No savings, volume, or time claims unless measured.** "Saves 10 hours a week" is a forecast. Say what happened in the test instead: "your team would have handled 5 of 23 instead of all 23." (OPINION, follows from 1.1.)

1.5 **Describe what the system actually does.** If it only sorts, say it only sorts. Don't let "handled automatically" imply the whole job was done. (OPINION.)

1.6 **Never fill a gap by guessing.** If the memo needs a fact that is not in the approved facts or the client setup, write [MISSING: what is needed] and let the consultant fill it. A guessed fact reads exactly like a real one. (OPINION, added after the first automated draft said the client's staff wrote the tests.)

## 2. Numbers

2.1 **Exact counts first, percentage second.** "18 of 23 (78 percent)." The count shows how much evidence there is. (MODERATE: IPDAS risk-communication primer, Trevena 2013; Gigerenzer and Edwards 2003.)

2.2 **One "roughly 1 in X" per memo, at most.** Code calculates it, it always sits next to its exact count, and it goes on the number the owner most needs to picture, usually the review workload. Skip it for zero counts or where it misleads. (MODERATE: frequency formats help understanding, Gigerenzer and Edwards 2003; several "1 in X" figures on different bases mislead, Trevena 2013; frequency vs percentage comparisons inconclusive, Zipkin 2014.)

2.3 **Report harmful actions separately from referrals to a person.** Never combine them into one "accuracy" figure. The costs are different. (STRONG: NIST AI 100-1 on context-specific risk and safe failure.)

2.3a **Describe groups of test items in everyday words, every time.** Say "straightforward requests for one service," not a label you define once and reuse ("clear inquiries"). Owners read once; they won't scroll back for a definition. Say what the rest of the items were. (OPINION, added after the first Rivertown review.)

2.4 **Never make the reader do math.** Give the result directly. (MODERATE: HHS Health Literacy Online.)

## 3. Targets

3.1 **The target belongs to the client.** Write "your 80 percent target," not "the required 80 percent." (STRONG: NIST AI 100-1 leaves risk tolerance to the organization.)

3.2 **State the verdict plainly, with neutral words.** "Met your target" or "below your target." Never "failed" or "passed." The verdict is decided on the unrounded value, then rounded for display.

3.3 **Put factual context next to the verdict.** Factual gaps are allowed: "one inquiry short," "2 points below," "one more would have made it 83 percent."

3.4 **Invite the owner to revisit the target.** Targets set before testing are estimates. The decision section may ask: "Is [target] still the right target, now that you've seen the trade-off?"

## 4. Uncertainty

4.1 **No forecasts or statistical ranges from hand-built test sets.** The math assumes the test items resemble real ones, and hand-written tricky cases don't. (OPINION, grounded in NIST's representativeness requirements.)

4.2 **Express uncertainty through facts:** the test size, the one-item swing, and "test cases, not real [items]."

4.3 **No hedge words.** Vague verbal uncertainty damages trust more than stated facts. (MODERATE: van der Bles et al. 2020, PNAS.)

4.4 **The pilot supplies the planning numbers.** The decision section says what the pilot will measure: the real rate and the real review workload.

## 5. The decision

5.1 **Two or three real options.** Don't invent a middle option to look balanced. (MODERATE: Cochrane review of 209 decision-aid studies, Stacey 2024; transferred from healthcare decisions.)

5.2 **Label the recommendation as ours, and leave the choice with the owner.** "We recommend A. The choice is yours." A labeled recommendation is advice; an unlabeled one disguised as a result is steering. (MODERATE: HM Treasury Green Book; Stacey 2024.)

5.3 **Each option states what happens to the business, not what changes in the system.** "Some customers could reach the wrong team," not "loosening the check." An owner should be able to picture the consequence of each option without reading another section. (OPINION, added after the first Rivertown review: a mechanism description passed the old rule but needed expert translation.)

5.3a **Say who does what in the pilot.** When a pilot depends on the client's staff, put their action in the decision section as a request to them, and state what we do to support it ("Ask each team to report... We will track these and report back"). Never write a pilot activity in a way that hides whose job it is. (OPINION, added after the first Rivertown review.)

5.4 **Limits come before the decision.** The owner chooses after seeing the downsides. The memo ends on the action. (MODERATE: Stacey 2024.)

5.5 **Choose the options from the playbook.** Code sets the scenario from the approved facts. The AI writes that scenario's options as business consequences, using the client's harmful action and item groups from the setup. A client-specific `options` list in the setup replaces the playbook for unusual cases. (OPINION, from the Rivertown options discussion, 2026-09-26.)

| Scenario (set by code) | Option A | Option B | Our default recommendation |
|---|---|---|---|
| below_target: no harmful actions, below target | Pilot as is. More [items] come to your reviewer than the target assumed. | Push toward the target before the pilot. The system would decide on its own more often when unsure, so more [items] could end in [harmful action]. | A. Ask whether the target is still right (3.4). |
| met_target: no harmful actions, target met | Pilot as is. | Start with a narrower pilot (fewer kinds of [items] or a shorter trial) to confirm the results on real [items]. | A |
| harmful: any harmful action occurred | Fix and retest before any pilot. | Pilot with a person checking every [item]; the system only suggests. | A. Describe each harmful action (1.2a). |
| no_target: no target set | No options yet. Report the result and ask the owner to set a target. | None | None until a target exists |

## 6. Limits

6.1 **Specific, not generic.** Include only limits that could change the decision or the pilot design. No boilerplate AI disclaimers. (STRONG for disclosure: NIST AI 100-1; model cards, Mitchell 2019. OPINION for filtering.)

6.2 **Always include:** test cases, not real ones; test size; who set the correct answers; what was not tested.

## 7. Plain language

7.1 **Business words, not technical ones.** "Sent to the wrong team," not "false positive." "Sent to a person," not "abstention." (MODERATE: Digital.gov plain-language principles.)

7.2 **Short sentences, active voice.** Sentences over 20 words get flagged for review, not rejected. (MODERATE: HHS Health Literacy Online; Digital.gov.)

7.3 **Write for a business owner, not for a grade level.** (MODERATE: Digital.gov.)

7.4 **Length serves content, not the reverse.** Aim for 350 to 500 words, allow up to about 650 (one printed page) for decision-relevant content. To shorten, cut repetition and wording, never a limit or required element. (OPINION: the word budgets from the research were marked expert opinion, not evidence.)

## 8. Word lists (checked by code)

- **Softeners (banned):** close, nearly, almost, just short, just under, narrowly.
- **Hype (banned):** strong result, exceeded, impressive, excellent, robust, proven, guaranteed.
- **Absolute safety claims (banned):** safe, zero risk, error-free, flawless.
- **Hedges (banned):** likely to, unlikely to, probably, should be able to, should perform, expected to, we anticipate. ("Should" alone stays allowed; it is also how recommendations are phrased.)
- **Technical terms (banned in client memos):** holdout, temperature, gate, model names, run numbers, false positive, false negative, precision, recall, accuracy.

Model names and run labels can't be caught by a generic rule; each client setup lists the specific names to ban (for example, the model and version names used in that project). Code matches whole words and phrases only, so "safe" does not flag "safety." Lists are version 1 and will grow as reviews find new cases.

## 9. How the automation applies these rules

**Code owns facts, the AI owns wording, the consultant owns judgment.** (OPINION, motivated by: Maynez 2020 and Sundararajan 2024 on invented facts in generated text; TofuEval 2024 on AI models as unreliable fact-checkers.)

1. **Code calculates the approved facts** from the standard test-results file: every count, percentage, verdict, one-item swing, and "roughly 1 in X" phrase. Clean, named input fields matter: fixing input problems cut factual errors 52 to 76 percent in one study (STRONG: Sundararajan, Sripada and Reiter, NAACL 2024).
2. **The AI drafts the full memo** from the approved facts and the client setup, including a proposed recommendation.
3. **A fresh AI call edits the draft** against its checklist items. It may change wording, sentence length, and order, and add a missing required element from approved facts. It may not change numbers, facts, the recommendation, or tone. It lists every change and notes any gaps or judgment issues for the consultant. "Improve" means clearer and more complete, not more persuasive. (MODERATE: Self-Refine, Madaan 2023, found self-critique improves outputs; Huang 2024 found self-correction does not reliably fix factual errors, which is why code checks follow.)
4. **Code checks the edited draft** against the approved facts and word lists. One automatic fix attempt with the exact error; anything still wrong is flagged in the draft. Nothing stops.
5. **The consultant reviews** the draft, flags, and change list, and approves.

## Sources

| Source | Type | Checked directly 2026-09-25 |
|---|---|---|
| NIST AI 100-1, AI Risk Management Framework 1.0 | Standards body | No |
| NIST AI 600-1, Generative AI Profile | Standards body | No |
| Stacey et al. 2024, Decision aids for people facing health treatment or screening decisions, Cochrane (209 studies, 107,698 participants) | Peer-reviewed | Yes |
| Sundararajan, Sripada and Reiter 2024, Improving Factual Accuracy of Neural Table-to-Text Output by Addressing Input Problems in ToTTo, NAACL | Peer-reviewed | Yes |
| Trevena et al. 2013, Presenting quantitative information about decision outcomes (IPDAS primer) | Peer-reviewed | No |
| Zipkin et al. 2014, Evidence-based risk communication: a systematic review, Annals of Internal Medicine | Peer-reviewed | No |
| Gigerenzer and Edwards 2003, Simple tools for understanding risks, BMJ | Peer-reviewed | No |
| van der Bles et al. 2020, The effects of communicating uncertainty on public trust in facts and numbers, PNAS | Peer-reviewed | No |
| Maynez et al. 2020, On Faithfulness and Factuality in Abstractive Summarization, ACL | Peer-reviewed | No |
| Tang et al. 2024, TofuEval, NAACL | Peer-reviewed | No |
| Madaan et al. 2023, Self-Refine | Peer-reviewed | No |
| Huang et al. 2024, Large Language Models Cannot Self-Correct Reasoning Yet | Peer-reviewed | No |
| Mitchell et al. 2019, Model Cards for Model Reporting | Peer-reviewed | No |
| Oliver 1980, expectation-disconfirmation model of satisfaction, Journal of Marketing Research | Peer-reviewed | No |
| Digital.gov plain-language principles; HHS Health Literacy Online | Government | No |
| HM Treasury, The Green Book | Government | No |

"No" means the source is well established but was not re-verified in this session. The two figures this guide quotes directly (209 studies; 52 to 76 percent) were verified.
