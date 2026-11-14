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


## 2026-11-10 — Week 8 day 2

16. Use a Boolean `needs_owner_review` flag initialized to false. Deterministic and model-derived review conditions may turn it true; downstream work should not turn it back false.

17. Attachment presence is a deterministic review trigger but is not, by itself, a draft blocker. Attachment contents are not interpreted. This preserves the day-1 rule that important attachments require owner review without preventing a safe acknowledgment when the message itself supports one.

18. Use a custom structured classifier output with exactly these 11 fields: `category`, `priority`, `confidence`, `personal`, `sensitive`, `suspicious`, `adversarial`, `context_sufficient`, `custom_quote_needed`, `record_change_requested`, and `draft_candidate`.

19. Validate model output before using it. The first validation gate requires category to be one of Sales/Support/Finance/General/Internal/Unknown, priority to be Urgent or Routine, and confidence to be between 0 and 1. Invalid output goes to owner review and is not eligible for an ordinary draft.

20. Use 0.80 as a provisional pilot confidence threshold. A structurally valid result below 0.80 goes to owner review and is not eligible for an ordinary draft. This threshold was chosen during implementation, not pre-frozen in the case. Evaluate it against the frozen 30-message set and document any later change; never alter the frozen answer key merely to fit model behavior.

21. Treat model-action failure separately from invalid returned output. A failed, timed-out, or unavailable `Run a prompt` action must have an explicit fallback path to owner review before the flow is released; the existing validation False branch is not sufficient because it only runs when an output exists.


## 2026-11-11 - Week 8 working checkpoint and verification decisions

22. Keep owner-review triggers separate from draft blockers. Urgent priority, attachment presence, custom-quote need, and record-change requests may require owner review while still allowing a safe acknowledgment draft. Invalid or failed AI output, low confidence, Unknown, Finance, Internal, personal/sensitive/suspicious/adversarial content, insufficient context, or `draft_candidate=false` block an ordinary draft. Reason: review is a human-attention decision; draft eligibility is a separate safety decision.

23. Ground the reply drafter only in the normalized email record, the structured classification record, and the approved synthetic price sheet. Standard listed products use the exact approved base price; custom work receives no invented price. Drafts must not claim an attachment was inspected or that an action, timing, refund, reprint, record change, or production change has already happened unless the workflow actually performed it.

24. Treat AI Builder prompt edits as a deployment-risk event. After every save to a shared classifier or drafter prompt, inspect the linked Power Automate action inputs before Save/Publish. Reason: prompt saves were observed resetting action input wiring during this build.

25. Do not manually run the entire frozen 30-message set by composing Outlook emails. Use a repeatable batch/evaluation harness for the full frozen set, and reserve live Outlook tests for representative end-to-end paths and targeted regression checks. Reason: manual composition is slow, error-prone, and does not scale as a regression method.

26. Preserve a verified working baseline before deliberate failure injection. Model-unavailable and wrong-schema tests must not be performed by casually breaking the only working flow. Prefer an isolated copy/test version after the baseline is exported or otherwise preserved.

27. Do not patch the Power Automate notification defect with one sender address. The design must handle automated/non-replyable/system/vendor/marketing mail as a general inbox class or policy, with a small synthetic test set defined before implementation. Reason: a real SME inbox will receive many automated senders, and some automated messages may still deserve owner attention even when they should never receive a reply draft.

28. Treat the current flow as a working checkpoint, not a release. Four representative live tests passed, but the frozen 30, duplicate behavior, model failure/wrong-schema tests, audit/correlation controls, feedback capture, and final export/handoff are still incomplete.

29. Stop the 2026-11-11 export attempt at the solution dependency warning. The flow is referenced by the existing `Bluffside Handbook Helper` solution, and the solution export warned that import will fail without dependent managed solutions in the target environment. Do not click through or claim a portable backup until the solution contents/dependencies and correct packaging path are inspected next session.

30. From this point forward, add implementation work only when it is required by the Week 8 calendar, fixes an observed defect, or is necessary to pass the frozen acceptance criteria. Reason: Week 8 has materially exceeded its intended time budget, and opportunistic feature growth would worsen the overrun without improving the evidence proportionally.

## 2026-11-12 — Normal-build sequence and automated-mail rule

31. Superseding decision 29's immediate-next-session export timing: finish and test required normal controls, run the repeatable frozen 30, fix ordinary defects, preserve/export the finished baseline, then perform isolated deliberate failure tests. Do not revisit the solution-export dependency warning now. Reason: Josh explicitly chose to finish the normal build before further packaging work.

32. Use existing draft_candidate rather than a sender-specific block or new category to suppress ordinary replies to automated/system notifications, vendor notices, receipts, newsletters, or marketing messages that do not call for a human reply. A genuine vendor question can still be a draft candidate; an automated alert can remain Urgent while receiving no ordinary reply draft. Three prompt-only checks passed; end-to-end confirmation remains required.

33. When Outlook access and connector/OAuth operations fail together, inspect official service health early before altering connection mappings. Preserve saved draft changes. November 12 troubleshooting did not establish which of the two existing Outlook solution references the trigger used; no reference edit/deletion is authorized by that evidence alone.


## 2026-11-13 — Recovery, traceability, and duplicate/resend controls (draft build)

34. After Outlook recovered, retry Publish before changing working connection mappings. Publication succeeded with no connection changes; AUTO-01 then passed live. Josh identified the simpler next step. Exact outage causality remains unproven.

35. Use a dedicated correlation Compose and a minimal Dataverse processing/review record. Store IDs, timestamps, classifications, statuses, and human feedback rather than email bodies/attachments. Start a record before AI processing and update that same Dataverse row with the outcome. Processing completion and human follow-up are separate.

36. Prevent exact-ID duplicates with an escaped Message ID lookup and a Succeeded Terminate when found, backed by a Message ID alternate key once its index is Active. Message ID is limited to 400 characters for that index; IDs must never be truncated. Key activation was subsequently confirmed Active; enforcement and concurrency/race behavior still require runtime proof.

37. Log invalid AI output and AI request failure as Failed/Unknown/no draft with owner review open. An AI-failure logging action must not run when its top-level failure path is skipped, or it could overwrite a successful result. This was checked in the draft definition. Failure logging still needs runtime verification.

38. Use a shared Boolean explicit-resend-language flag for the frozen DRI-10/DRI-15 requirement. It requires owner review, blocks a second draft, and records Possible Resend without discarding the new email. This is a bounded flagging rule, not historical semantic duplicate matching; unannounced paraphrased repeats remain outside its detection. Frozen runtime results are still pending.

39. Initialize owner-review follow-up as open when the workflow requires review or creates a draft awaiting review. Capture review outcome separately; only the owner decides whether follow-up is closed. Accepting a draft never sends it.


## 2026-11-14 — Observed storage repairs and partial-run recovery

40. Superseding decision 36's exact width: Message ID is now 401 characters after a minimal saved width change and publication resolved a rejected 152-character ID. The alternate key remains the chosen design; do not shorten IDs to hide write errors. Draft ID remains 4000 after a saved 4000 -> 3999 -> 4000 change and successful full-ID write/read. Displayed limits alone were not reliable proof of accepted storage; no specific backend cause was established.

41. When draft creation succeeds but completion logging fails, recover the actual result in the existing row and preserve Failed plus an assisted-recovery note. Do not replay that message to test repaired logging: its Message ID is already recorded and its draft exists. Use a fresh normal message for automatic completion verification. Owner review stays pending until Josh decides; manual recovery does not count as an end-to-end pass.
