# Eval Summary Drafter

An n8n workflow (planned) that drafts a one-page, client-facing evaluation summary from AI test results. It serves Josh's own consulting practice first and is a portfolio piece: automating a consultancy's own busywork.

## Status (2026-09-25)
Rules and worked example done. Workflow not yet built.

## Files
- `memo-guide.md` - the writing rules, with sources and evidence strength
- `memo-outline.md` - the seven-section template, tagged by who produces each part
- `memo-checklist.md` - review questions, each owned by code, the AI editor, or the consultant
- `research/` - the three deep research reports (ChatGPT, Perplexity, Gemini), the shared prompt, and the comparison
- Worked example: `../rivertown-lead-intake/eval-summary-v2.5.md`

## Planned pipeline
1. Code computes the approved facts from a standard test-results file.
2. The AI drafts the full memo, including a proposed recommendation.
3. A fresh AI call edits the draft against its checklist items and lists its changes.
4. Code checks numbers and word lists. One automatic fix attempt; remaining problems are flagged, and nothing stops.
5. The consultant reviews in a chat and approves.

Principle: code owns facts, the AI owns wording, the consultant owns judgment.
