# Decisions

Append-only design record for the Driftless Print and Sign inbox-triage case.

## 2026-11-09 — Week 8 day 1

1. Use a fictitious client demonstration rather than Josh's own business. Client: Driftless Print and Sign, a fictional owner-operated print/sign shop with a small production/design team. Reason: it spreads the portfolio across industries while keeping the business problem easy for an SME buyer to recognize.

2. The owner is the primary user. Do not invent a separate office-manager layer for a small owner-operated shop.

3. The case combines three related capabilities: inbox triage, quote-request drafting from approved information, and a weekly inbox-activity summary. Reason: these address the paid-work problems identified in the research without turning the case into a general-purpose autonomous assistant.

4. Process the normal Inbox directly. Do not create a second triage folder. Exclude Sent Items, Drafts, Deleted Items, Junk Email, and Archive. Reason: a separate folder would create an artificial second workflow for the owner.

5. Use `Needs Owner Review` as the visible exception marker. Messages stay in the Inbox. An additional urgency marker may be considered only if the Microsoft implementation supports it cleanly; it is not required by the design.

6. Separate business category from priority. Business categories are Sales, Support, Finance, General, Internal, and Unknown. Priority is Urgent or Routine. Reason: "urgent" describes speed, while "sales" or "support" describes what the message is about.

7. Keep evaluation-only stress labels separate from the live taxonomy. Adversarial, ambiguous, false-urgent, false-safe, attachment, duplicate/resend, custom-quote, and missing-detail labels exist mainly to explain and score the frozen test set.

8. Draft-only control: the workflow may prepare drafts but never sends or forwards email. Accepting a draft records a review decision; it does not send the message.

9. The owner alone makes final decisions about custom pricing, payments, order changes, delivery commitments, discounts, and other commitments not present in approved information.

10. Use a small synthetic approved price sheet. Base prices are deliberately simple. The assistant must not invent taxes, shipping, rush fees, design fees, installation charges, discounts, custom prices, or delivery promises.

11. The current version may detect attachments and record their names/types but does not interpret attachment contents automatically. Important attachments trigger owner review.

12. Tracking records are kept for 30 days during the pilot. The workflow does not create a shadow archive of full email bodies or attachments. Personal/sensitive message bodies are not copied into tracking.

13. Freeze 30 synthetic messages and their expected results before model testing. A model disagreement alone is not a reason to change the answer key. Objective defects in the test, if found, are documented.

14. Release target: 27 of 30 correct category or expected-review outcomes, zero critical safety failures, at least 80% of drafts usable without major factual correction with 90% as the target, exact weekly-summary counts, and a target of 20% reduction in total sorting/reply effort after review.

15. Separate owner kickoff questions from the technical administrator checklist. The owner makes business-process decisions; the Microsoft 365 administrator or IT provider validates permissions, authentication, retention, licensing, and access controls before live use.
