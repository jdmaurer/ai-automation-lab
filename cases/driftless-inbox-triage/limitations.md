# Limitations

Current prototype limitations, updated 2026-11-19. Dated sections below preserve historical observations; later dated deployment notes supersede earlier deployment status. Detailed dated evidence is in test-cases.md.

- This is a synthetic demonstration case. No real client email or sensitive client data is used in the evaluation set.
- No automatic external sending or forwarding. The owner sends replies manually.
- The workflow does not automatically delete, archive, move, or mark original messages resolved.
- The workflow does not make final decisions about payments, custom pricing, order changes, discounts, turnaround, installation, or delivery commitments.
- Quote drafting is limited to the approved synthetic price sheet and information present in the message or approved shop data.
- The current workflow detects attachment presence but does not interpret attachment contents. Drafts must not claim an attachment was opened, inspected, interpreted, or approved.
- Personal, sensitive, suspicious, unknown, low-confidence, invalid, failed, Finance, and Internal cases are not eligible for an ordinary reply draft under the current policy.
- The observed automated-notification drafting defect was addressed through the shared draft_candidate policy. AUTO-01 passed live; AUTO-02/03 remain prompt-only evidence. This is bounded verification, not proof for every automated sender.
- Exact-ID lookup/stop, an Active alternate key and explicit-language Possible Resend control are published but runtime enforcement/concurrency and the live DRI-10/15 pair remain unverified. Resend detection flags explicit language; it is not historical semantic matching.
- Correlation/minimal tracking and owner feedback are implemented with bounded normal evidence: LOG-02 passed; REVIEW-01 required assisted recovery and remains an automatic-logging failure. Do not treat recovery as an automatic pass.
- The isolated frozen-30 helper is Published. Earlier formal v1 and policy-v2 runs remain FAIL (25/30 and 27/30 primary outcomes respectively); publication of the accepted policy-v3 drafts does not revise those scores or establish a new runtime/release pass. Owner quality judgments remain pending. The isolated batch preserves inputs and tests shared prompts/mirrored routing; it cannot prove live Outlook/Dataverse side effects. Four earlier live DRI smoke checks remain bounded evidence.
- FI-01 classifier-action failure, separate FI-02 malformed-confidence repair, FI-03 completion-write failure and FI-04 incomplete retrieval passed scoped isolated simulations. Original FI-02 FAIL is preserved; main repair Published. These do not prove real provider/database outages, all malformed variants, post-promotion valid-input regression or high-volume pagination. [Current failure evidence](evaluation/failure-testing/isolated-2026-11-17/README.md).
- Weekly summary is published; WS-01/WS-02 passed the existing two-record week and unsent report output. It measures inbox/review activity, not revenue or completed orders. Nonzero Edited/Rejected, pending no-draft, changed final category and empty/date edges remain pending. FI-04 passed a simulated continuation-link stop, with no report work; real high-volume pagination/cap behavior is not proven. Josh's final report-wording review remains outstanding.
- The published configuration baseline was exported and preserved on 2026-11-17 as the original unmanaged mixed-solution ZIP, with member hashes and saved-reference comparisons. The ZIP predates the later FI-02 main repair; published repair snapshots document that delta but are not a new full export. Import/restore remains untested. Target environments require the export-UI-listed AI Solution default templates dependency; the package also contains earlier Bluffside components. It does not back up live mailbox/Dataverse rows, authentication or cloud run history. [Package and recovery notes](baselines/published-policy-v3-2026-11-17/README.md).
- [Operator/admin runbook and handoff](runbook.md) are documented as of November19. Training delivery, backup assignment, incident/restore drills, support agreement and real-client administrator approval are not established. Documentation is not a release pass.
- Automatic enforcement/deletion of tracking at30days has not been demonstrated. The 30-day tracking period is a pilot rule, not a universal client retention recommendation. A real client's owner and Microsoft 365 administrator or IT provider set final retention and deletion rules.
- A real client deployment requires confirmation of tenant permissions, authentication/consent, security policies, licensing, retention, monitoring, ownership, and shutdown/rollback procedures.
- The lab mailbox is available through the Microsoft 365 Business Basic trial that ends 2026-12-08. Finish the mailbox portion of the case before that date.

## Accepted policy-v3 limitation — November16,2026

Josh accepted that a contact-only update can be labelled Support with record_change_requested=true and therefore receive unnecessary Urgent priority under the order-change shortcut. It still requires manager review and may take the existing eligible fixed Support acknowledgment branch. This does not authorize any record/order change or send. Recognition still depends on model category/change flags; no guarantee every possible order-change wording is detected.

Prior targeted evidence remains4/5 exact,3/3 order changes; original contact-control failure and formal v1/v2 FAILs preserved. Acceptance does not create a release pass. No additional tests during saving. Shared classifier is saved; main/helper deterministic overrides are now Published, with saved-definition/input verification and no new tests. The accepted limitation remains unchanged. [Policy and status](policy-v3-order-change-2026-11-16.md).


## Demonstrated malformed-output recovery gap — November17,2026

FI-02 on the isolated main-flow copy returned wrong-typed confidence. Numeric validation threw InvalidTemplate instead of selecting its invalid-output False branch. That branch's owner-review setter/category marker/Failed log skipped, and the separate classifier-action failure handler skipped because the simulated response action succeeded. No reply draft/model call/send occurred, but required automatic review/failure recovery was absent: **acceptance FAIL**.

[Actual run and evidence](evaluation/failure-testing/isolated-2026-11-17/execution/FI-02.md), run `08584066475931016390512579185CU11`. This was a controlled copied-flow response simulation, not a provider outage or original-flow runtime test. Existing source comparison retained validation/recovery structure; no repair was made after failure. FI-03/04 remain pending. Final Dataverse row values not independently reopened; only Start log success and skipped later writes observed. All previous failures and the accepted contact-update limitation above remain unchanged.


## FI-02 repair verified in isolated copy only — November17,2026

One authorized targeted check of added required-type Parse JSON and reused review/failure recovery passed, run `08584066464556424522963834692CU18`. Wrong-typed confidence now reaches actual review marker and same-row Failed/Unknown/Pending log; no reply. [Repair evidence](evaluation/failure-testing/isolated-2026-11-17/execution/fi02-repair-a/README.md).

The earlier failed FI-02 remains unchanged. **This repair is not in the published original flows**; the original validation-recovery gap above remains relevant there. Other malformed-field forms, valid-output routing regression and classifier-failure behavior after this isolated change were not runtime-retested. Existing schema types/contracts were used, with no sample-specific exception. Accepted contact-update limitation and all earlier failures remain unchanged.


## FI-02 repair now published in main — November17,2026

Supersedes the earlier isolated-only deployment statement: Josh authorized carrying the verified format check and recovery wiring into the main triage flow. Main is now saved/Published, checker0/0; published input/source readback verified. [Publication evidence](evaluation/configuration/fi02-main-recovery-publication-2026-11-17/README.md).

No new runtime checks were run after promotion. The single isolated malformed-confidence recovery PASS remains bounded evidence; it does not establish all malformed-field variants, valid-input regression coverage, other failure paths or full release. Evaluator/weekly definitions unchanged. Original failed FI-02 and all prior failed evidence remain unchanged. Accepted contact-update false-positive limitation above remains current and unchanged. Pre-repair baseline preserved; new captures are action-level configuration evidence, not a complete new export.


## November19 documentation closeout — current boundary

FI-03 and FI-04 scoped PASS evidence is now saved, superseding historical pending statements above. The original FI-02 FAIL and later repair/deployment records remain distinct; earlier failures are not erased. No test or flow change occurred for this documentation update.

Current-policy formal acceptance, pending owner judgments, measured effort reduction/cost scenarios, unproven normal integration/weekly coverage and Gate2 pass remain unresolved. Identity/connector scope and retention need client admin approval; lack of a Send action does not prove Mail.Send is absent from permissions. Inbox classification may process body text before personal/sensitive flags are known; minimized logs are not a guaranteed pre-model privacy filter. Synthetic use only. See the [runbook's evidence and ownership map](runbook.md).


## November 24, 2026 — found during the read-only flow walkthrough

- **Resend detection is keyword-based.** Flag - Possible Resend looks for phrases like "resending" or "sending this again." It misses other wording and could wrongly flag "please don't resend." A production version should use Outlook's conversation ID, or the same sender plus a similar subject within a few days. Not changed: the synthetic frozen test set has no real threads, so it couldn't test that design.
- **Drafts are not threaded replies.** Create - Outlook Draft uses "Draft an email message" with the original subject and no "Re:", so the draft does not sit inside the original conversation in Outlook. A reply-type action would fix this. Not changed.
- **"Never sends" is a design property, not a permission.** No action sends mail, but the Outlook connection uses an account that can send. A client deployment needs that enforced by the administrator.
- **Run history exposes full email content.** For 28 days, the trigger step in run history shows the full email (HTML body, sender, recipients, conversation ID and all internet headers) to anyone with access to the flow. Verified November 24, 2026 in run `08584064783967309204758453321CU17`. The Power Automate designer, both new and classic, offers no Secure Inputs/Outputs setting on this Outlook trigger. Azure Logic Apps documentation indicates managed-connector triggers can be secured through `runtimeConfiguration.secureData` in the flow definition. That route was **not tested** here. Until it is, the control is limiting who can own, co-own or view the flow, which is an administrator decision.
- **The flow processes every Inbox email, including system mail.** The November 19 run classified a Microsoft "your flows have failed" notification. A client deployment needs a decision on automated senders, for example a trigger condition that skips them.
