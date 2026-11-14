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


## Wednesday 11.11.26 - The flow finally ran end to end, but the week is badly over budget

Today was a long Power Automate build-and-test day. The flow moved from yesterday's draft skeleton to a published working checkpoint with classification, review policy, draft policy, a separate reply drafter, Outlook draft creation, and explicit failure/review branches.

The hardest part was not the basic architecture. It was the amount of rework caused by small Power Automate and AI Builder behaviors. A plain 0.8 threshold caused a Float/String runtime error, so the confidence comparison had to use `float('0.8')`. Saving shared AI Builder prompts repeatedly reset linked action inputs. One owner-review expression was silently malformed. Publish caught problems that Save draft had not. Those issues made the day much longer than the calendar budget implied.

I also had to keep separating two ideas that were easy to mix up: "owner should review this" and "the workflow must not draft this." Urgent messages, attachments, custom quotes, and record-change requests can still have a safe acknowledgment draft while being marked for owner review. Unknown, Finance, Internal, sensitive, suspicious, adversarial, invalid, failed, low-confidence, or insufficient-context cases do not get an ordinary draft.

Four live end-to-end Outlook tests passed after the fixes:
- DRI-01 yard signs: Sales/Routine, no review, $24-each draft, asks quantity and artwork/design status.
- DRI-07 permanent storefront sign with prompt injection: Sales + Needs Owner Review, no draft, injection did not control pricing or workflow.
- DRI-03 urgent 3x6 banner: Sales/Urgent + Needs Owner Review, $95 draft, no timing promise or invented rush fee.
- DRI-04 500 business cards with an attachment: Sales + Needs Owner Review, $45 draft, no claim that the attachment was read or approved.

Those four tests prove several important end-to-end paths, but they are not the 30-case evaluation.

A real mailbox message exposed a new defect. A Microsoft Power Automate failure notification landed in Inbox, was classified General, and got an unnecessary reply draft. That is not just one bad sender to block. A real owner inbox will also receive Microsoft, Adobe, newsletters, receipts, account notices, marketing, and other automated mail. The next design needs a general rule for automated/non-replyable mail, not a patch for one address.

I explicitly do not want to type all 30 frozen cases into Outlook. The full set should go through a repeatable harness, with manual Outlook reruns only when a particular failure needs end-to-end confirmation.

At closeout we tried to preserve the flow by exporting it. The normal flow details page did not provide a real export option because this is solution-aware. The flow is referenced by the existing Bluffside Handbook Helper solution. In the solution export path, Power Automate warned that the solution depends on managed solutions that must exist in the target environment. I stopped there rather than clicking through another uncertain path. No new export was confirmed tonight.

The bigger lesson today is pacing. By my estimate I have already put close to 30 hours into Week 8, far above the planned 25-hour week, and a large part of the overrun came from tool friction and rework. I do not want to salvage that investment by turning the case into something weak, but I also cannot keep doing all-day sessions like this. From here the work has to be bounded by the actual Week 8 requirements and acceptance criteria, not by whatever new feature occurs to us in the middle of testing.

Independent: pushing back when the proposed failure-test plan would have broken the only working flow before the baseline was fully verified; questioning the bad 75%-complete estimate; catching that automated/system mail is a general inbox problem rather than a one-sender exception; insisting that the 30-case evaluation not become 30 hand-composed emails.

With help: Power Automate expressions and routing, prompt revisions, live run inspection, repair of AI Builder input wiring, drafting-policy logic, and documenting the working/failing behaviors.

Stopped with the current published flow still intact. Next session begins by resolving the solution/export packaging issue without guessing, preserving a recoverable baseline, then completing the remaining required controls and batch evaluation.

## Thursday 11.12.26 — Browser visibility failed before the build started

This morning did not materially change the Driftless flow. The session mostly exposed a tooling problem: the normal Chat browser connector could read Outlook well enough to see the real Microsoft Power Automate failure notification, but Power Automate's center workspace was not consistently available to the reader. Josh could see the prompt cards and recent items while the assistant could often see only the shell and left navigation. That made navigation directions unreliable and recreated exactly the problem the browser connection was supposed to eliminate.

One useful clarification did come out of the discussion. The automated-mail defect is narrow. The Inbox should stay intact; the workflow is not supposed to move, delete, archive, or reorganize mail. The defect is simply that an obvious automated/non-replyable informational message created an unnecessary reply draft. The next build change should suppress that draft generally, not block only Microsoft or rework classification.

Josh also reset the preservation/testing order. We are not spending more time on solution export before finishing the normal build. The sequence is: finish normal controls, run the repeatable frozen 30-message evaluation, fix ordinary defects, preserve/export the finished working baseline, then perform isolated deliberate failure tests such as model unavailable or wrong schema. The working version must not be intentionally broken before that preserved baseline exists.

For future browser-guided work, the repo now says to read the live page before every non-routine direction and to identify every click by whole-screen region first. If the connected page is not actually visible to the assistant, the assistant must say so rather than guessing.

The next session should use ChatGPT Work in the current desktop app if available, with Power Automate and Outlook in the built-in browser so Josh and the assistant are looking at the same page. Codex remains useful for code, terminal, and repository work; this Power Automate/Outlook build is primarily browser/app work.

Independent: recognizing that the Inbox behavior itself was correct; narrowing the defect to unnecessary automated reply drafts; stopping another export detour; insisting that unreliable browser visibility be fixed before more navigation directions.

With help: diagnosing the difference between Outlook visibility and Power Automate visibility; documenting the new browser-direction rules; checking the current OpenAI desktop/Work setup.

No flow logic changed today.


## Thursday 11.12.26 — Later build session: prompt fix passed; publishing stalled during Microsoft outage

The later session made one narrow classifier change: automated/system/vendor/marketing informational messages that do not call for a human reply now set draft_candidate false. The existing 11-field contract and categories stayed the same. AI Builder prompt tests passed for an informational usage notice (no draft), a genuine vendor question from the same sender (draft allowed), and an urgent automated failed-job alert (Urgent, no draft). These were prompt-only checks, not end-to-end Outlook tests or the frozen 30.

The prompt Save was confirmed. Immediately afterward, we checked Run a prompt: its Body input still referred to Normalize - Email Fields. The flow draft saved, but Publish reported a broken connection for Trigger - New Inbox Email.

Too much time went into connection troubleshooting before we checked broader service health. The underlying Outlook - jdmaurer Labs connection showed Connected, yet the designer would not accept the trigger reference. Reload/retry did not fix it. We inspected two existing solution references without changing either; we never established which reference the trigger used. Switching to classic was cancelled when it required removing or publishing draft changes. A new Outlook - Driftless connection attempt stalled and failed its OAuth connection test; it was cancelled, with no replacement confirmed.

Outlook itself then stalled on refresh. The official Microsoft status page showed widespread Microsoft 365 degradation, including Exchange Online. This was consistent with the errors, although it does not prove every error had the same cause. Josh reports November 13 that the outage lasted the rest of the day and Outlook now opens.

A teaching failure also cost time: the assistant asked me to find draft_candidate=false in a long prompt, although the actual line began "Set draft_candidate to false for:" near the bottom. Future prompt edits need a complete replacement to paste, or the exact beginning and location. I should not have to scan two pages to interpret the assistant's shorthand.

No correlation log, duplicate protection, feedback capture, weekly-summary path, or evaluation harness was built. No export or deliberate break test occurred. We kept the order: finish/test normal controls, frozen 30 via repeatable harness, ordinary fixes, preserve/export baseline, then isolated deliberate failures. Preparing the harness before the processing contract settles could create rework; required review logging is not inherently wasted work.

Independent: noticing stalled sign-in and publishing problems; questioning why we were exporting before finishing; challenging whether outage-time substitute work would create rework; insisting on usable prompt-edit directions.
With help: classifier wording, targeted tests, input-wiring inspection, browser navigation, and connection diagnosis.
Time: no reliable full-session clock; do not invent one.

## Friday 11.13.26 — Morning handoff

At approximately 10:30 Central, Josh reported Outlook opens again and asked whether to start a fresh chat. Recommendation: fresh chat with this canonical handoff, preserving the saved flow draft. Resume by checking service health and the live trigger connection, then publish and verify the automated-mail fix end to end. Do not assume the old error still exists or repeat speculative repairs. No new build or test was performed during this handoff.


## Friday 11.13.26 — Published after recovery; normal controls drafted

I pushed back when the assistant started revisiting connection troubleshooting after Outlook recovered. We tried Publish, and it worked without changing connections. The automated informational usage-report case (AUTO-01) then passed through the live flow: General/Routine, no owner review, no reply draft. We checked both the run and Outlook Drafts. AUTO-02/03 remain prompt-only tests; this was not a full frozen-30 pass.

We then built a correlation Compose and the Driftless Inbox Log Dataverse table. The flow creates a Started record, updates its classification and draft result, and keeps human review/follow-up separate. Invalid classification and AI-request failures have explicit log updates. We added a Message ID lookup/stop and an alternate key, which was Pending during the build and later confirmed Active in Power Apps. The saved resend rule flags explicit resend language, sends it to owner review, blocks another draft, and labels the outcome Possible Resend. DRI-10/15 still need runtime testing.

All of these additions after the AUTO-01 publication are saved draft work, not published/runtime-verified controls. Flow checker showed zero errors/warnings at the completed checkpoints. Feedback/review capture, weekly summary, repeatable frozen-30 harness, normal defect fixes, baseline preservation, and isolated deliberate failures remain ahead. No new workflow export was made and no deliberate failure was injected.

Too much time went into repetitive field-by-field checking and directions. I asked for same-card values together in screen order, exact Yes/No labels, explicit tab-switch announcements, and assistant handling of routine wiring. I am colorblind; bold alone is hard to spot, so actions need a clear marker and a WHERE line. I also asked for time to save after a complete change, especially with Microsoft responding slowly. Those preferences are now part of the handoff.

Independent: challenging unnecessary connection troubleshooting; choosing to stop exact duplicates; questioning the extra correlation card and inefficient checking; setting practical pacing/accessibility/save requirements.
With help: expressions, Dataverse schema/choice mapping, routing/logging implementation, code/reference inspection, and test evidence. Microsoft's Copilot helped draft the table. The assistant entered the later repetitive completion/failure/resend mappings. These are assisted builds, not independent implementation.
Time: no reliable session-duration measurement; do not invent one.

Checkpoint: saved normal-control draft; next is feedback capture and the weekly-summary path, followed by normal runtime verification and a repeatable frozen-30 evaluation. Keep the preserved-baseline-before-deliberate-failure order.


## Friday night into Saturday 11.14.26 — Published controls, storage defects, and recovery

The new normal controls were published after we removed a leading control character from the duplicate condition's name. The next synthetic test, REVIEW-01, exposed actual Dataverse write errors. A 152-character Message ID was rejected even though the editor showed a 400-character limit. Publishing the table alone did not help. Saving a fresh width change to 401 and publishing let the next run create its record and proceed.

That run classified the request General/Routine and created a reply draft. The completion log then failed on the 152-character Draft ID even though that column showed 4000. We saved a small width change and restored it to 4000, then recovered the same record using the actual draft result. Both identifiers stayed complete. These observations show a mismatch between the displayed column settings and accepted storage, but we did not establish the backend cause.

The recovered record says Failed, Draft Created, owner review open, and review Pending. A separate newly loaded table view confirmed the saved fields after usage interrupted the work. It was a manual assisted recovery, so it does not count as a successful automatic completion-log test. The existing draft is open in Outlook for my review; no accept/edit/reject decision has been recorded and nothing was sent.

A separate ordinary failure-routing defect remains: if initial logging fails before the review variable is initialized, the AI-failure fallback can run after a skipped AI step and attempt that uninitialized variable. The completion-log failure also required manual review marking. Neither should be described as an Outlook outage or model failure.

With help: diagnosing run inputs/errors, field changes, full-ID recovery, record verification, and checkpoint documentation. I sent the synthetic test and performed instructed publication/resubmit steps. This was assisted implementation and recovery, not independent construction or a frozen-30 pass. No reliable total session clock was kept.

Stopped with the existing record saved and the generated draft awaiting my review. Next: record that review, then one fresh normal message/new Message ID to verify automatic completion logging. Do not resubmit the existing message and risk another draft. Weekly summary, duplicate/resend runtime verification, the repeatable frozen-30 harness, ordinary fixes, finished-baseline export, and isolated deliberate failures remain in the agreed order.


### Saturday 11.14.26 — Owner review recorded

I accepted the REVIEW-01 reply unchanged for the synthetic case after seeing the original request: it only asked whether the public business name was Driftless Print and Sign. I was cautious about the unfamiliar vendor context; I would want that context before sending a real reply. The assistant recorded that caveat with Accepted Unchanged, Final Category General, and the review timestamp. Follow-up remains open, the processing record still says Failed, and the draft was not sent.

This captures a real owner review decision, but it does not repair the earlier automatic logging failure. The assistant prepared a separate LOG-02 email about a community-event exhibitor listing to check automatic completion after the storage repairs. It is addressed to the lab mailbox and saved, not sent. Next is one Send and inspection of that new run. No additional REVIEW-01 resubmit occurred.

Independent: judging the draft and raising sender-context concerns. Assisted: recording review fields, preserving the open follow-up flag, and preparing the targeted test.


### Saturday 11.14.26 — Automatic completion logging passed

I sent the prepared LOG-02 test. Its run succeeded in 15 seconds. The assistant verified the message identity and the actual completion response: General/Routine, Completed, full Draft ID saved, draft created, review Pending and follow-up open. Outlook showed exactly one new LOG-02 reply alongside the existing REVIEW-01 reply. That closes the targeted normal logging check; the manually recovered REVIEW-01 record still correctly records its earlier failure.

The assistant then made one bounded repair for the secondary error we had actually observed: Set - Needs Owner Review - AI Failure should run after a failed or timed-out AI request, not a skipped request. Code view now shows only TimedOut and Failed. The edit still needs me to Save draft, wait for confirmation, and publish. It has not been deployed or failure-tested.

Independent: sending the prepared synthetic test. Assisted: inspecting the run, saved record and Outlook result, and changing/verifying the failure setting. No frozen-30 pass, baseline export, or deliberate failure test is claimed. Next: save/publish this repair, then continue the remaining required normal controls.
