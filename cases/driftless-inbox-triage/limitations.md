# Limitations

Current implementation-stage limitations, updated 2026-11-11.

- This is a synthetic demonstration case. No real client email or sensitive client data is used in the evaluation set.
- No automatic external sending or forwarding. The owner sends replies manually.
- The workflow does not automatically delete, archive, move, or mark original messages resolved.
- The workflow does not make final decisions about payments, custom pricing, order changes, discounts, turnaround, installation, or delivery commitments.
- Quote drafting is limited to the approved synthetic price sheet and information present in the message or approved shop data.
- The current workflow detects attachment presence but does not interpret attachment contents. Drafts must not claim an attachment was opened, inspected, interpreted, or approved.
- Personal, sensitive, suspicious, unknown, low-confidence, invalid, failed, Finance, and Internal cases are not eligible for an ordinary reply draft under the current policy.
- A real Microsoft Power Automate notification that landed in Inbox was classified as General and produced an unnecessary draft. General automated/non-replyable/system/vendor/marketing mail handling is therefore an unresolved design gap. Do not patch only one sender; define and test a general policy.
- Duplicate/resend protection is not yet implemented or verified. The frozen DRI-10 / DRI-15 pair still needs a deterministic duplicate outcome.
- Correlation ID, review/audit logging, and feedback capture are not yet complete.
- The full frozen 30-message evaluation has not been run. Four representative live end-to-end tests passed on 2026-11-11, but this is not release evidence for the entire set.
- Model-unavailable and wrong-schema behavior has not yet been deliberately verified. These tests should be run on an isolated test copy/checkpoint after the working baseline is preserved.
- The weekly summary measures inbox activity and review outcomes; it is not a sales, revenue, or completed-order report. Its exact-count verification is still pending if the summary path has not yet been implemented.
- A clean portable export has not yet been confirmed. The flow is solution-aware and is referenced by the existing `Bluffside Handbook Helper` solution. The 2026-11-11 solution export attempt stopped at a managed-solution dependency warning; the correct packaging path must be resolved before claiming a recoverable export.
- A runbook/operator quick reference is not yet complete.
- The 30-day tracking period is a pilot rule, not a universal client retention recommendation. A real client's owner and Microsoft 365 administrator or IT provider set final retention and deletion rules.
- A real client deployment requires confirmation of tenant permissions, authentication/consent, security policies, licensing, retention, monitoring, ownership, and shutdown/rollback procedures.
- The lab mailbox is available through the Microsoft 365 Business Basic trial that ends 2026-12-08. Finish the mailbox portion of the case before that date.
