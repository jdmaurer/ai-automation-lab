# Limitations

Current design-stage limitations, 2026-11-09.

- This is a synthetic demonstration case. No real client email or sensitive client data is used in the evaluation set.
- No automatic external sending or forwarding. The owner sends replies manually.
- The workflow does not automatically delete, archive, move, or mark original messages resolved.
- The workflow does not make final decisions about payments, custom pricing, order changes, discounts, turnaround, installation, or delivery commitments.
- Quote drafting is limited to the approved synthetic price sheet and information present in the message or approved shop data.
- The current design detects attachments and records names/file types but does not automatically interpret attachment contents.
- Personal, sensitive, suspicious, unknown, low-confidence, invalid, and failed cases require owner review and do not receive an ordinary reply draft.
- The weekly summary measures inbox activity and review outcomes; it is not a sales, revenue, or completed-order report.
- The 30-day tracking period is a pilot rule, not a universal client retention recommendation. A real client's owner and Microsoft 365 administrator or IT provider set final retention and deletion rules.
- A real client deployment requires confirmation of tenant permissions, authentication/consent, security policies, licensing, and shutdown/rollback ownership.
- The lab mailbox is available through the Microsoft 365 Business Basic trial that ends 2026-12-08. Finish the mailbox portion of the case before that date.
- No workflow has been built yet. These are the approved design boundaries for the Week 8 build.
