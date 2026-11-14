# CURRENT STATE - updated 2026-11-13 - RESUME HERE

Canonical baton under AI_HANDOFF_PROTOCOL.md. Active Week 8 build: `cases/driftless-inbox-triage/`. This is a working checkpoint, not a completed release.

## Current checkpoint

The automated-mail prompt fix was successfully published November 13 after Josh challenged unnecessary renewed connection troubleshooting. No Outlook connection/reference changes were needed. AUTO-01 then passed a live end-to-end test. Subsequent correlation, Dataverse logging, duplicate, and explicit-resend controls were saved, then published successfully. The first publication attempt exposed a leading control character in Rule - Duplicate Message; replacing the full title with the clean name resolved InvalidWorkflowRunActionName. The additions are published but have not yet been runtime-tested. Flow checker most recently showed 0 errors and 0 warnings. Do not confuse that with runtime verification.

Next work: owner feedback/review capture using the existing Driftless Inbox Log fields, then the required weekly-summary path, a repeatable frozen-30 harness, and ordinary defect fixes. Power Apps' editable table exposes the five human review fields and currently has no processing records. Latest UI: Outlook has a complete unsent synthetic REVIEW-01 - Business name confirmation email addressed to josh@joshmaurer.onmicrosoft.com, prepared by the assistant. Josh's next action is Send; inspect its flow run and log, then record a human review. Do not click Test/Manually and wait before preparing the email. Confirm current UI before directing.

## Evidence already established

- November 11 live smoke tests passed: DRI-01, DRI-07, DRI-03, DRI-04. Do not routinely repeat them.
- November 12 shared classifier prompt save: general automated/non-replyable-mail draft suppression. AUTO-01/02/03 passed PROMPT ONLY. Immediately after save, Run a prompt remained wired to Normalize - Email Fields.
- November 13 AUTO-01 LIVE PASS: lab mailbox josh@joshmaurer.onmicrosoft.com sent itself an informational automated usage report. General/Routine/confidence 1; draft_candidate false; other risk flags false; context_sufficient true. Flow succeeded, Rule - Draft Allowed false, draft generation skipped, owner review skipped. Outlook Drafts directly inspected: zero items.
- AUTO-01 received 2026-11-13T17:12:40+00:00; client tracking ID 08584070169088727932205415585CU07.
- AUTO-02 genuine vendor question and AUTO-03 urgent automated alert remain prompt-only evidence. No full frozen-30 result exists.
- Microsoft public status still described residual degradation during the earlier November 13 check. Outlook recovery and successful publication did not establish the exact cause of yesterday's errors. Do not repeat speculative connection repairs.

## Published additions, not yet runtime-tested

### Correlation and logging

- Track - Correlation ID (Compose): workflow()?['run']?['name'].
- Dataverse table Driftless Inbox Log, plural Driftless Inbox Logs; logical table jdm_table1, entity set jdm_table1s, primary row ID jdm_table1id. Primary name Correlation ID uses jdm_newcolumn. These internal names are functional; do not rebuild for cosmetic renaming.
- Table ID e470be47-5211-4840-afa2-813e2e9b95d0 in environment 88301e40-6106-ee47-900c-67a24cbc121e.
- Columns: Correlation ID, Message ID, Received At, Category, Priority, Processing Outcome, Needs Owner Review, Draft Created, Draft ID, Review Outcome, Final Category, Reviewed At, Follow-up Open, Feedback.
- Message ID maximum length saved/read back as 400, to fit its single-column alternate-key index. Never truncate an actual email ID; oversize/null ID behavior still needs normal contract verification.
- Category/Final Category defaults Unknown. Yes/no defaults false. Dates include time. Priority default is Urgent; the completion action explicitly writes the classified priority. Failure rows must not be represented as a verified AI priority.
- Unique Message ID alternate key jdm_uniquemessageid on Message ID only. Status Active was confirmed in Power Apps at this checkpoint; enforcement still needs runtime duplicate/concurrency verification.
- Log - Start Email Processing: create one record before AI work with actual correlation ID, Outlook ID/time, Unknown categories, Started, Pending, no draft/review/follow-up initially.
- Log - Complete Email Processing: UpdateOnlyRecord in Validate - AI Output's True branch, after Rule - Confidence High Enough. Row ID is body('Log_-_Start_Email_Processing')?['jdm_table1id'].
- Completion maps category/priority from Run_a_prompt's body/responsev2/predictionOutput/structuredOutput; review flag from variables('needs_owner_review'); Draft Created from actions('Create_-_Outlook_Draft')?['status'] = Succeeded; Draft ID from body/id or body/Id with empty fallback.
- Follow-up Open starts true when owner review is required OR a draft was created. Review Outcome Pending in those cases, otherwise No Draft. Reviewed At and Final Category are reserved for human review; processing completion does not resolve the customer's work.
- Log - Invalid AI Output: in Validate False, after the existing invalid-output Outlook category action. Unknown, Failed, no draft, Needs Owner Review/Follow-up Open true, Pending. Runs after that category action succeeds, fails, times out, or is skipped within the selected invalid-output branch.
- Log - AI Request Failure: top-level AI-failure path, same field values. Runs after the AI-failure Outlook category action succeeds/fails/times out, NOT when skipped. That exclusion prevents overwriting successful processing.

### Exact duplicate check

- Check - Existing Message ID (List rows) before Log - Start Email Processing. Table Driftless Inbox Logs, select jdm_messageid, row count 1.
- Filter: jdm_messageid eq '<incoming Outlook ID>', with apostrophes escaped using replace/decodeUriComponent.
- Rule - Duplicate Message: length(body('Check_-_Existing_Message_ID')?['value']) > 0.
- True branch Stop - Duplicate Message (Terminate, Succeeded). False continues to create/process. It stops the whole run before another classification/draft.
- Unique key is the database backstop for concurrent lookup/create attempts, once Active. Concurrency/race and retry behavior remain to verify. Do not silently turn unrelated Dataverse errors into a successful duplicate outcome.

### Explicit possible-resend check

- Flag - Possible Resend (Compose) after Initialize - Needs Owner Review and before Rule - Has Attachment.
- Boolean detects case-insensitive subject containing 'resending' or 'resend:', or body containing 'just resending', 'resending this', or 'sending this again'.
- Rule - Owner Review Required retains its existing Or conditions and adds flag = true.
- Rule - Draft Allowed retains its existing And conditions and adds flag = false.
- Completion Processing Outcome: Possible Resend if flag true, otherwise Completed.
- DRI-10 is the original damaged-signs complaint with attachment; DRI-15 explicitly says it is resending and has different subject/body wording. The frozen requirement permits flagging likely resend for review; do not discard it or create another draft.
- This is bounded explicit-language detection, not semantic matching against message history. Undeclared/paraphrased repeats may be missed; quoted resend language may conservatively trigger review. DRI-10/15 runtime verification still pending.

Choice numeric values: Category Sales/Support/Finance/General/Internal/Unknown = 832990000 through 832990005. Priority Urgent/Routine = 832990000/832990001. Processing Started/Completed/Failed/Duplicate/Possible Resend = 832990000 through 832990004. Review Pending/Accepted Unchanged/Edited/Rejected/Reclassified/No Draft = 832990000 through 832990005. UI yes/no labels are Yes and No.

## Next steps and guardrails

1. Confirm latest save and inspect live review fields/table view; complete feedback capture and a usable review process.
2. Unique Message ID key is Active; verify enforcement during normal duplicate testing. No speculative connection/reference changes.
3. Finish weekly summary from recorded processing/review activity with exact calculated counts and owner-reviewed explanation.
4. Publish required normal additions when ready, verify normal paths, build/use repeatable frozen-30 harness. Do not hand-compose 30 emails.
5. Fix ordinary defects; preserve/export the finished working baseline into the repo.
6. Only then run isolated model-unavailable/wrong-schema deliberate failure tests. No new export was produced at this checkpoint; export packaging is deferred by Josh's explicit sequence.
7. Finish runbook/operator reference, governance/adoption handoff, metrics, Gate 2.

Do not revisit the solution-export dependency warning now. Do not start Intermediate Python. No auto-send/forward, no moving/deleting/archiving originals, no shadow archive of full email bodies/attachments.

## How to work with Josh (latest session preferences)

- Announce EVERY tab switch before acting or directing. Read live UI before directions. Text/control readings are preferred; screenshots only when visual context is needed.
- He is colorblind; bold alone barely stands out. Use action first, WHERE directly below with whole-screen region and exact visible label, e.g. “▶ CLICK: Save draft” then “WHERE: Upper-right Power Automate toolbar.”
- Group routine fields on one card and list them in screen order. Give card name, table, and values together when visible. Do not require d after every tiny click.
- Assistant handles repetitive navigation/wiring/inspection autonomously, explains meaningful logic, and Josh focuses on decisions/testing. Implementation is assisted, not independent work.
- Include a SAVE checkpoint after each complete change. Wait for Josh to save and confirm the saved-draft banner before moving on; Microsoft has been slow.
- Full prompt replacements; inspect linked action input wiring immediately after any AI Builder prompt save. No shared prompt was edited in the November 13 logging/resend work.
- Josh independently insisted on simply retrying Publish after Outlook recovery; he was right. He explained that duplicates should stop. He also questioned why correlation could not live in Normalize. Do not overstate independent implementation or hide excessive assistant-led checking.
- Do not give a confident time/percent-complete estimate without evidence.

GitHub is updated remotely at this checkpoint; fast-forward the local clone before subsequent local repository work. Sync the GitHub source in Claude Project before switching assistants.

Publication UI note: after successful Publish, the designer briefly retained an old Condition details panel. Closing/reopening Rule - Duplicate Message displayed its correct condition without any logic change. Do not interpret a designer spinner alone as a runtime failure.
