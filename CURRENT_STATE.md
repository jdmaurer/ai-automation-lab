# CURRENT STATE - updated 2026-11-14 - RESUME HERE

Canonical baton under AI_HANDOFF_PROTOCOL.md. Active Week 8 build: `cases/driftless-inbox-triage/`. This is a working checkpoint, not a completed release.

## Current checkpoint

The automated-mail prompt fix was published November 13 without Outlook connection changes; AUTO-01 passed live. Correlation, Dataverse logging, exact-ID duplicate, and explicit-resend controls were then saved and published. The leading control character in Rule - Duplicate Message's name was removed to resolve InvalidWorkflowRunActionName. Flow checker showed 0 errors/0 warnings, but runtime verification remains incomplete.

REVIEW-01 progressed through classification and successfully created one Outlook reply draft after the Message ID storage repair. Its automatic completion log then failed on Draft ID storage. Both field storage problems were addressed without shortening either identifier. The existing record was recovered manually and independently read back from a separate table view. Josh then accepted the synthetic reply unchanged, while cautioning that an unfamiliar sender needs context before a real reply. Power Apps saved Accepted Unchanged, Final Category General, Reviewed At 2026-11-14 09:00 Central, and that feedback plus the assisted-recovery note. Processing Outcome remains Failed; Draft Created, Needs Owner Review, and Follow-up Open remain true; the full Draft ID is preserved. The manual REVIEW-01 recovery does not count as an automatic pass; the subsequent fresh LOG-02 result below does.

LOG-02 now PASSED the targeted automatic logging regression. Run 08584069378905225699918187276CU13 succeeded (15 seconds). Normalize confirmed the exact LOG-02 subject/body and received_at 2026-11-14T15:09:38+00:00. Log - Complete Email Processing returned HTTP 200 and the persisted row c4dd1c73-3de0-f111-84ea-000d3a367f8a: General/Routine, Completed, Draft Created true, full 152-character Draft ID, Needs Owner Review false, Pending review, Follow-up Open true, Final Category Unknown. Outlook Drafts directly showed ONE new LOG-02 reply plus the existing REVIEW-01 reply, two total. No additional test or replay is required to re-prove this repair.

The AI-failure fallback repair has now been SAVED and PUBLISHED. The saved-draft banner was observed, the assistant clicked Publish, and the designer showed Published / Your flow is ready to go. Its run-after accepts only TimedOut/Failed from Run_a_prompt. LOG-02 was not repeated.

Exact next step: Josh clicks Save draft and waits for the saved-draft confirmation for TWO new completion-log failure actions. They are configured, Code-view checked, and Flow checker shows Errors (0), Warnings (0), but these additions are UNSAVED and UNPUBLISHED. After confirming save, publish. No deliberate failure injection yet.

Latest UI: Power Automate designer is on Log - Completion Write Failure with Flow checker open (0 errors/0 warnings); Save draft is enabled. The added sequence is Log - Complete Email Processing -> Category - Owner Review - Log Failure -> Log - Completion Write Failure, all inside Validate True. The first new action runs ONLY after completion logging Failed/TimedOut; the second accepts category action Succeeded/Failed/TimedOut, never Skipped. This prevents normal successful runs from being overwritten as Failed.

The original Power Apps editable table and Outlook remain open. Do not discard the earlier Power Apps pending-changes prompt merely to refresh. REVIEW-01's owner review remains Accepted Unchanged with the sender-context caveat and follow-up open; its processing record remains Failed. LOG-02's automatically created reply remains Pending review, unsent.

## Evidence already established

- November 11 live smoke tests passed: DRI-01, DRI-07, DRI-03, DRI-04. Do not routinely repeat them.
- November 12 shared classifier prompt save: general automated/non-replyable-mail draft suppression. AUTO-01/02/03 passed PROMPT ONLY. Immediately after save, Run a prompt remained wired to Normalize - Email Fields.
- November 13 AUTO-01 LIVE PASS: lab mailbox josh@joshmaurer.onmicrosoft.com sent itself an informational automated usage report. General/Routine/confidence 1; draft_candidate false; other risk flags false; context_sufficient true. Flow succeeded, Rule - Draft Allowed false, draft generation skipped, owner review skipped. Outlook Drafts directly inspected: zero items.
- AUTO-01 received 2026-11-13T17:12:40+00:00; client tracking ID 08584070169088727932205415585CU07.
- AUTO-02 genuine vendor question and AUTO-03 urgent automated alert remain prompt-only evidence. No full frozen-30 result exists.
- Microsoft public status still described residual degradation during the earlier November 13 check. Outlook recovery and successful publication did not establish the exact cause of yesterday's errors. Do not repeat speculative connection repairs.

## Published additions — partial runtime evidence

### Correlation and logging

- Track - Correlation ID (Compose): workflow()?['run']?['name'].
- Dataverse table Driftless Inbox Log, plural Driftless Inbox Logs; logical table jdm_table1, entity set jdm_table1s, primary row ID jdm_table1id. Primary name Correlation ID uses jdm_newcolumn. These internal names are functional; do not rebuild for cosmetic renaming.
- Table ID e470be47-5211-4840-afa2-813e2e9b95d0 in environment 88301e40-6106-ee47-900c-67a24cbc121e.
- Columns: Correlation ID, Message ID, Received At, Category, Priority, Processing Outcome, Needs Owner Review, Draft Created, Draft ID, Review Outcome, Final Category, Reviewed At, Follow-up Open, Feedback.
- Message ID maximum length was saved/read back as 400 during the build; it is now 401 after a minimal fresh schema-update attempt described below. Both sizes fit the single-column alternate-key index. Never truncate an actual email ID; oversize/null ID behavior still needs normal contract verification.
- Category/Final Category defaults Unknown. Yes/no defaults false. Dates include time. Priority default is Urgent; the completion action explicitly writes the classified priority. Failure rows must not be represented as a verified AI priority.
- Unique Message ID alternate key jdm_uniquemessageid on Message ID only. Status Active was confirmed in Power Apps at this checkpoint; enforcement still needs runtime duplicate/concurrency verification.
- Log - Start Email Processing: create one record before AI work with actual correlation ID, Outlook ID/time, Unknown categories, Started, Pending, no draft/review/follow-up initially.
- Log - Complete Email Processing: UpdateOnlyRecord in Validate - AI Output's True branch, after Rule - Confidence High Enough. Row ID is body('Log_-_Start_Email_Processing')?['jdm_table1id'].
- Completion maps category/priority from Run_a_prompt's body/responsev2/predictionOutput/structuredOutput; review flag from variables('needs_owner_review'); Draft Created from actions('Create_-_Outlook_Draft')?['status'] = Succeeded; Draft ID from body/id or body/Id with empty fallback.
- Follow-up Open starts true when owner review is required OR a draft was created. Review Outcome Pending in those cases, otherwise No Draft. Reviewed At and Final Category are reserved for human review; processing completion does not resolve the customer's work.
- Log - Invalid AI Output: in Validate False, after the existing invalid-output Outlook category action. Unknown, Failed, no draft, Needs Owner Review/Follow-up Open true, Pending. Runs after that category action succeeds, fails, times out, or is skipped within the selected invalid-output branch.
- Log - AI Request Failure: top-level AI-failure path, same field values. Runs after the AI-failure Outlook category action succeeds/fails/times out, NOT when skipped. That exclusion prevents overwriting successful processing.

### Completion-log failure recovery — configured, not saved/published

- Category - Owner Review - Log Failure: Outlook AssignCategory on triggerOutputs()?['body/id'], category Needs Owner Review. runAfter Log_-_Complete_Email_Processing = Failed/TimedOut only. This marks the original email without sending or creating a replacement draft.
- Log - Completion Write Failure: Dataverse UpdateOnlyRecord, entity jdm_table1s, row ID body('Log_-_Start_Email_Processing')?['jdm_table1id']. Writes only Draft Created = equals(actions('Create_-_Outlook_Draft')?['status'],'Succeeded'), Follow-up Open true, Needs Owner Review true, Processing Outcome Failed (832990002).
- Minimal update deliberately does not retry the long Draft ID or overwrite human feedback, Final Category, or Reviewed At. Existing IDs/categories remain in the record; a failed original completion write may still leave its suggested Category Unknown until recovery.
- Its runAfter Category_-_Owner_Review_-_Log_Failure accepts Succeeded/TimedOut/Failed, NOT Skipped. This attempts the failure log even if applying the Outlook marker fails, while leaving normal successful runs untouched.
- Code views inspected for both actions; Flow checker Errors (0), Warnings (0). No runtime pass is claimed. If Dataverse is unavailable, that recovery write can also fail; the independent Outlook marker and failed run remain the available signals when Outlook is available.

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

1. REVIEW-01 review capture is saved: Accepted Unchanged with sender-context caveat, Final Category General, Reviewed At November 14 09:00 Central. Follow-up remains open; no send occurred.
2. LOG-02 automatic completion logging and actual reply draft are verified PASS. Do not repeat the test or resubmit REVIEW-01.
3. The narrow AI-failure fallback repair is now published. Save/publish the two configured completion-log failure actions next. Full runtime failure coverage remains unverified; deliberate failure testing stays after finished-baseline preservation.
4. Unique Message ID key is Active; verify exact-ID enforcement and DRI-10/DRI-15 behavior during normal testing, including the required concurrency/race behavior. No speculative connection/reference changes.
5. Finish weekly summary from recorded processing/review activity with exact calculated counts and owner-reviewed explanation. Build/use the repeatable frozen-30 harness; do not hand-compose 30 emails.
6. Fix ordinary defects and preserve/export the finished working baseline into the repo.
7. Only then run isolated model-unavailable/wrong-schema deliberate failure tests. No new export was produced at this checkpoint; export packaging is deferred by Josh's explicit sequence.
8. Finish runbook/operator reference, governance/adoption handoff, metrics, Gate 2.

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

## REVIEW-01 — runtime evidence and recovery, November 13–14

- Synthetic email to josh@joshmaurer.onmicrosoft.com: subject REVIEW-01 - Business name confirmation; body: Hello, could you confirm that your business name is Driftless Print and Sign for our vendor directory? There is no rush. Thank you. No attachments.
- Original run 08584069732027549680878527902CU04 failed at Log - Start Email Processing: 0x80090429 / StringOrBinaryTruncation on jdm_MessageID. Actual Outlook ID was 152 characters despite live maximum 400. No row/draft was created. Publishing the table alone did not fix it; resubmit 08584069727813331938580416649CU19 failed identically.
- A saved fresh Message ID width change 400 -> 401 followed by confirmed Publish succeeded resolved the initial write in run 08584069721053204433787343518CU25. Do not truncate actual IDs. This is evidence of a metadata/storage mismatch, not proof of a specific backend root cause.
- That run created row 3fb010cb-eddf-f111-84e9-000d3a367f8a (correlation 08584069721053204433787343518CU25), classified General/Routine, and successfully created an Outlook reply draft. Log - Complete Email Processing failed with truncation on jdm_DraftID; its actual ID was also 152 characters although the live maximum read 4000. Validate - AI Output's parent ActionFailed / No dependent actions succeeded was not the root cause.
- Draft ID width was saved 4000 -> 3999 -> 4000 and Publish table was invoked. No final publish toast was captured for that operation. The full Draft ID was subsequently stored and read back successfully, proving the field accepts it. Final maxima: Message ID 401, Draft ID 4000.
- Assisted recovery updated the SAME row with the actual General/Routine/draft result, Processing Outcome Failed, Needs Owner Review and Follow-up Open true, Pending review, Unknown Final Category, blank Reviewed At, and Feedback: Assisted recovery: draft created; automatic completion log failed. Owner review pending. A separate newly loaded table view independently confirmed all these values after interruption. Automatic logging is still unverified; do not count the manual recovery as a pass.
- Existing draft inspected directly in Outlook: Hello, Thank you for reaching out. Yes, our business name is Driftless Print and Sign. Please let us know if you need any additional information. Best regards. Josh accepted this unchanged for the synthetic test with a caveat about unfamiliar sender context before a real reply. Review Outcome Accepted Unchanged, Final Category General, and Reviewed At November 14 09:00 Central were saved. Follow-up remains open and Processing Outcome remains Failed. No send occurred.
- The secondary ordinary defect was traced to initial logging failure skipping initialization while the AI-failure setter accepted a Skipped Run a prompt. The assistant has now unchecked Is skipped and read Code view showing only TimedOut/Failed; this change was subsequently saved and published. Completion-log visibility/recovery additions are configured but await Save/Publish, as described above; do not attribute these failures to Outlook or the model.
- The fresh LOG-02 run above subsequently verified automatic completion logging after the storage repairs. Exact-ID duplicate enforcement, DRI-10/15, weekly summary and the frozen-30 harness remain unverified. No deliberate failure was injected and no baseline export was produced.
