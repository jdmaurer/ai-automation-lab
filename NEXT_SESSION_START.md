# Claude takeover — November19,2026

ChatGPT session closed out; next activity is Claude's **read-only independent second opinion**, not another build/test step.

1. Open the existing AI-skills project in Claude and sync its GitHub source. Prefer live repository access. Ensure the authoritative Master Calendar is available in Project Knowledge.
2. Paste the prompt below. Claude should first assess what truly remains and recommend one bounded next action.
3. No local Git operation or browser reopening is required for this review. If local repository work is later needed, fast-forward `$HOME\ai-automation-lab` first.

## Copy-ready prompt

Continue my Week 8 Driftless Inbox Triage project in jdmaurer/ai-automation-lab. I want an independent second opinion and the smallest defensible path to finish. The project has substantially overrun its time and usage budget. Freeze scope; do not rebuild, add features or start another tuning cycle.

READ FIRST
Read the LIVE CURRENT_STATE.md from GitHub, then cases/driftless-inbox-triage/README.md, runbook.md, limitations.md, and the relevant linked evidence. Read AI_HANDOFF_PROTOCOL.md. Use the latest November 19, 2026 checkpoint; older next-step instructions are historical. Read the authoritative “AI Implementation Consultant - 12-Week Master Calendar” from Project Knowledge for Week 8 and Gate 2. Do not rely on a stale GitHub sync. If a source is unavailable, identify it instead of guessing.

YOUR FIRST TASK
Audit ChatGPT's closeout recommendation against the original requirements and actual saved evidence. Do not assume its “essential documentation complete” statement means acceptance or Gate 2 passed. Distinguish:
1. Original Week 8 learning/deliverable requirements.
2. Prototype acceptance criteria and missing evidence.
3. Real-client/production requirements that can remain outside this synthetic prototype.
Recommend the smallest remaining work, what can stay a documented limitation, and one next action. Explain any disagreement with ChatGPT. Do not change files/flows or run tests during this initial review.

CURRENT STATE TO VERIFY
- Main triage, frozen30 evaluator and weekly report are Published. Main includes the November17 FI-02 structure-validation/recovery repair. Preserve working inputs/connections.
- LOG-02 and WS-01/WS-02 passed bounded normal cases. REVIEW-01 remains an automatic-logging failure with assisted recovery.
- Frozen v1 remains FAIL, primary25/30. Frozen policy-v2 remains FAIL, primary27/30, due to DRI-12 missed urgency. All failed runs, outputs, keys, scores and blank owner forms must remain unchanged.
- Current policy v3: every recognized actual/proposed/conditional/question-form change to an existing order requires Urgent + manager review regardless of timing. Main/helper overrides Published and inputs verified. Targeted E:4/5 exact,3/3 tested order changes; no formal v3 full-set acceptance. Never splice targeted passes into an old full-set score.
- Accepted noncritical limitation: contact-only updates can be misclassified Support/change true and unnecessarily Urgent, potentially with the existing eligible fixed Support acknowledgment. Josh accepted this; do not reopen it.
- FI-01 scoped PASS; original FI-02 FAIL preserved, separate repair scoped PASS and Published in main; FI-03 scoped PASS; FI-04 scoped PASS. Do not repeat any completed check.
- FI-04's Failed cloud status is EXPECTED: IncompleteWeeklyLogRetrieval deliberately stops the report; counting, AI and report draft all Skipped. Run08584064815087764006108930441CU17. The earlier fixture-publication rejection remains separately preserved.
- Two manual-only Published fault copies remain with faults installed. They are NOT normal production/report flows. IDs and safety boundaries are in the runbook.
- November17 baseline ZIP/hashes preserved; ZIP predates the later FI-02 main repair. Action snapshots document that delta; no exact current-version full export or restore proof. Do not revisit the settled export-dependency warning.
- Operator/admin handoff is documented. Owner quality/weekly-wording judgments, some normal integration/weekly coverage, effort/cost/adoption/market evidence and formal Gate 2 assessment remain unresolved. Overall release NOT_ESTABLISHED.

CONSTRAINTS
No new tests, full30 rerun, prompt edits, publication, imports, exports, sends, deletion, connection changes or new features without a separately agreed bounded task. Preserve published originals, every failed result and the accepted limitation. Do not invent owner ratings, Gate scores, buyer conversations or time savings. A failed historical run stays failed after a later repair.

The existing v2 scoring contract requests30 behavior/safety judgments,14 reply-quality ratings and7 Sales checks within those drafts. Assess whether completing that contract is needed for the chosen closeout; do not automatically launch30 individual email walkthroughs or silently relax its rules.

Work economically. Explain purpose and expected result before actions, keep instructions short, and stop if browser control is unreliable. If later authorized to update the repository, commit the baton and weekly log directly and verify the save. First respond with the independent assessment and minimum closeout recommendation only.
