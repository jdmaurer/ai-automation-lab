# Driftless Print and Sign - Inbox Triage

Status: working Power Automate checkpoint as of 2026-11-11; not release-ready.

Driftless Print and Sign is a fictional, owner-operated shop with a small team supporting design and production. The owner handles the business inbox alongside customer service and order coordination.

The solution is a human-supervised Microsoft 365 inbox-triage workflow. It normalizes Inbox messages, applies deterministic review rules, uses a structured AI classifier, validates the output, applies confidence/safety policy, assigns business categories, and may prepare a reply draft when policy allows. The owner reviews and sends any reply manually. No external send is automated.

The demonstration focuses on quote requests and time-sensitive order changes while testing a broader variety of incoming messages. Quote drafts are grounded in a small approved synthetic price sheet and must not invent custom pricing, fees, turnaround, delivery, discounts, or attachment content.

## Current evidence

On 2026-11-11 four representative live Outlook-trigger tests passed:
- standard yard-sign quote: correct Sales/Routine path and grounded $24-each draft;
- adversarial permanent-sign request: owner review, no draft, prompt injection blocked;
- urgent 3x6 banner: owner review plus safe $95 draft without timing promise;
- business cards with attachment: owner review plus safe $45 draft without claiming attachment inspection.

These are smoke tests, not the full evaluation. The frozen 30-message set still must be run through a repeatable evaluation harness.

A real Microsoft Power Automate notification also exposed an unresolved defect: automated/system mail can reach Inbox, be classified as ordinary General mail, and receive an unnecessary reply draft. The next revision must address automated/non-replyable mail generally rather than patching one sender.

## Current build boundaries

- Inbox only; Sent, Drafts, Deleted, Junk, and Archive are excluded.
- Visible exception marker: `Needs Owner Review`.
- Business categories: Sales, Support, Finance, General, Internal, Unknown.
- Priority: Urgent or Routine.
- Attachment contents are never interpreted.
- No auto-send, forward, delete, archive, move, payment, permission change, or autonomous commitment.
- Owner retains final control over custom pricing, payments, order changes, discounts, turnaround, installation, delivery, and sending.
- Provisional classifier confidence threshold: 0.80, to be evaluated against the frozen set rather than tuned by moving the answer key.

## Work still required before release

- preserve a clean recoverable solution/workflow export;
- general automated/non-replyable mail policy;
- duplicate protection;
- correlation ID and audit/review logging;
- feedback capture;
- full frozen 30-message evaluation;
- isolated model-failure and wrong-schema tests;
- weekly-summary exact-count verification;
- runbook/operator quick reference;
- governance/adoption handoff and Gate 2 evidence.

## Design files

- `charter.md` - process, data map, controls, retention, and acceptance criteria
- `approved-price-sheet.md` - frozen synthetic pricing used by quote tests
- `evaluation/frozen-test-set-v1.csv` - 30 frozen synthetic messages and answer key
- `test-cases.md` - scoring rules, coverage, and live test results
- `admin-questions.md` - short owner kickoff plus technical Microsoft 365 checklist
- `decisions.md` - append-only design decisions and reasoning
- `limitations.md` - current scope, unresolved controls, and implementation limits
