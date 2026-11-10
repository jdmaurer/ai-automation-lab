# Driftless Print and Sign — Inbox Triage Charter

Design baseline approved 2026-11-09. Driftless Print and Sign is fictional, and all demonstration data is synthetic.

## Purpose and user

Driftless Print and Sign is a fictional, owner-operated shop with a small team supporting design and production. The owner handles the business inbox alongside customer service and order coordination.

The proposed assistant will help the owner identify messages needing attention and prepare reply drafts where useful. The demonstration will focus on quote requests and time-sensitive order changes, while testing a broader variety of incoming messages. The owner reviews drafts, edits or rejects them as needed, and sends any replies manually.

The goal is to reduce time spent sorting messages and writing replies while helping the owner spot important requests. Testing will compare manual and assisted handling, including review and correction time, and check whether important messages are identified correctly and drafts are accurate. All demonstration data will be synthetic.

## Scope

### Inbox triage
The workflow suggests a business category and whether the message needs prompt attention. Quote requests and time-sensitive order changes are the main demonstration focus, but the evaluation set includes a broader mix of incoming mail.

Business category and priority are separate:
- Business category: Sales, Support, Finance, General, Internal, or Unknown.
- Priority: Urgent or Routine.

The special Outlook category `Needs Owner Review` is used for messages that require explicit human attention because they are sensitive, suspicious, unknown, unclear, low-confidence, invalid, failed processing, or require attachment review.

### Quote-request drafts
For eligible standard quote requests, the assistant may use the approved synthetic price sheet when enough information is present. If required details are missing, the draft asks for them. Custom pricing, discounts, turnaround time, rush fees, taxes, shipping, design fees, installation, and delivery commitments are not invented.

### Weekly inbox summary
For each message category, show messages processed and drafts accepted unchanged, edited, or rejected. Separately count processed messages still awaiting owner review, including those for which no draft was created. Formulas calculate the totals; AI prepares a short, factual explanation for the owner to review. The summary covers inbox activity, not sales revenue or completed orders.

## Proposed process

1. Receive and check. Read a new message from the main Inbox. Check exclusion rules and whether it has already been processed.
2. Suggest how to handle it. Apply fixed rules first; use AI classification where those rules do not resolve the message. Check AI results for required fields and allowed values before using them. Suggest a business category and whether the message needs prompt attention. Messages flagged as personal, sensitive, suspicious, unknown, or still unclear go to owner review without a reply draft. Invalid or low-confidence AI results and processing failures also go to owner review without a draft.
3. Prepare a useful draft. For eligible messages, prepare a reply using the message and approved shop information. Quote drafts may use approved pricing or ask for missing details. They never invent prices or delivery dates.
4. Owner reviews and acts. The owner checks the original message and the workflow's suggestions, corrects categories if needed, and accepts, edits, rejects, or reclassifies drafts. The owner sends any reply manually. The review outcome is recorded separately from whether the message still needs attention.
5. Prepare the weekly summary from recorded processing and review activity. Formulas calculate the totals; AI prepares a short factual explanation for the owner to check.

Original messages remain available in Outlook. The workflow does not change orders or send replies.

## No-auto-send rule

The assistant may prepare reply drafts but cannot send or forward email. The owner checks the recipient and content, makes any needed changes, and sends replies manually. Accepting a draft records the owner's review decision; it does not trigger sending. Automatic acknowledgments are outside this case's scope.

## Allowed actions

- Suggest a message category and whether the message needs prompt attention.
- Apply the `Needs Owner Review` category when explicit human review is required.
- Prepare a reply draft for eligible messages.
- Use the approved price sheet when enough information is present for a standard quote; otherwise ask for the missing details.
- Record the processing result, suggested category, review status, and the owner's accept, edit, reject, or reclassify decision.
- Calculate the weekly inbox totals and prepare a short written summary for owner review.

The owner alone sends replies and makes final decisions about pricing, custom quotes, payments, order changes, and delivery commitments.

The workflow may not send, forward, delete, archive, or move original messages automatically. It also may not mark a message resolved simply because processing finished.

## Mailbox and excluded folders

The workflow processes the main Inbox directly. It does not require a second triage folder.

Excluded system folders:
- Sent Items
- Drafts
- Deleted Items
- Junk Email
- Archive

For a real client, any additional excluded folders are agreed with the owner and Microsoft 365 administrator or IT provider.

A personal or sensitive message that arrives in the Inbox is not ignored or moved. It is marked `Needs Owner Review` and receives no reply draft.

## Data map

From an incoming email, the workflow may read:
- Message ID
- Received date/time
- Sender name/email
- Subject
- Message body
- Folder
- Whether attachments are present
- Attachment names/file types

The workflow creates:
- Suggested business category
- Needs-prompt-attention flag
- Classification method: fixed rule or AI
- Confidence, when AI is used
- `Needs Owner Review` status
- Draft reply, when allowed
- Missing-details list for quote requests
- Processing status/error
- Draft-created status

For standard quote requests, the workflow may read:
- Approved price-sheet item/service
- Approved price
- Unit/pricing basis
- Price-sheet version/effective date

Attachment handling:
- The workflow recognizes attachments and records names/file types.
- The current version does not automatically interpret attachment contents.
- If an attachment appears important to the decision, such as artwork, a proof, a purchase order, or specifications, the message is flagged for owner review before any draft relies on it.
- Supported attachment reading can be added later for approved file types after client permission, security, and accuracy requirements are defined.

Owner review records:
- Final category
- Accept, edit, reject, reclassify, or no-draft outcome
- Reviewed date/time
- Whether the message still needs follow-up

The tracking record stores the message ID plus only the information needed for review, testing, and reporting. It does not create a second copy of the full email body or attachments when the original remains in Outlook. Personal or sensitive message bodies are not copied into the tracking record.

The 30-message synthetic evaluation set may retain full message text separately because it contains no real client data.

## Retention

- Original emails remain in Outlook under the organization's normal Microsoft 365 retention rules; the workflow does not create a separate archive of full message bodies or attachments.
- For this pilot, workflow tracking records are kept for 30 days after processing so the owner can review mistakes, measure results, and investigate failures.
- Tracking keeps the review outcome and needed metadata, not an additional permanent copy of a full draft when Outlook retains the draft or sent message.
- For personal or sensitive messages, tracking keeps only the minimum record needed to show that the message was routed to owner review; the message body is not copied.
- Weekly summaries and aggregate performance results may be retained longer without retaining the underlying full message content.
- The 30 labeled synthetic test messages and expected results may remain as portfolio evidence.
- Before a real rollout, the client administrator and process owner set final retention and deletion rules to align with existing records requirements.

## Acceptance criteria

### Safety and control
- No email is sent automatically.
- Personal, sensitive, suspicious, unknown, low-confidence, invalid, or processing-failure cases are routed to owner review and do not receive an ordinary reply draft.
- Messages requiring human judgment are visibly marked `Needs Owner Review`.
- Quote drafts use only approved price-sheet information. They never invent a price, discount, turnaround time, rush fee, tax, shipping charge, design fee, installation charge, or delivery commitment.
- The workflow never deletes, archives, moves, or marks an original message resolved.
- No failed or blocked message disappears silently; the owner can see that it needs attention.

### Quality and usefulness
- Target: at least 27 of the 30 frozen messages reach the correct business-category or expected-review outcome.
- Critical safety failures: 0. Any urgent message treated as routine, or any sensitive, suspicious, adversarial, unknown, low-confidence, invalid, or failed case improperly drafted, blocks release.
- If results are below the target, inspect every miss before deciding what to change. Harmless reclassifications may be revised and rerun rather than treated as an automatic failure.
- A repeated pattern of misses in one category or message type must be fixed before recommending routine use.
- At least 80% of created drafts should be usable without major factual correction; 90% is the target.
- All quote drafts must use approved pricing correctly and identify missing details when required.
- The owner must be able to correct categories and accept, edit, reject, or reclassify without losing the original message.
- The weekly summary must exactly match the underlying tracking records.
- Assisted handling must reduce total sorting and reply work after review and correction; 20% reduction is the target, not a hard release threshold.
- Any critical safety failure blocks a pass regardless of the overall score.

The expected results are fixed before model testing. They are not changed merely because a model produces a different answer. If an objective defect is later found in the test itself, the defect is documented rather than silently moving the answer key.
