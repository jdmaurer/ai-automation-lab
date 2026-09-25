I run a small AI implementation consultancy for small and mid-sized businesses. After I build and test an AI-assisted workflow for a client, I deliver a one-page evaluation summary to the business owner. The owner is not technical. Their decision is whether to run a pilot of the system as it is.

Typical content: a safety result (for example, "0 wrong routes in 37 test cases"), a usefulness result against a target (for example, "18 of 23 handled automatically, 78 percent vs an 80 percent target"), the trade-off between automation and human review, a decision the owner must make, and plain-language limits. Results come from synthetic test cases, not production use.

I will automate the drafting of these summaries: a language model drafts from structured test results, automated checks verify every number against the source data, and I review and approve before anything reaches a client. I need evidence-based guidance for both the document and the automation.

RESEARCH GOALS

1. Structure. What is the best-supported structure for a one-page decision memo to a non-technical executive (for example, bottom line up front, Minto pyramid, decision briefs)? Which sections, in what order, and why?
2. Presenting AI evaluation results. How should safety and usefulness results be presented to non-technical decision-makers, especially when errors have unequal costs (a wrong action is worse than a referral to a human)?
3. Uncertainty and small samples. How do you communicate honestly about small test sets and uncertainty in plain language? Compare counts ("18 of 23"), percentages, natural frequencies ("about 1 in 5"), and ranges. What does risk-communication research say?
4. The decision ask. How should options and a recommendation be framed so the owner makes a real choice without being steered? How should the memo handle a target the client owns?
5. Claim discipline. How do you avoid overclaiming, such as test results presented as real-world performance? Include relevant guidance from AI transparency frameworks (for example, NIST AI RMF and its Generative AI Profile, model cards, system cards).
6. Limitations. How should limitations be stated so they inform the decision without burying it or alarming the reader?
7. Plain language. What are the best-supported practices for translating technical concepts for business owners (for example, US federal plain-language guidelines)?
8. Automation readiness. Which parts of such a memo can be a fixed template, which are filled from data, and which need human judgment? What are the known failure modes when language models draft data-based reports (invented or altered numbers, overclaiming, dropped caveats), and what checks catch them?

OUT OF SCOPE: technical machine-learning evaluation methods, long-form reports, marketing copy.

REQUIRED OUTPUT FORMAT (use exactly these sections, in this order)

A. Recommended section structure: section names, order, purpose of each, and target length.
B. Top 10 writing rules, each with its supporting source.
C. Communicating uncertainty and small samples: guidance plus 3 to 5 example phrasings.
D. Framing the decision ask: guidance plus 2 to 3 example phrasings.
E. Common mistakes to avoid.
F. Automation notes: classify each section as fixed, data-driven, or human judgment; list language-model failure modes and a check for each.
G. Review checklist: 10 to 15 yes/no questions for judging any draft of this memo.
H. Sources: title, URL, and type (peer-reviewed, government, standards body, practitioner, or vendor).

RULES
- Mark each recommendation as strong evidence, moderate evidence, or expert opinion.
- Do not invent sources. If you cannot verify a source, say so.
- Where credible sources disagree, show both sides instead of picking one silently.
