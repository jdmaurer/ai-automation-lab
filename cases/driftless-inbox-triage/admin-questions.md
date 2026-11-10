# Client Setup and Technical Review

The initial discussion with the business owner focuses on decisions the owner is best positioned to make: which mailbox is in scope, what should be excluded, who reviews drafts and exceptions, and who has authority to approve workflow changes.

Technical requirements—including permissions, authentication, security policies, retention, licensing, and access controls—are reviewed separately with the organization's Microsoft 365 administrator or IT provider before live use.

## Owner kickoff questions

1. Which mailbox should the workflow use?
2. Are there messages or folders the workflow should never process?
3. Who should review drafts and messages that need special attention?
4. Who has authority to approve material changes to how the workflow operates?

## Microsoft 365 administrator / IT provider checklist

### Mailbox access and permissions

- Which mailbox will the workflow use, and is it a licensed user mailbox or a shared mailbox?
- What authentication approach is approved for this workflow, and who can grant any required Microsoft 365 or Entra consent?
- What is the least-privileged permission set that allows the workflow to read and update Inbox messages and create reply drafts without granting `Mail.Send`?
- Can the administrator create the `Needs Owner Review` Outlook category in advance so the workflow only needs permission to apply it to messages, rather than permission to manage the mailbox's category list?
- Are there existing retention, sensitivity-label, data-loss-prevention, conditional-access, or other security policies the workflow must respect?
- Are there any additional mailbox folders, message types, or organizational policies that should be excluded from automated processing?

### Data handling and retention

- What retention policies already apply to the mailbox, drafts, and related Microsoft 365 data?
- Where may the workflow's tracking records and weekly summaries be stored, and how long should they be retained?
- Is mailbox content allowed to be processed by the approved automation platform, and are there restrictions on sending email content outside Microsoft 365?
- Are there restrictions on copying email bodies, attachments, or personal/sensitive information into another system?
- Are any message types subject to additional sensitivity, records-management, legal-hold, or compliance requirements?
- What logging or audit information must be kept so the client can investigate errors or inappropriate access?
- Who has authority to approve the final retention and deletion rules for workflow tracking records?

### Deployment and ongoing ownership

- Which Microsoft 365 tenant and mailbox will be used for the live workflow?
- Are the required Microsoft 365 connections, APIs, or connectors approved for use in that tenant, and are any additional licenses required?
- Who will own the workflow connection or application identity, and how will ownership be transferred if that person leaves or changes roles?
- How should authentication failures, processing failures, or revoked permissions be reported to the owner or administrator?
- Who can immediately disable the workflow or revoke its access if it behaves incorrectly, and what manual fallback or rollback process should be used?
- What approval or change-control process is required before the workflow is enabled for a live mailbox or materially changed later?
- Who is responsible for periodically confirming that permissions, exclusions, retention rules, and human-review controls still match the client's requirements?
