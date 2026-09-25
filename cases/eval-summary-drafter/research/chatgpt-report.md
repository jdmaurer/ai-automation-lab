# Evidence-Based Design for One-Page AI Workflow Evaluation Memos

## A. Recommended section structure: section names, order, purpose of each, and target length

**Overall recommendation — Strong evidence:** Use an **answer-first decision brief**, not a chronological test report. Put the decision and bottom line first; then present the highest-consequence evidence, usefulness against the client's target, the automation-versus-review trade-off, the actual choice, and the decision-relevant limits. Federal plain-language guidance explicitly recommends stating the purpose and bottom line first and putting the most important information at the beginning. NIST separately says AI evaluations should document test conditions and generalizability limits, while decision-support evidence favors making the choice explicit and showing options and consequences. citeturn20view7turn20view1turn23search2

For this use case, **BLUF/answer-first has better direct support than adopting the named Minto Pyramid as a doctrine**. The useful part of Minto—the answer first, followed by grouped supporting reasons—is consistent with the evidence above. I did **not** find verified comparative evidence showing that a Minto-formatted memo outperforms other answer-first structures for nontechnical business owners, so any Minto-specific recommendation should be treated as **expert opinion**, not research-established fact.

The word budgets below are **expert opinion** tailored to your one-page constraint; they are not empirically validated cutoffs.

| Order | Recommended section | Purpose | Target length | Evidence |
|---|---|---|---:|---|
| First | **Decision at a glance** | In the first two or three sentences: state what was tested, your recommendation, and exactly what the owner is deciding. A useful formula is: **“Recommendation: X. Your decision: Y. Basis: Z synthetic tests.”** | 45–65 words | **Moderate evidence.** Federal guidance strongly favors purpose/bottom line first; current UK appraisal guidance likewise emphasizes clear, transparent advice to decision-makers. citeturn20view7turn21view0 |
| Second | **Test basis** | State that results are **pre-production synthetic tests**, what workflow/version was tested, and the relevant number of cases. This prevents everything below from being mistaken for observed production performance. | 20–35 words | **Strong evidence.** NIST calls for documenting test sets and conditions, evaluating under conditions similar to deployment, and documenting limits on generalizability. citeturn20view1turn20view3 |
| Third | **Safety-critical result** | Report the outcome with the greatest downside first: e.g., wrong autonomous actions or wrong routes. Give the **count and denominator**, then explain the business consequence. Say “0 observed,” never “zero risk.” | 45–65 words | **Strong evidence.** NIST treats risk tolerance as context-specific, calls for risk prioritization and safe failure, and warns against extrapolating narrow assessments. citeturn20view0turn20view2turn20view5 |
| Fourth | **Usefulness vs. your target** | State the observed count, percentage, **client-owned target**, and whether the unrounded result met it. Keep observed result and target conceptually separate: “18 of 23, 78%; your target: 80%.” | 55–75 words | **Strong evidence.** Risk-communication evidence supports explicit numerical information and denominators; NIST says acceptable risk is set contextually by owners/organizations rather than by the framework. citeturn22search0turn20view0 |
| Fifth | **Automation vs. human review** | Explain where the unautomated cases went and why that matters. Distinguish **wrong action**, **correct automated action**, and **human referral** rather than combining them into one “accuracy” number. | 45–70 words | **Moderate evidence.** NIST explicitly recognizes human oversight and safe failure as risk controls; risk communication guidance recommends explaining the nature of a risk, not merely assigning labels such as “high” or “low.” citeturn20view2turn18search4 |
| Sixth | **Decision required** | Give two or, when genuinely useful, three viable choices. State your recommendation separately from the alternatives, its rationale, and the trade-off the owner would be accepting. | 60–90 words | **Strong evidence, transferred context.** The 2024 Cochrane review of 209 decision-aid studies found decision aids improve knowledge, expectations of benefits/harms, participation, and clarity about what matters; UK appraisal guidance calls for genuine options, transparent trade-offs, and a stated preferred option. The direct evidence is healthcare rather than SMB technology procurement, so transfer should be cautious. citeturn23search2turn21view1turn21view2 |
| Seventh | **Limits and pilot conditions** | State two or three limitations that could change the decision, plus the controls the pilot should retain—for example, human review of referrals and measurement of wrong actions. Do not append a generic AI disclaimer. | 50–80 words | **Strong evidence.** NIST calls for generalizability limits to be documented and warns that pre-deployment tests may not reflect deployment contexts. Model-card practice similarly separates intended uses, evaluation data, metrics, and out-of-scope conditions. citeturn20view1turn20view4turn20view10 |

A practical total is roughly **320–480 words plus a title and small metadata line**. **Expert opinion.** That is short enough to preserve the one-page decision-document character while leaving room for the distinctions that matter here.

A particularly important structural principle is **safety before usefulness**. When wrong autonomous action has a materially larger cost than referral to a human, presenting a single aggregate success/accuracy figure hides the decision-relevant asymmetry. NIST's framework specifically treats risk tolerances as use-case-specific and calls for attention to residual negative risk and safe failure. citeturn20view0turn20view2

A second important principle is **put the synthetic-test qualifier near the results, not only in fine print at the end**. Federal guidance generally recommends main point before exceptions, but also says conditions belong where readers can absorb them most easily; in this case, the condition changes what every result means. NIST is unusually explicit that narrow pre-deployment assessments should not be extrapolated and that deployment-context mismatch is a known limitation. citeturn20view8turn20view4turn20view5

## B. Top 10 writing rules, each with its supporting source

| Writing rule | Evidence and rationale |
|---|---|
| **Put the decision and bottom line at the top.** | **Moderate evidence.** U.S. federal plain-language guidance says to start with the document's purpose and bottom line and put the most important information first. Digital.gov likewise recommends up-front summaries and organization around audience needs. citeturn20view7turn24view0 |
| **Always identify the evidence as synthetic, pre-production testing adjacent to the results.** | **Strong evidence.** NIST says test sets and evaluation conditions should be documented, generalizability limits disclosed, and narrow or anecdotal assessments not extrapolated into broader performance claims. citeturn20view1turn20view5 |
| **For an observed test result, lead with count + denominator; use the percentage second when it helps comparison.** Example: “18 of 23 cases (78%).” | **Moderate evidence.** Risk-communication reviews consistently emphasize clearly defined reference classes/denominators. Evidence does not establish one universally superior numeric format, making a transparent count plus a useful comparison percentage a defensible combination for this particular finite test set. citeturn22search0turn22search1 |
| **Keep denominators explicit and consistent. Do not casually convert results into “1 in X.”** | **Strong evidence in risk communication, transferred context.** The IPDAS risk-communication review recommends defined reference classes, consistent formats and denominators, and specifically cautions against “1 in x” formats with changing denominators. citeturn22search8turn22search12 |
| **Separate errors by consequence: wrong autonomous action ≠ referral to a person.** Do not bury both in a single “accuracy” score. | **Moderate evidence.** NIST says acceptable risk is use-case-specific and calls for systems to fail safely; CDC communication guidance says to explain the actual nature of a risk because qualitative labels alone can mean different things to different readers. citeturn20view0turn20view2turn18search4 |
| **Attribute the threshold to whoever owns it.** Write “your 80% target,” not “the required 80%,” unless it genuinely is a contractual or regulatory requirement. | **Strong evidence.** NIST explicitly states that its framework does not prescribe risk tolerance and that acceptable levels depend on the system owner, organization, application, policy and context. citeturn20view0 |
| **Use concrete business consequences instead of technical labels.** Prefer “sent to the wrong team” over “false positive,” and “sent to a person for review” over “abstention,” unless the client already uses those terms. | **Moderate evidence.** Digital.gov says plain language begins with the audience and recommends words the audience understands, active voice, clear organization and avoidance of jargon; federal guidance recommends short sentences containing one idea. citeturn24view0turn20view9 |
| **Use claim verbs that match the evidence: “observed,” “in these tests,” and “did not occur in the test set,” rather than “will,” “proves,” “safe,” or “production-ready.”** | **Strong evidence.** NIST's Generative AI Profile says capability claims should be empirically evaluated and specifically warns against extrapolating from narrow assessments; the AI RMF requires documentation of generalizability limits. citeturn20view3turn20view5turn20view1 |
| **Show genuine options, then make your recommendation explicit rather than disguising advocacy as a result.** | **Strong evidence, transferred context.** The 2024 Cochrane decision-aid review reports strong improvements in knowledge and participation when choices and consequences are made explicit. The 2026 Green Book says decision-makers should see genuine choices and that advisers should explain why the preferred option is recommended. citeturn23search2turn21view1turn21view2 |
| **Limit the limitations section to facts that alter interpretation or the pilot decision.** Put the key limitation close to the result; do not bury it, and do not fill the page with generic warnings. | **Strong evidence for disclosure; expert opinion for brevity.** NIST requires relevant generalizability and deployment-context limitations to be documented. Model Cards similarly organize documentation around intended use, out-of-scope uses, metrics, evaluation data, and factors affecting performance. citeturn20view1turn20view10 |

A useful plain-language test is not an arbitrary grade level. **Moderate evidence:** Digital.gov explicitly warns against “dumbing down” material to a nominal reading grade and instead recommends writing for the actual audience's knowledge and needs. For a business owner, the goal should therefore be *business-native language*, not childlike language. citeturn24view0

## C. Communicating uncertainty and small samples: guidance plus 3 to 5 example phrasings

**Use counts as the primary description of what you actually observed — Moderate evidence.** “18 of 23” directly exposes the evidence base. A percentage such as 78% is useful immediately afterward because owners may need to compare it with an 80% target. The denominator should never disappear. Risk-communication guidance strongly favors explicit reference classes and consistent denominators. citeturn22search0turn22search12

**Do not treat the percentage as more precise than the test — Expert opinion, supported by risk-communication evidence.** With 23 cases, one case changes the observed automation percentage by about 4.35 percentage points: 18/23 is 78.3%, while 19/23 is 82.6%. Reporting “78.3%” therefore creates more apparent precision than the decision requires. “18 of 23 (78%)” makes both the estimate and its fragility visible.

**Percentages versus natural frequencies: the literature does not justify a blanket rule — Strong evidence.** A 2011 Cochrane review found natural frequencies better understood than percentages in the diagnostic and screening tasks it studied. However, it included no policymakers, and its evidence concerned health diagnostic/screening contexts. A broader 2014 systematic review covering 91 studies found comparisons of frequencies such as “1 in 5” with percentages such as “20%” **inconclusive**. Separately, the IPDAS review recommends avoiding “1 in x” formulations with variable denominators because they can impede comparisons and distort perceptions. citeturn18search0turn22search1turn22search8

That disagreement matters here. For your memo, **“5 of 23 test cases were referred to a person” is preferable to “about 1 in 5 was referred” — Moderate evidence.** The former reports the actual finite test result; the latter transforms it into a population-sounding frequency and throws away information about the small denominator. “1 in 5” may be intuitive in some contexts, but it should not replace the original observed count. citeturn22search8turn22search1

**Do not automatically add a confidence interval to a hand-designed synthetic test set — Expert opinion.** A conventional sampling interval answers a question about repeated sampling from a defined population or stochastic process. A deliberately constructed suite of edge cases, representative scenarios and synthetic examples usually does not have that interpretation. NIST's emphasis on data representativeness, suitability, deployment similarity and generalizability is the more important issue here: a statistically neat interval cannot repair a mismatch between a synthetic suite and real operating conditions. citeturn20view1turn20view6turn20view4

Where test cases actually **are** sampled according to a defensible, pre-specified distribution, a statistical interval can be a secondary aid. **Moderate evidence.** But it should be explained as sampling uncertainty only—not as a range for future production performance. Pre-deployment-to-deployment uncertainty remains separate. citeturn20view4

A helpful mental model is to distinguish at least two different uncertainties:

**Small-set uncertainty** asks, “Would the observed rate move if we tested more cases?”  
**Deployment uncertainty** asks, “Are real cases, users, integrations and operating conditions like the test environment?”

NIST directly emphasizes the second problem, including the possibility that pre-deployment evaluations fail to reflect actual deployment contexts. citeturn20view4turn20view5

Recommended example phrasings:

> **“Safety-critical result: 0 of 37 synthetic test cases were routed to the wrong destination. No wrong routes were observed in this test set; this does not mean the production error rate is zero.”**  
> **Strong evidence.** This preserves the actual observation while avoiding extrapolation from narrow testing. citeturn20view1turn20view5

> **“Usefulness: 18 of 23 test cases were handled without human review (78%). Your target is 80%, so this test set was 2 percentage points below target. One additional automated case would have changed the result to 83%.”**  
> **Moderate evidence.** The count preserves the denominator; the percentage makes the target comparison easy; the final sentence makes the small denominator tangible without statistical jargon. citeturn22search0turn22search1

> **“Human review: 5 of 23 cases were sent to a person. In these tests, those cases reduced automation rather than producing a wrong autonomous action.”**  
> **Moderate evidence.** This communicates the consequence of the fallback instead of treating every non-automated case as equivalent to an error. citeturn20view2turn18search4

> **“These were synthetic pre-production cases, not live customer work. The results show how this version behaved on the tested scenarios; they do not forecast its production error or automation rate.”**  
> **Strong evidence.** This is closely aligned with NIST's warning against extrapolation and requirement to document generalizability limits. citeturn20view1turn20view5

> **“Because the test set is small, treat 78% as the observed test result rather than a precise estimate of future performance. The pilot is the next opportunity to measure performance on real work.”**  
> **Moderate evidence.** The first sentence avoids spurious precision; the second appropriately distinguishes pre-deployment evaluation from post-deployment monitoring. citeturn20view4turn21view2

One presentation choice I would **not** recommend is:

> “The system has a 0% wrong-routing rate and a 78% automation rate.”

That wording converts finite observations into properties of “the system.” **Strong evidence:** NIST expressly warns against extrapolating performance from narrow assessments. citeturn20view5

## D. Framing the decision ask: guidance plus 2 to 3 example phrasings

**Make three things visibly separate: evidence, client criterion, and your recommendation — Strong evidence.** This prevents a recommendation from masquerading as an objective test result. NIST leaves acceptable risk to the relevant organization/context, while government appraisal guidance distinguishes the decision-maker's objectives from the adviser's evidence-based recommendation. citeturn20view0turn21view0

For example:

**Evidence:** 18 of 23 automated, 5 referred, 0 specified wrong-route events observed.  
**Client criterion:** 80% automation target.  
**Adviser recommendation:** Pilot as-is / do not pilot / do more testing.

That distinction is especially important when the target is missed. **Strong evidence:** do not silently redefine a client's 80% target into “close enough.” Instead, say it was missed and explain why you nevertheless do or do not recommend proceeding. The choice about whether that trade-off is acceptable remains with the owner; this fits NIST's contextual risk-tolerance model. citeturn20view0

**Offer genuine choices, but keep them proportionate — Moderate evidence.** The 2026 Green Book emphasizes genuine alternatives rather than a predetermined outcome and transparent explanation of why a preferred option is preferred. The 2024 Cochrane decision-aid review, although health-specific, gives strong evidence that explicitly structuring decisions, options, benefits/harms and values improves informed participation. citeturn21view1turn23search2

For your particular decision, two alternatives are often enough:

**Pilot as tested**, with its existing human-review fallback; or  
**Do not pilot as tested**, and make further changes/testing first.

A third option—such as a pilot with stricter human review—belongs there only when it is truly available. **Expert opinion.** Inventing a middle option merely to look balanced makes the memo less decision-useful.

**A recommendation is not improper steering when the recommendation is explicitly labeled and the evidence and alternatives remain visible — Moderate evidence.** Current UK appraisal guidance specifically calls for objective and impartial advice *and* a preferred option with reasons. In other words, neutrality does not require refusing to advise; it requires making the reasoning auditable. citeturn21view0turn21view2

Recommended example phrasings:

> **“Decision: Do you want to run a limited pilot of this version with human review retained for referred cases? I recommend yes. The reason is that no wrong routes were observed in the 37 synthetic safety cases, while the usefulness test reached 18 of 23 automated cases (78%), just below your 80% target. A yes means accepting that shortfall for the purpose of learning from a controlled pilot.”**  
> **Moderate evidence.** The recommendation is visible, the missed target is not softened, and the owner sees what acceptance means. citeturn20view0turn21view2

> **“Your automation target is 80%; this test set produced 78% (18 of 23). The choice is whether that shortfall is acceptable for a limited pilot given that the five unautomated cases were referred for human review rather than handled automatically. My recommendation is [pilot / make changes first] because [specific decision-relevant reason].”**  
> **Strong evidence for target ownership and explicit choice; expert opinion for wording.** citeturn20view0turn23search2

> **“Options: (A) pilot this version with the current review fallback, or (B) pause and continue development before exposing it to production work. I recommend A. This is not a finding that the system is ‘production-safe’; it is a recommendation that the remaining uncertainty is appropriate to investigate under the stated pilot controls.”**  
> **Moderate evidence.** This makes a pilot what it should be—a controlled next stage of evidence gathering rather than a declaration that uncertainty has disappeared. NIST distinguishes pre-deployment testing from production monitoring and highlights deployment-context uncertainty. citeturn20view1turn20view4

One wording distinction is particularly valuable:

- **“Met the test criterion of zero wrong routes in 37 cases”** can be legitimate when zero wrong routes was a predefined test criterion.
- **“The system is safe”** is materially broader and is not justified by that result alone.

**Strong evidence.** NIST ties safety to context, residual risk, controls and ongoing evaluation—not one narrow metric. citeturn20view2turn20view5

## E. Common mistakes to avoid

| Mistake | Better practice | Evidence |
|---|---|---|
| **“0 errors” becomes “zero risk” or “safe.”** | Say **“0 of 37 observed”** and retain the synthetic-test qualifier. | **Strong evidence.** NIST warns against extrapolation from narrow tests and requires documentation of generalizability limits. citeturn20view1turn20view5 |
| **Reporting “78%” without “18 of 23.”** | Keep the denominator visible so the owner can see the amount of evidence behind the percentage. | **Moderate evidence.** Risk-communication guidance emphasizes explicit reference classes and denominators. citeturn22search0turn22search12 |
| **Converting 5 of 23 into “about 1 in 5” as the primary result.** | Report the actual finite count. Use a natural-frequency analogy only if it genuinely improves understanding and does not replace the original result. | **Moderate evidence.** Evidence comparing frequencies and percentages is mixed; IPDAS specifically warns against “1 in x” with changing denominators. citeturn22search1turn22search8 |
| **Combining wrong actions and safe referrals into one “accuracy” or “failure” percentage.** | Show the outcomes separately because their business costs differ. | **Moderate evidence.** NIST emphasizes context-specific risk and safe failure. citeturn20view0turn20view2 |
| **Presenting synthetic tests as a forecast of production performance.** | Use “in these synthetic tests” and explicitly say the pilot will measure real operating performance. | **Strong evidence.** NIST says deployment-context mismatch can make pre-deployment tests inadequate and advises against narrow-test extrapolation. citeturn20view4turn20view5 |
| **Rounding a miss into a pass.** For example, turning 79.6% into “80%, target met” because the display rounds to 80%. | Determine pass/fail on the **unrounded source value**, then round only for display. | **Expert opinion.** This is a data-integrity control rather than a separately researched communication rule. |
| **Writing “nearly met target” instead of plainly saying it missed.** | Say “78%, versus your 80% target,” then let the recommendation explain whether the shortfall is acceptable. | **Strong evidence for separating facts from risk tolerance.** citeturn20view0turn21view0 |
| **Making the client's threshold look universal.** | Label its provenance: “your target,” “contract requirement,” “regulatory requirement,” etc. | **Strong evidence.** NIST does not prescribe universal risk tolerance. citeturn20view0 |
| **Attaching a statistical confidence interval to a hand-curated synthetic suite merely because the sample is small.** | First ask whether there is a defensible sampling process/population. Otherwise communicate the observed count, test scope and deployment uncertainty directly. | **Expert opinion grounded in NIST's representativeness/generalizability requirements.** citeturn20view1turn20view6 |
| **Using vague probability adjectives—“low risk,” “high confidence,” “very reliable”—without explaining what happened.** | Give the event and its consequence: “0 wrong routes in 37 tests,” “5 cases sent to a person.” | **Moderate evidence.** CDC warns that qualitative risk descriptors are interpreted differently and should not stand alone. citeturn18search4 |
| **Burying the synthetic-test limitation in a footer.** | Put the test basis immediately before or alongside headline results; reserve the final limits section for additional decision-relevant limitations. | **Strong evidence.** Federal guidance favors prominent main information; NIST makes test conditions central to interpreting performance. citeturn20view7turn20view1 |
| **Dumping every conceivable AI caveat into “Limitations.”** | Include only limitations that affect interpretation, risk or the pilot design. | **Moderate evidence / expert opinion.** NIST and Model Cards support relevant limitations and intended/out-of-scope-use disclosure; brevity and prioritization are the design judgment. citeturn20view10turn20view1 |
| **Presenting the recommendation as though the data dictated it automatically.** | Separate “what happened,” “the client's threshold/risk appetite,” and “my recommendation.” | **Strong evidence.** NIST makes risk tolerance contextual; appraisal guidance separates objectives from adviser recommendations. citeturn20view0turn21view0 |
| **Letting the language model both generate and certify factual correctness.** | Use deterministic checks against structured source data for numbers and rule-governed claims, plus human approval for judgment. | **Strong evidence for the underlying failure risk; moderate evidence for this control architecture.** LLM-generated summaries can hallucinate, and TofuEval found LLM factuality judges could be outperformed by specialized non-LLM metrics. citeturn19view4turn18search2 |
| **Giving the drafting model messy tables and expecting it to reconstruct the schema correctly.** | Normalize the input into explicit atomic fields before generation. | **Strong empirical evidence for the failure mode.** A NAACL 2024 table-to-text study found factual errors associated with problematic/nonstandard inputs; correcting inputs reduced factual errors by 52%–76% across the studied models. citeturn19view5 |

## F. Automation notes: classify each section as fixed, data-driven, or human judgment; list language-model failure modes and a check for each

Your proposed architecture—**structured results → LLM draft → deterministic verification → human approval**—is well aligned with the available evidence. **Strong evidence for the need; moderate evidence for this exact implementation.** Abstractive-generation research repeatedly documents unsupported factual content, table-to-text work shows source structure can cause factual errors, and NIST recommends both automated evaluation/fact checking and human oversight rather than treating generation as self-validating. citeturn19view4turn19view5turn20view6

The key design principle is:

> **Let code own facts; let the model own phrasing; let a human own judgment.**

**Expert opinion**, but strongly motivated by the failure literature above.

| Memo section | Primary classification | What should be automated |
|---|---|---|
| **Decision at a glance** | **Human judgment** | Fixed sentence structure is fine, and factual inputs should come from verified fields. But the actual recommendation should be explicitly supplied or approved by a human rather than inferred freely from numbers. **Moderate evidence.** Decision guidance treats preferred options as judgment informed by evidence, while NIST leaves acceptable risk contextual. citeturn21view0turn20view0 |
| **Test basis** | **Data-driven** | Render from fields such as test type, workflow/version, number of cases, date and scope. Use a mandatory fixed qualifier such as “synthetic pre-production tests.” **Strong evidence.** citeturn20view1turn20view5 |
| **Safety-critical result** | **Data-driven** | Code computes count, denominator and criterion status. The LLM may turn approved facts into a plain sentence but should not calculate them or promote “0 observed” into “safe.” **Strong evidence.** citeturn20view2turn20view5 |
| **Usefulness vs. your target** | **Data-driven** | Code computes count, percentage, rounding and target comparison. Target provenance should be a separate field such as `target_owner = client`. **Strong evidence for target ownership; expert opinion for implementation.** citeturn20view0 |
| **Automation vs. human review** | **Data-driven** | Outcome categories should be typed in the source schema—e.g., `correct_auto`, `human_referral`, `wrong_action`—rather than reconstructed from prose. **Moderate evidence.** NIST's safe-failure framing makes these categories decision-relevant. citeturn20view2 |
| **Decision required** | **Human judgment** | The available options can be templated; the recommended option and rationale should be human-supplied or explicitly human-approved. **Moderate evidence.** citeturn21view0turn21view2 |
| **Limits and pilot conditions** | **Human judgment** | Maintain mandatory fixed limits—at minimum, “synthetic/pre-production; not observed production performance”—then let the reviewer select additional workflow-specific limits and controls. **Strong evidence for mandatory disclosure; expert opinion for selection process.** citeturn20view1turn20view4 |

In other words, **very little of the memo should be “free generation.”** The sentence forms can vary, but claims should come from a constrained set of source-backed propositions. **Moderate evidence.** NIST recommends ground-truth comparison, human and automated evaluation, fact-checking and provenance checks; Model Cards demonstrate a documentation pattern built around explicit fields such as intended use, evaluation data, metrics and limitations. citeturn20view6turn20view10

A useful source object might therefore distinguish raw facts from interpretation:

`test_basis`, `safety_outcomes`, `usefulness_outcomes`, `review_outcomes`, `client_target`, `target_status`, `required_limits`, `available_options`, `human_recommendation`, and `human_rationale`.

**Expert opinion.** The important architectural property is that the recommendation is not silently generated from the metrics and that every quantitative assertion can be traced to one structured field.

Known failure modes and appropriate controls:

| LLM/reporting failure mode | What it looks like in your memo | Check that catches it | Evidence |
|---|---|---|---|
| **Invented number** | “19 of 23” when source says 18 | Reject every numeral/percentage not present in an approved source or approved derived-value registry. | **Strong evidence.** Hallucinated content is well documented in abstractive summarization. citeturn19view4 |
| **Altered or miscalculated percentage** | 18/23 described as 82% | Compute every derived value in code; the LLM receives both count and approved display percentage and never performs arithmetic. | **Strong evidence for failure risk; expert opinion for control.** Table-to-text systems produce factual errors, especially under problematic input structures. citeturn19view5 |
| **Wrong denominator** | “18 of 37 automated” after mixing the safety and usefulness test sets | Give every metric an explicit metric ID and denominator; enforce count/denominator relationships before and after generation. | **Strong evidence for denominator clarity; expert opinion for check.** citeturn22search0turn22search12 |
| **Target comparison error** | “Met the 80% target” at 78%, or pass caused by display rounding | Compute `target_met` deterministically from unrounded values. The LLM receives the boolean/status text rather than deriving it. | **Expert opinion.** |
| **Category collapse** | Treating human referrals as failures, or treating them as fully automated successes | Use mutually exclusive typed outcomes and deterministic reconciliation: totals must add correctly. | **Moderate evidence.** Outcome consequences differ under NIST's safe-failure/risk framing. citeturn20view2 |
| **Unsupported generalization** | “The workflow achieves 78% automation” | Require test-scope grammar: e.g., any headline metric must occur with “in testing,” “in this test set,” or an equivalent approved qualifier. Flag production-wide verbs. | **Strong evidence.** NIST explicitly cautions against extrapolating narrow assessments. citeturn20view5 |
| **Zero-event overclaim** | “The workflow is safe” after 0/37 wrong routes | Business rule: `wrong_action_count == 0` permits “none observed,” never automatically permits “safe,” “zero risk” or “cannot.” | **Strong evidence.** citeturn20view2turn20view5 |
| **Dropped caveat** | Final prose omits that tests were synthetic | Required-field assertion: draft fails if synthetic/pre-production basis and production limitation are absent. | **Strong evidence.** NIST requires test conditions/generalizability limitations to be documented. citeturn20view1 |
| **Modality shift** | Source says “could reduce” or “may support”; draft says “will reduce” | Flag changes from observational/conditional vocabulary to certainty vocabulary. Require evidence-linked approved claim verbs. | **Strong evidence for the failure class.** TofuEval's error taxonomy includes modality errors, such as changing a possible outcome into something that has occurred. citeturn18search5 |
| **Unsupported inference** | “Because 0 routes were wrong, customers will trust the system” | Every factual or causal sentence needs a source-field ID; sentences with no provenance are either clearly labeled recommendations/judgments or rejected. | **Strong evidence for the failure class.** TofuEval documents reasoning errors and extrinsic information in generated summaries. citeturn18search2turn18search5 |
| **Messy-input hallucination** | Model associates a target or count with the wrong metric because the source table is irregular | Validate/normalize the structured input before prompting; use explicit field names rather than a visually formatted spreadsheet dump. | **Strong evidence.** Fixing input problems reduced factual errors 52%–76% in a NAACL table-to-text study. citeturn19view5 |
| **Recommendation invented by the model** | Numbers support several choices, but the LLM declares “Proceed” | Recommendation must be a human-controlled input field or require explicit human selection after drafting. | **Moderate evidence / expert opinion.** Risk tolerance is contextual and owner-specific rather than derivable from NIST's framework. citeturn20view0 |
| **Same-model self-validation** | Drafting LLM says its own summary is factual | Use deterministic checks for deterministic facts and a human for judgment; an LLM-based semantic checker may be supplementary, not the sole gate. | **Strong evidence for caution.** TofuEval found tested LLMs performed poorly as binary factual evaluators and could be outperformed by specialized non-LLM metrics. citeturn18search2 |

A particularly strong implementation is a **claim whitelist**. **Expert opinion, supported by NIST and factuality research.** Before prose generation, your program creates approved facts such as:

- `wrong_routes = 0/37`
- `automated = 18/23`
- `automation_pct_display = 78%`
- `client_target = 80%`
- `target_met = false`
- `human_referrals = 5/23`
- `test_basis = synthetic_preproduction`
- `production_performance_observed = false`

The model's job is then to **render**, not discover, those facts. NIST's GAI Profile supports comparing output with known ground truth and using both automated evaluation and human oversight, while the table-to-text evidence supports normalizing inputs before generation. citeturn20view6turn19view5

Your numerical validator should also check **relationships**, not merely literal number presence. **Expert opinion.** For example:

`18 + 5 = 23`;  
`round(18 / 23 × 100) = 78`;  
`18 / 23 < 0.80`;  
all displayed denominators belong to the correct test set;  
and the pass/fail comparison uses the raw value rather than the rounded display value.

Finally, use a **human approval gate for semantic scope**, not just aesthetics. **Strong evidence for human oversight; expert opinion for workflow.** Numbers can all be correct while the memo still makes the false claim that synthetic results establish production performance. NIST explicitly recommends a combination of ground-truth evaluation, automated evaluation and human oversight, and its GenAI Profile recommends sharing pre-deployment results with actors who hold release-approval authority. citeturn20view6turn20view3

## G. Review checklist: 10 to 15 yes/no questions for judging any draft of this memo

A draft should not pass review unless the applicable answers are **Yes**.

| Yes/no review question | Evidence |
|---|---|
| **Is the decision or recommendation understandable from the first two or three sentences?** | **Moderate evidence.** Federal plain-language guidance recommends purpose and bottom line first. citeturn20view7 |
| **Does the memo clearly say that the evidence comes from synthetic, pre-production testing rather than live production use?** | **Strong evidence.** citeturn20view1turn20view5 |
| **Does every important percentage show, or sit immediately beside, its count and denominator?** | **Moderate evidence.** citeturn22search0turn22search12 |
| **Have all counts, denominators, percentages, totals and derived comparisons been deterministically checked against the structured source?** | **Strong evidence for the need; expert opinion for this control.** citeturn19view4turn19view5 |
| **Are high-cost wrong actions reported separately from referrals to human review and other lower-cost outcomes?** | **Moderate evidence.** citeturn20view0turn20view2 |
| **If zero failures were observed, does the language say “zero observed” rather than imply zero future risk?** | **Strong evidence.** citeturn20view5 |
| **Is the target clearly attributed—for example, “your 80% target”—and is met/missed status calculated using the unrounded result?** | **Strong evidence for attribution; expert opinion for unrounded comparator.** citeturn20view0 |
| **Does the memo explain in business terms what happens when the AI does not act—for example, that the case goes to a person?** | **Moderate evidence.** CDC recommends explaining the actual nature and consequence of risk, not just labeling it. citeturn18search4 |
| **Are the available options real, materially different and described consistently enough to compare?** | **Strong evidence, transferred context.** citeturn21view1turn23search2 |
| **Is the recommendation visibly separate from the observed results and the client's target/risk tolerance?** | **Strong evidence.** citeturn20view0turn21view0 |
| **Does the recommendation explain what trade-off the owner would be accepting, rather than merely saying “proceed” or “do not proceed”?** | **Moderate evidence.** Appraisal guidance emphasizes costs, benefits, risks and trade-offs among alternatives. citeturn21view0turn21view2 |
| **Are the limitations specific to this test and consequential to the decision, rather than generic AI disclaimers?** | **Strong evidence for relevance/scope; expert opinion for filtering.** citeturn20view1turn20view10 |
| **Is every claim about future or production behavior either removed, explicitly qualified, or supported by production evidence?** | **Strong evidence.** citeturn20view4turn20view5 |
| **Is the memo written in the owner's language—short sentences, active voice, familiar business terms, no unexplained ML terminology?** | **Moderate evidence.** citeturn24view0turn20view9 |
| **Has a human reviewer explicitly approved the recommendation, claim scope, limitations and final client-facing version after the automated factual checks passed?** | **Strong evidence for human oversight; expert opinion for this exact approval workflow.** NIST recommends human oversight together with automated evaluation and fact-checking. citeturn20view6 |

A useful final human test is: **Can the owner answer four questions after one page—What happened in testing? What did not happen? What am I deciding? What uncertainty am I accepting?** **Expert opinion.** If any answer requires you to explain the memo verbally, the memo is not yet doing its job.

## H. Sources: title, URL, and type (peer-reviewed, government, standards body, practitioner, or vendor)

| Title | URL | Type |
|---|---|---|
| **Artificial Intelligence Risk Management Framework (AI RMF 1.0)**, NIST | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf | **Standards body** |
| **Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1)** | https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf | **Standards body** |
| **AI Risk Management Framework**, NIST current program page. As of September 2026, NIST states that AI RMF 1.0 is undergoing revision; this report therefore relies on the currently published AI RMF 1.0 and Generative AI Profile rather than assuming an unreleased revision. citeturn19view6 | https://www.nist.gov/itl/ai-risk-management-framework | **Standards body** |
| **Federal Plain Language Guidelines**, March 2011, Rev. 1 May 2011 | https://ies.ed.gov/sites/default/files/rel-central/document/2024/10/Federal%20Plain%20Language%20Guidelines.pdf | **Government** |
| **Principles of Plain Language**, Digital.gov / U.S. General Services Administration | https://digital.gov/guides/plain-language/principles | **Government** |
| **The CDC Clear Communication Index** | https://www.cdc.gov/ccindex/index.html | **Government** |
| **Description and Examples of Index Items: Part D — Risk**, CDC Clear Communication Index | https://www.cdc.gov/ccindex/tool/description-examples-partd.html | **Government** |
| **Presenting Quantitative Information about Decision Outcomes: A Risk Communication Primer for Patient Decision Aid Developers**, Trevena et al., 2013 | https://doi.org/10.1186/1472-6947-13-S2-S7 | **Peer-reviewed** |
| **Evidence-Based Risk Communication: A Systematic Review**, Zipkin et al., *Annals of Internal Medicine*, 2014 | https://doi.org/10.7326/M14-0295 | **Peer-reviewed** |
| **Using Alternative Statistical Formats for Presenting Risks and Risk Reductions**, Akl et al., Cochrane Database of Systematic Reviews, 2011 | https://doi.org/10.1002/14651858.CD006776.pub2 | **Peer-reviewed** |
| **Scope, Methods, and Overview Findings for the Making Numbers Meaningful Evidence Review of Communicating Probabilities in Health: A Systematic Review**, Ancker et al., 2025 | https://doi.org/10.1177/23814683241255334 | **Peer-reviewed** |
| **Decision Aids for People Facing Health Treatment or Screening Decisions**, Stacey et al., Cochrane Database of Systematic Reviews, updated 2024 | https://doi.org/10.1002/14651858.CD001431.pub6 | **Peer-reviewed** |
| **The Green Book (2026)**, HM Treasury | https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government/the-green-book-2026 | **Government** |
| **Model Cards for Model Reporting**, Mitchell et al., FAT* 2019 | https://doi.org/10.1145/3287560.3287596 | **Peer-reviewed** |
| **On Faithfulness and Factuality in Abstractive Summarization**, Maynez et al., ACL 2020 | https://aclanthology.org/2020.acl-main.173/ | **Peer-reviewed** |
| **Improving Factual Accuracy of Neural Table-to-Text Output by Addressing Input Problems in ToTTo**, Sundararajan, Sripada & Reiter, NAACL 2024 | https://aclanthology.org/2024.naacl-long.408/ | **Peer-reviewed** |
| **TofuEval: Evaluating Hallucinations of LLMs on Topic-Focused Dialogue Summarization**, Tang et al., NAACL 2024 | https://aclanthology.org/2024.naacl-long.251/ | **Peer-reviewed** |
| **GPT-4o System Card**, OpenAI | https://openai.com/index/gpt-4o-system-card/ | **Vendor** |

The main evidence gap is worth making explicit: **I found no verified research directly testing competing one-page memo structures—Minto Pyramid versus BLUF versus another executive-summary format—for owners of small and mid-sized businesses deciding whether to pilot an AI-assisted workflow.** The strongest recommendations above therefore combine three better-established bodies of evidence: federal/plain-language guidance on information order and wording; risk- and decision-communication research on numerical presentation and choice architecture; and AI transparency/risk-management guidance on test scope, generalizability, human oversight and claim discipline. Recommendations that go beyond those sources—especially exact section word counts, the proposed claim-whitelist architecture, and when to omit formal confidence intervals for curated synthetic suites—are accordingly marked **expert opinion**, rather than presented as research-proven.