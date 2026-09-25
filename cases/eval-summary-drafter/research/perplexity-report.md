# Evidence-Based Guidance for One-Page AI Evaluation Decision Memos

A research synthesis covering structure, uncertainty communication, plain language, claim discipline, and automation readiness for one-page AI evaluation summaries delivered to non-technical business owners making a pilot decision.

**Scope.** Results come from synthetic test cases, not production use. This guidance covers how to document and communicate those results to a non-technical decision-maker, not the technical evaluation methods themselves.

**Evidence labels.** Each recommendation is marked: **strong evidence** (peer-reviewed or government standard with direct empirical support), **moderate evidence** (established framework, government guidance, or widely cited practitioner source), or **expert opinion** (practitioner consensus without controlled empirical validation).

---

## A. Recommended Section Structure

The recommended structure synthesizes the Minto Pyramid Principle ([Executive Authority](https://executive-authority.com/insights/minto-pyramid-principle-executive-communication/)), Bottom Line Up Front (BLUF) conventions, the UK Government Statistical Service guidance on communicating quality and uncertainty ([GSS](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/)), and the NIST AI RMF Measure and Manage functions ([NIST AIRC](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)).

| # | Section | Purpose | Target length |
|---|---|---|---|
| 1 | Bottom Line Up Front | One-sentence recommendation and the decision being asked of the owner. | 1–2 sentences |
| 2 | What We Tested | What the system does, what the test cases covered, and what they did not cover. | 2–3 sentences |
| 3 | Safety Results | Count-based results on errors that matter most (e.g., wrong actions). Lead with the most consequential error type. | 2–3 sentences |
| 4 | Usefulness Results | How often the system handled tasks automatically, measured against the target the owner set. | 2–3 sentences |
| 5 | What This Means (Trade-off) | The balance between automation and human review, in plain language. | 2–3 sentences |
| 6 | Limitations | What the test results do and do not tell us. Small sample, synthetic data, no production exposure. | 2–3 sentences |
| 7 | Your Decision | The options and a recommendation. Framed so the owner makes a real choice. | 3–4 sentences |

**Rationale.** The Minto Pyramid Principle dictates that the answer comes first, supported by grouped reasons, with evidence below ([Executive Authority](https://executive-authority.com/insights/minto-pyramid-principle-executive-communication/)). The GSS guidance states that "vital messages about quality that have a profound impact on what can be drawn from the numbers should be presented up front" and that limitations should not be "hidden away in background appendices or footnotes" ([GSS](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/)). The NIST AI RMF Measure function requires that evaluations be "documented" and that "limitations of generalizability beyond the conditions under which the technology was developed are documented" ([NIST AIRC](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)), which maps directly to the Limitations section.

**Evidence level: moderate.** The Minto Pyramid is widely cited practitioner guidance, not empirically tested in controlled studies. The GSS guidance is a government standard. The NIST AI RMF is a voluntary but authoritative government framework.

---

## B. Top 10 Writing Rules

| # | Rule | Source | Evidence level |
|---|---|---|---|
| 1 | Start with the answer. Lead with the recommendation and the decision, then support it. | [Executive Authority](https://executive-authority.com/insights/minto-pyramid-principle-executive-communication/) | Expert opinion |
| 2 | Use active voice. State who is responsible for each action. | [Digital.gov](https://digital.gov/guides/plain-language/writing) | Moderate evidence |
| 3 | Keep sentences to 20 words or fewer. | [HHS Health Literacy Online](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language) | Moderate evidence |
| 4 | Use common words. Define any technical term the first time it appears, in context. | [HHS Health Literacy Online](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language) | Moderate evidence |
| 5 | Give context before new information. Use if/then structure. | [HHS Health Literacy Online](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language) | Moderate evidence |
| 6 | Present numbers as natural frequencies (e.g., "3 of 10") alongside percentages, not percentages alone. | [Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/) | Strong evidence |
| 7 | Present absolute risks, not relative risks alone. | [Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/) | Strong evidence |
| 8 | State limitations prominently, not in footnotes. Explain what the results do and do not show. | [GSS](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/) | Moderate evidence |
| 9 | Never make users do math. If a calculation is needed, provide the result directly. | [HHS Health Literacy Online](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language) | Moderate evidence |
| 10 | Do not present test results as real-world performance. Label results as from test cases, not production use. | [NIST AI RMF](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/), [Mitchell et al., Model Cards](https://research.google/pubs/model-cards-for-model-reporting/) | Moderate evidence |

---

## C. Communicating Uncertainty and Small Samples

### Guidance

Risk-communication research by Gigerenzer and Edwards demonstrates that the representation of statistical information determines whether audiences understand it. Single-event probabilities ("30% chance") leave the reference class ambiguous — people do not know whether "30%" refers to 30% of cases, 30% of the time, or 30% of something else. Natural frequencies ("3 of every 10") specify the reference class and are substantially easier for both laypeople and professionals to interpret correctly. In one study, only about 8% of doctors given conditional probabilities could correctly estimate a positive predictive value, while most doctors given the same information as natural frequencies got it right ([Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/)).

The UK GSS guidance adds that uncertainty should be "prominent," "easy to find," and "not hidden away in background appendices or footnotes." Analysts should "explain what you can and what you cannot conclude from the findings" and "pre-empt any misunderstanding and overinterpretation" ([GSS](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/)).

For small samples specifically, the GSS guidance notes that small numbers "can affect observed trends" and that changes within the bounds of random variation are "indicative rather than definitive." Where sample sizes are small, estimates carry "a higher degree of error" ([GSS](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/)).

### Rules for this memo

- **Prefer counts over percentages alone.** "18 of 23" is more transparent than "78%" because it shows the sample size.
- **Add percentages for context, but never as the only format.** The HHS guidance recommends including both: "10% or 1 in 10" ([HHS Health Literacy Online](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language)).
- **State the sample size every time you state a result.** Small samples widen the range of plausible true performance.
- **Avoid relative risk language.** "Reduces errors by 50%" is misleading without the absolute base rate.
- **Label all results as estimates from test cases.** Do not imply production-level certainty.

### Example phrasings

1. "In 37 test cases, the system produced 0 wrong actions. This means we saw no errors, but 37 cases is a small sample — the true error rate could be higher in real use."

2. "The system handled 18 of 23 tasks automatically (about 78%). Your target was 80%. With only 23 cases, a difference of one or two cases either way would move the result above or below target."

3. "About 1 in 5 cases needed a human to step in. Most of these were edge cases the system was not designed to handle alone."

4. "These results are from synthetic test cases, not from live use. They tell us the system works on the cases we designed, not how it will perform on every real situation."

5. "We cannot rule out errors we did not test for. These results show what happened in our test set, not the full range of what could happen in production."

**Evidence level: strong** (Gigerenzer, peer-reviewed in BMJ) for natural frequencies and absolute risk. **Moderate** for the small-sample guidance (GSS government standard). **Moderate** for the dual-format recommendation (HHS government guidance).

---

## D. Framing the Decision Ask

### Guidance

Framing effects are among the most robust findings in behavioral decision research. Logically equivalent information presented differently leads to different decisions. Positive framing ("97% survival") and negative framing ("3% mortality") produce different choices even among experts ([Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/)). Relative risk framing ("50% reduction") makes benefits appear larger than absolute risk framing ("1 in 1,000") does ([Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/)).

The GSS guidance recommends being "neutral and impartial, letting the facts speak for themselves" and using "representations that foster insight rather than representations selected because they make benefits look larger or harms look smaller" ([GSS](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/)). The NIST AI RMF Manage function states that "a determination is made as to whether the AI system achieves its intended purposes" and that risk-response options "can include mitigating, transferring, avoiding, or accepting" ([NIST AIRC](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)) — a framing that presents a real choice, not a rubber stamp.

For a target the client owns, the memo should present the target as the client's own benchmark, not as a pass/fail threshold imposed by the consultant. This preserves the owner's authority over what "good enough" means.

### Rules for this memo

- Present 2–3 options, not a binary go/no-go, unless only two are genuinely viable.
- State a recommendation, but make clear it is a recommendation, not a foregone conclusion.
- Present the target as the owner's own benchmark.
- Use the same numbers for all options. Do not switch formats (percentages for one option, counts for another).
- Balance positive and negative framing when framing could influence the decision ([Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/)).

### Example phrasings

1. "You set an 80% target for automatic handling. The system reached 78% in our tests. You have three options: (a) run a pilot as-is, (b) run a pilot with an expanded test set first, or (c) hold for revisions. We recommend (b), but the decision is yours."

2. "Your target was zero wrong actions. We saw zero in 37 test cases. Because the sample is small, we recommend a pilot with close monitoring rather than full rollout — but this is your call."

3. "The system met your target on usefulness but not on safety margin. You can pilot with a human-review step on every flagged case, or hold for safety improvements. We recommend the human-review pilot because it lets you learn from real use without exposing the business to unreviewed actions."

**Evidence level: strong** for framing effects and relative vs. absolute risk (Gigerenzer, peer-reviewed). **Moderate** for the neutrality principle (GSS government standard). **Moderate** for the options framing (NIST AI RMF Manage function).

---

## E. Common Mistakes to Avoid

1. **Presenting test results as production performance.** The most common overclaim. Label every result as from test cases. The NIST AI RMF requires that "limitations of generalizability beyond the conditions under which the technology was developed are documented" ([NIST AIRC](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)). Model cards were created specifically to "clarify the intended use cases of machine learning models and minimize their usage in contexts they are not well-suited for" ([Mitchell et al.](https://research.google/pubs/model-cards-for-model-reporting/)).

2. **Using percentages without counts.** "78%" hides the sample size. "18 of 23" shows it. Gigerenzer's research shows that frequencies are more transparent than single-event probabilities ([Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/)).

3. **Using relative risk language.** "50% fewer errors" is meaningless without the base rate. Always give absolute numbers ([Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/)).

4. **Burying limitations in footnotes or appendices.** The GSS guidance is explicit: vital quality messages "should be presented up front" and "not hidden away in background appendices or footnotes" ([GSS](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/)).

5. **Steering the decision with loaded framing.** Presenting only the positive frame ("97% success") without the negative frame ("3% failure rate") biases the decision. Balance both ([Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/)).

6. **Using passive voice to obscure responsibility.** "Errors were observed" is weaker than "the system made 2 errors." Active voice makes clear who did what ([Digital.gov](https://digital.gov/guides/plain-language/writing)).

7. **Using jargon without defining it.** "False positive rate" means nothing to a non-technical owner. Define terms in context the first time ([HHS Health Literacy Online](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language)).

8. **Treating the target as a pass/fail threshold.** If the system scored 78% against an 80% target, the owner may still want to pilot. Present the target as context, not a verdict.

9. **Failing to state what was not tested.** The NIST AI RMF requires documenting "risks or trustworthiness characteristics that will not — or cannot — be measured" ([NIST AIRC](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)). The memo should say what is outside the test scope.

10. **Making the reader do math.** If the reader needs to calculate a rate, the memo has failed. Provide the result directly ([HHS Health Literacy Online](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language)).

---

## F. Automation Notes

### Section classification

| Section | Classification | Notes |
|---|---|---|
| 1. Bottom Line Up Front | Human judgment | The recommendation and framing of the decision require human judgment. An LLM can draft, but the consultant must approve. |
| 2. What We Tested | Data-driven + human judgment | The description of test scope is data-driven (from test case metadata), but the framing of what was and was not covered needs human review. |
| 3. Safety Results | Data-driven | Counts of errors by type come directly from test results. An LLM can draft from structured data, but every number must be verified against source data. |
| 4. Usefulness Results | Data-driven | Count of automatically handled cases and comparison to target come from test results. Same verification requirement. |
| 5. What This Means | Human judgment | The trade-off between automation and human review requires interpretation. An LLM can draft, but the framing must be reviewed for neutrality. |
| 6. Limitations | Fixed + human judgment | A fixed template can generate the standard limitations (small sample, synthetic data, no production exposure), but the specific limitations relevant to this system need human judgment. |
| 7. Your Decision | Human judgment | Options and recommendation require human judgment. An LLM can draft options from the data, but the recommendation and framing must be reviewed. |

### Language-model failure modes and checks

| Failure mode | What goes wrong | Check |
|---|---|---|
| Fabricated numbers | The LLM invents a statistic, count, or percentage not in the source data. | Automated numeric verification: extract every number from the draft and match it against the source data file. Flag any number not found in source. |
| Altered numbers | The LLM changes a number slightly (e.g., rounding 78.3% to 80%) or transposes digits. | Same automated numeric verification. Check exact values, not ranges. |
| Dropped caveats | The LLM omits a limitation or uncertainty statement that was in the source data or required by the template. | Checklist verification: confirm all required limitation statements are present in the draft. |
| Overclaiming | The LLM upgrades "test results" to "performance" or implies production-level certainty. | Keyword scan: flag any occurrence of "performance," "accuracy," "reliability," or "proven" without the qualifier "in test cases." |
| Misattribution | The LLM attributes a result to the wrong test category or confuses safety results with usefulness results. | Structural check: verify that numbers in the Safety section match safety test data, and numbers in the Usefulness section match usefulness test data. |
| Inconsistent framing | The LLM uses positive framing for one option and negative framing for another. | Manual review of the decision section for balanced framing. |
| Self-contradiction | The BLUF recommendation contradicts the evidence in the body. | Cross-reference check: verify the recommendation in Section 1 is consistent with the results in Sections 3–4. |

**Evidence level: moderate.** The failure modes (fabrication, misattribution, unfaithful summary, self-contradiction) are documented in practitioner and research sources on LLM hallucination ([IBM](https://www.ibm.com/think/topics/ai-hallucinations), [Future AGI](https://futureagi.com/blog/understanding-llm-hallucination-2025/)). Research on LLM fact-checking shows that LLMs are better at verifying true claims than false ones and that retrieval-augmented generation helps but does not eliminate errors ([arXiv](https://arxiv.org/html/2503.18293v1)). The specific checks are expert opinion, derived from the failure modes.

---

## G. Review Checklist

1. Does the memo start with a one-sentence recommendation and the decision being asked? [ ] Yes [ ] No
2. Are all numbers in the memo present in the source test data? [ ] Yes [ ] No
3. Is every result labeled as coming from test cases, not production use? [ ] Yes [ ] No
4. Does every percentage appear alongside its count (e.g., "18 of 23, about 78%")? [ ] Yes [ ] No
5. Is the sample size stated every time a result is reported? [ ] Yes [ ] No
6. Are limitations stated prominently, not in footnotes? [ ] Yes [ ] No
7. Does the memo state what was not tested? [ ] Yes [ ] No
8. Are 2–3 options presented for the decision, with a clearly labeled recommendation? [ ] Yes [ ] No
9. Is the target presented as the owner's own benchmark, not as a pass/fail verdict? [ ] Yes [ ] No
10. Is the framing balanced (positive and negative frames both present where framing could influence the decision)? [ ] Yes [ ] No
11. Are all sentences 20 words or fewer? [ ] Yes [ ] No
12. Is every technical term defined the first time it appears? [ ] Yes [ ] No
13. Is the memo written in active voice throughout? [ ] Yes [ ] No
14. Does the recommendation in Section 1 match the evidence in Sections 3–4? [ ] Yes [ ] No
15. Is the memo one page or less? [ ] Yes [ ] No

---

## H. Sources

| Title | URL | Type |
|---|---|---|
| NIST AI Risk Management Framework | [https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework) | Government (standards body) |
| NIST AI RMF Core — Govern, Map, Measure, Manage | [https://airc.nist.gov/airmf-resources/airmf/5-sec-core/](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | Government (standards body) |
| NIST AI RMF Generative AI Profile (NIST AI 600-1) | [https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework) | Government (standards body) |
| Gigerenzer G, Edwards A. "Simple tools for understanding risks: from innumeracy to insight." BMJ 2003. | [https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/) | Peer-reviewed |
| Communicating quality, uncertainty and change — UK Government Statistical Service | [https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/](https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/) | Government |
| Model Cards for Model Reporting — Mitchell et al., Google Research, 2019 | [https://research.google/pubs/model-cards-for-model-reporting/](https://research.google/pubs/model-cards-for-model-reporting/) | Practitioner (industry research) |
| Writing for Understanding — Federal Plain Language Guidelines (Digital.gov) | [https://digital.gov/guides/plain-language/writing](https://digital.gov/guides/plain-language/writing) | Government |
| Write in Plain Language — HHS Health Literacy Online | [https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language) | Government |
| Plain Writing Act of 2010 (referenced via USDA Plain Writing) | [https://www.usda.gov/plain-writing](https://www.usda.gov/plain-writing) | Government (law) |
| Minto Pyramid Principle for Executive Communication | [https://executive-authority.com/insights/minto-pyramid-principle-executive-communication/](https://executive-authority.com/insights/minto-pyramid-principle-executive-communication/) | Practitioner |
| What Are AI Hallucinations? — IBM | [https://www.ibm.com/think/topics/ai-hallucinations](https://www.ibm.com/think/topics/ai-hallucinations) | Vendor |
| LLM Hallucination 2025: Causes & Detection — Future AGI | [https://futureagi.com/blog/understanding-llm-hallucination-2025/](https://futureagi.com/blog/understanding-llm-hallucination-2025/) | Practitioner |
| Fact-checking AI-generated news reports: Can LLMs catch their own lies? — arXiv 2025 | [https://arxiv.org/html/2503.18293v1](https://arxiv.org/html/2503.18293v1) | Peer-reviewed (preprint) |
| Error Management Theory and the Evolution of Cognitive Bias — Seixas & Al-Shawaf | [https://doi.org/10.1007/978-3-031-08956-5_83-1](https://doi.org/10.1007/978-3-031-08956-5_83-1) | Peer-reviewed |

---

## Areas Where Credible Sources Disagree

**Minto Pyramid vs. BLUF.** The Minto Pyramid Principle and BLUF (Bottom Line Up Front) agree on the core point — lead with the answer — but differ on structure. Minto prescribes a hierarchical pyramid: answer first, then 2–4 supporting reasons, then evidence under each. BLUF, originating in military communication, is simpler: state the conclusion in the first sentence, then provide context. For a one-page memo, BLUF is sufficient. For a longer report, the full Minto pyramid adds value. This memo uses BLUF because the page limit does not support a full pyramid ([Executive Authority](https://executive-authority.com/insights/minto-pyramid-principle-executive-communication/)).

**Percentages vs. frequencies.** Gigerenzer's research strongly favors natural frequencies over single-event probabilities for risk communication ([Gigerenzer & Edwards, BMJ 2003](https://pmc.ncbi.nlm.nih.gov/articles/PMC200816/)). The HHS guidance recommends including both formats because "some people find percentages more helpful, while others prefer frequencies" ([HHS Health Literacy Online](https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language)). This guidance recommends both: lead with the count/frequency, add the percentage for context.

**AI transparency frameworks.** The NIST AI RMF is voluntary, consensus-driven, and does not prescribe specific documentation formats ([NIST](https://www.nist.gov/itl/ai-risk-management-framework)). Model cards (Mitchell et al.) propose a specific documentation structure but do not mandate it ([Mitchell et al.](https://research.google/pubs/model-cards-for-model-reporting/)). System cards (as implemented by Meta and others) add operational details but lack a universal standard. There is no single agreed-upon template for AI evaluation reporting. This guidance draws principles from all three but does not adopt any single framework wholesale.

## What Could Not Be Verified

- No peer-reviewed study was found that directly tests the effectiveness of a one-page decision memo format for AI evaluation results with non-technical business owners specifically. The structure recommendation is synthesized from executive communication guidance, government statistical communication standards, and AI risk management frameworks, not from a controlled study of this exact document type.
- No empirical study was found that directly measures the rate at which LLMs fabricate or alter numbers in data-based report drafts. The failure modes listed in Section F are documented in general LLM hallucination research ([IBM](https://www.ibm.com/think/topics/ai-hallucinations), [Future AGI](https://futureagi.com/blog/understanding-llm-hallucination-2025/)) but not specifically in the context of structured-data report generation.
- The BLUF convention is widely cited in military and executive communication contexts, but no single authoritative source was found that documents its origin or provides empirical validation. It is treated as expert opinion.
