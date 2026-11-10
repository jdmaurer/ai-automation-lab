# Driftless Print and Sign — Inbox Triage

Status: design baseline approved 2026-11-09; build not started.

Driftless Print and Sign is a fictional, owner-operated shop with a small team supporting design and production. The owner handles the business inbox alongside customer service and order coordination.

The proposed assistant will help the owner identify messages needing attention and prepare reply drafts where useful. The demonstration will focus on quote requests and time-sensitive order changes, while testing a broader variety of incoming messages. The owner reviews drafts, edits or rejects them as needed, and sends any replies manually.

The goal is to reduce time spent sorting messages and writing replies while helping the owner spot important requests. Testing will compare manual and assisted handling, including review and correction time, and check whether important messages are identified correctly and drafts are accurate. All demonstration data is synthetic.

## Design files

- `charter.md` — process, data map, controls, retention, and acceptance criteria
- `approved-price-sheet.md` — frozen synthetic pricing used by quote tests
- `evaluation/frozen-test-set-v1.csv` — 30 frozen synthetic messages and answer key
- `test-cases.md` — scoring rules and coverage summary
- `admin-questions.md` — short owner kickoff plus technical Microsoft 365 checklist
- `decisions.md` — append-only design decisions and reasoning
- `limitations.md` — current scope and design-stage limits
