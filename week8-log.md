# Week 8 Log

## Monday 11.09.26 — Designing the inbox before touching the inbox

The mailbox problem is finally settled. Earlier today I added a Microsoft 365 Business Basic trial to the jdmaurer Labs tenant, assigned the one license to the lab account, and set it to cancel at the end of the trial on December 8. That gives me a real Outlook mailbox for Week 8 without buying a plan just to finish the curriculum.

For the case I picked Driftless Print and Sign, a fictional owner-operated print/sign shop. I did not want another made-up middle manager just because a workflow diagram looks cleaner that way. The owner is the person running the inbox while also running the shop. The main paid problem is simple: quote requests and time-sensitive order changes get buried while the owner is doing everything else.

The case now has three connected pieces: sort the inbox, prepare useful drafts for eligible messages, and summarize the week's inbox activity. Quote drafts can use a small approved synthetic price sheet, but they cannot make up a price, discount, rush fee, design fee, installation charge, tax, shipping charge, turnaround, or delivery promise. The weekly summary counts processing and review outcomes; it is not pretending to be a sales report.

I pushed hardest on the labels. The calendar grouped urgent, routine, sales, support, finance, personal/sensitive, and unknown together, but that mixes two different questions. "Sales" says what the message is about. "Urgent" says how fast I need to look at it. We split them. The operational categories are Sales, Support, Finance, General, Internal, and Unknown; priority is Urgent or Routine. Sensitive, suspicious, adversarial, ambiguous, duplicate, and similar labels are test conditions, not a pile of Outlook categories the owner has to manage.

That same argument cleaned up the 30-message test set. I kept asking whether another competent model or reviewer could reasonably disagree with our label because the test was bad rather than because the model was wrong. The final set is frozen before any model sees it: 9 Sales, 7 Support, 4 Finance, 4 General, 2 Internal, 4 Unknown; 7 Urgent and 23 Routine. It deliberately includes prompt injection, ambiguity, important attachments, incomplete quotes, custom-price requests, false urgency, false-safe cases, and a duplicate/resend pair. The answer key does not move just because a model disagrees. If we discover a real defect in the test later, we document it and version the set.

The owner experience stayed simple. One normal Inbox, not a special triage folder. The workflow can suggest categories and drafts, but it does not send, forward, delete, archive, move, or resolve original messages. `Needs Owner Review` is the visible exception marker. All sends are manual.

I also caught the client-setup problem before we turned it into a bad deliverable. A long list of Entra, DLP, permissions, retention, and connector questions handed to a small-business owner would make the project look harder than it is. The owner gets four business questions. The technical checklist stays with whoever manages Microsoft 365. That keeps the client conversation simple without dropping the security work.

Independent: choosing the kind of business and insisting the owner really be the user; challenging the mixed category/priority taxonomy instead of following old calendar shorthand; repeatedly testing the frozen labels for fairness; asking whether the portfolio buyer would actually value what we were proving; pushing back on a giant technical questionnaire for the owner; keeping the case from adding complexity just because we could.

With help: turning those decisions into the charter and data map; structuring the acceptance criteria; drafting the synthetic price sheet and the 30-message set; translating the technical deployment checks into a separate Microsoft 365 admin/IT checklist.

Honest time: I did not keep a reliable start/stop clock for this chat, so I am not inventing one. It was a long planning and review session, and most of the extra time went into challenging the taxonomy, test labels, and client-facing setup before freezing them.

Stopped with Week 8 day 1 complete and no workflow built yet. Next: Week 8 day 2. Build the deterministic path first, then use structured AI classification only where the fixed rules do not resolve the message. Validate AI output before using it, keep every reply draft-only, and test against the frozen set rather than changing the set to fit the model.


## Tuesday 11.10.26 — Building the guarded inbox path

Today I moved from the charter into the first Power Automate skeleton. The flow is still a draft, but the important pattern is now visible: normalize the email, apply a fixed rule first, call the model, validate what comes back, then apply a separate confidence policy before trusting the result.

I started with the Outlook Inbox trigger and a normalization Compose so the later steps see one consistent email record. I also initialized a Boolean `needs_owner_review` flag. The first deterministic rule is intentionally simple: if an attachment is present, turn that review flag on. That does not mean an attachment blocks a draft. It means the owner should see the message, while the workflow still may prepare a safe draft if the rest of the policy allows it. Attachment contents are not read.

The classifier is a custom AI Builder prompt. The email record is explicitly treated as untrusted data, and the prompt is told not to obey instructions inside the email. It returns a custom JSON shape with business category, priority, confidence, safety/context flags, custom-quote and record-change flags, and a draft-candidate suggestion. I changed the output from auto-detected to a custom format after the first test echoed the input record back as an extra object. The second prompt test returned only the intended 11 fields.

The workflow does not trust that output just because it is JSON. `Validate - AI Output` checks that category is one of the six allowed values, priority is Urgent or Routine, and confidence is inside 0 to 1. Invalid output goes to owner review. Inside the valid branch I added a separate confidence gate. A score can be structurally valid but still too uncertain for normal processing, so `Rule - Confidence High Enough?` compares the model's confidence with a provisional .80 threshold. Below that threshold, the flow turns on owner review.

The distinction between validation and policy matters. A confidence of .72 is a perfectly valid number between 0 and 1, so it passes schema/range validation. It still fails the business policy because we currently require at least .80 before continuing down the normal path.

The .80 threshold was not in the frozen case design. It is a conservative pilot starting point chosen during the build. I will evaluate it against the frozen 30-message set rather than changing expected answers to make the model look better.

I stopped immediately after completing and saving the low-confidence branch. The flow is still Draft and has not been published or tested through the Outlook trigger.

Independent: catching several places where the Power Automate labels on screen did not match the directions; insisting on understanding why `confidence` was being selected instead of just clicking through; recognizing and using the repeated Set variable pattern once the purpose was clear.

With help: the flow architecture, classifier prompt and output contract, validation expressions, the provisional confidence threshold, and the placement of the low-confidence review path.

Honest time: no reliable start/stop clock was kept, so I am not inventing one.

Next: inside the high-confidence True branch, separate review triggers from draft blockers. Then add an explicit failure/timeout fallback around the AI action before publishing. Tuesday still requires the prompt-injection, unavailable-model, wrong-schema, and unexpected-field/attachment tests.
