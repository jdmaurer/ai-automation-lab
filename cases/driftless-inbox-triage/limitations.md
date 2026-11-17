# Limitations

Current prototype limitations, updated 2026-11-15. Detailed dated evidence is in test-cases.md.

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
- The frozen-30 evaluation pack is prepared with 16 passing tooling/structure checks; the complete cloud batch helper is now saved as a draft with checker 0 errors/0 warnings, but is not yet published/runtime-verified, and no actual30 results or score exist. The isolated batch preserves inputs and tests shared prompts/mirrored routing; it cannot prove live Outlook/Dataverse side effects. Four earlier live DRI smoke checks remain bounded evidence.
- Model-unavailable and wrong-schema behavior has not yet been deliberately verified. These tests should be run on an isolated test copy/checkpoint after the working baseline is preserved.
- Weekly summary is published; WS-01/WS-02 passed the existing two-record week and unsent report output. It measures inbox/review activity, not revenue or completed orders. Nonzero Edited/Rejected, pending no-draft, changed final category, empty/date edges and retrieval failure coverage remain pending. Josh's final report-wording review remains outstanding.
- A clean recoverable baseline/export is not yet confirmed. By Josh's explicit sequence, finish normal evaluation/ordinary defects first; only then preserve/export the finished baseline and perform isolated deliberate failures. Do not revisit the earlier solution dependency warning ahead of that stage. The limited routing reference/helper blueprint is not a baseline export.
- A runbook/operator quick reference is not yet complete.
- The 30-day tracking period is a pilot rule, not a universal client retention recommendation. A real client's owner and Microsoft 365 administrator or IT provider set final retention and deletion rules.
- A real client deployment requires confirmation of tenant permissions, authentication/consent, security policies, licensing, retention, monitoring, ownership, and shutdown/rollback procedures.
- The lab mailbox is available through the Microsoft 365 Business Basic trial that ends 2026-12-08. Finish the mailbox portion of the case before that date.

## Accepted policy-v3 limitation — November16,2026

Josh accepted that a contact-only update can be labelled Support with record_change_requested=true and therefore receive unnecessary Urgent priority under the order-change shortcut. It still requires manager review and may take the existing eligible fixed Support acknowledgment branch. This does not authorize any record/order change or send. Recognition still depends on model category/change flags; no guarantee every possible order-change wording is detected.

Prior targeted evidence remains4/5 exact,3/3 order changes; original contact-control failure and formal v1/v2 FAILs preserved. Acceptance does not create a release pass. No additional tests during saving. Shared classifier is saved; main/helper deterministic overrides are saved drafts awaiting publication. [Policy and status](policy-v3-order-change-2026-11-16.md).
