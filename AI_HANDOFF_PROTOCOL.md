# AI_HANDOFF_PROTOCOL

Project: AI Skills Intensive — 12 Week

## Purpose
This repository is the shared source of truth when switching between ChatGPT
and Claude.

## Keep it simple
Do not reorganize the repository just to support AI handoffs.

## Repository map

Root-level files — the handoff and reference layer:

| File | What it is | When it changes |
|---|---|---|
| `CURRENT_STATE.md` | The baton. Where to resume. | Every session — overwritten |
| `weekN-log.md` | Running historical record, personal voice | Every session — appended |
| `n8n-patterns.md` | Tool reference: n8n gotchas and course defects | When a new gotcha is found |
| `AI_HANDOFF_PROTOCOL.md` | This file | Rarely |
| `SESSION_LOG_TEMPLATE.md` | Template for weekly log entries | Rarely |
| `README.md` | Repo overview | Occasionally |
| Workflow JSON exports | Early one-off exports | Superseded by `cases/` |

Portfolio case studies live in `cases/<case-name>/` — added 2026-09-16.
The master calendar's Week 1 repo structure already specifies `/cases`, so
this is not a reorganization.

Each case folder holds:

| File | What it is |
|---|---|
| `README.md` | The case study: problem, build, data contract, what it proves |
| `decisions.md` | Append-only. Every design choice with reasoning. |
| `limitations.md` | What it does not do, and why |
| `test-cases.md` | Test set with a results table |
| `runbook.md` | Operation, disable path, failure modes |
| `<name>-vN.json` | Workflow export |
| seed data | Fixed baseline for resetting test state |

Active case: `cases/rivertown-lead-intake/`

## How Josh learns
State the purpose and expected result before giving any instruction — what
he's about to do, what he should see happen, and why it matters.

He learns by doing, not reading. Textbook-style, text-heavy courses do not
work for him. Prefer video, interactive exercises, and building in real tools
over long reading.

Deliver teaching in pieces alongside the clicking, not stacked up in front of
it. A page of reading before any doing is the failure mode — it has happened
more than once and he has had to call it out.

Give one instruction at a time by default. Group routine same-screen steps when
there is no decision point between them; do not artificially split repetitive
field entry into separate turns.

When a course section includes knowledge-check or quiz questions alongside a
hands-on project, map the questions to the build before starting. Ask each
relevant question naturally when Josh reaches that concept in the tool. Do not
save the questions and turn them into a separate post-project quiz.

During quiz/knowledge-check work, do not reveal the answer or give hints until
Josh asks. After he gives an answer, say plainly whether it is correct first;
then add nuance without making a correct answer sound wrong.

For paste-ready n8n fields, keep field labels and field values in separate copy
blocks. Never put a label and the value intended for a different UI field into
the same copy block.

Always supply the pin data JSON with any test instruction. Do not make him
switch between documents to find it.

He works from screenshots. Read what's actually on screen rather than
assuming.

He pushes back when something doesn't track, and he's often right — take his
description at face value rather than substituting a theory. He has caught
real errors, including instructions that would have destroyed work.

End each concept with a one-line KEY MESSAGE in bold.

If he asks for something simpler or slower, keep that register for the rest
of the session, not just the next reply.


### Debugging and architecture discipline

When debugging, teach the **diagnostic path before the fix**. Start with the
failing node, read the exact error, inspect the Input panel, and trace earlier
in the workflow until the data or configuration changes. Fix one issue, rerun,
and let the next result narrow the search. Do not jump straight to a clever
replacement expression or redesign.

If Josh says a proposed fix seems far beyond what the course has taught, treat
that as a diagnostic signal. Re-check whether the intended solution is a simpler
structural repair that matches the stated learning objective before introducing
advanced syntax.

For serious builds, do a quick architecture checkpoint rather than adding a
separate study block:
- clarity — intent is visible
- modularity — split only when reuse, complexity, or execution behavior earns it
- readability — meaningful names and clean flow
- maintainability — repeated logic is centralized and changes are safe
- scalability — data volume and execution behavior will not make the design brittle
- production readiness — deliberate publishing, monitoring, failure handling,
  disable/rollback, and recovery

Documentation should explain **why**, assumptions, constraints, and change
context. Do not spend notes merely restating obvious node configuration.

During active-recall study or quiz practice, do not put the KEY MESSAGE before
Josh answers; it can reveal the answer. Give the key message after the answer
has been committed or discussed.

## Start of every session
Read `CURRENT_STATE.md` first. Then the active case folder.

Then use:
1. the relevant course exercise for exact build instructions,
2. the course reading for concepts,
3. the 12-week Master Calendar for the larger plan,
4. `n8n-patterns.md` when something breaks in a familiar-looking way,
5. the current and prior `weekN-log.md` files for history when needed.

## Start prompt
"Read CURRENT_STATE.md first, then the active case folder under cases/.
Continue from the exact next step. Explain why before giving steps, one step
at a time, spell out all values in full, and give me the pin data JSON with
any test instruction."

## End of every substantial session

Work through this list. Not every item applies every night — but check each
one rather than assuming.

**Direct GitHub closeout:** when the assistant has authenticated GitHub write
access, it should update and commit the handoff files directly instead of making
Josh manually copy/paste edits and run a long closeout sequence. If GitHub is
updated remotely, note that the local clone will need a fast-forward pull before
local repo work continues.

**1. Always:**
- Update `CURRENT_STATE.md` — objective, current build, exact stopping point,
  exact next step, open items
- Update the current `weekN-log.md` — what was learned, what was built,
  problems, decisions, evidence, stopping point, next step

**2. If any design decision was made:**
- Append to the active case's `decisions.md`, with the reasoning attached.
  Dated section, newest at the bottom. This is the file that saves
  reconstructing "why did we do it that way" weeks later.

**3. If a new n8n gotcha or course defect was found:**
- Append to `n8n-patterns.md`

**4. If the build changed:**
- Export the workflow JSON into the case folder
- Update `limitations.md` if a new constraint surfaced
- Update `test-cases.md` if cases were added or results recorded

**5. Then commit:**
```powershell
cd "$HOME\ai-automation-lab"
git status
git add .
git commit -m "..."
git push
```

**6. Then Sync** the GitHub source in the Claude Project. Without this, the
next chat reads stale files.

## A note on session logs
On long build sessions the assistant may keep a live session-log markdown file
so a context-limit handoff is always ready. That file is **working
scaffolding, not a deliverable**. Harvest it into the files above at close —
decisions to `decisions.md`, narrative to the weekly log, patterns to
`n8n-patterns.md`, state to `CURRENT_STATE.md` — then discard it. Do not
commit it; four files saying the same thing means no clear answer to which one
to update.

## Roles

### GitHub
Canonical shared project record.

### ChatGPT Project
Persistent ChatGPT workspace with the core course and reference materials.
Has direct GitHub connector access to `jdmaurer/ai-automation-lab`. At the
start of a session, read the live `CURRENT_STATE.md` from GitHub rather than
relying on a separately uploaded static copy.

### Claude Project
Persistent Claude workspace with the core course and reference materials.
The GitHub repository is added to Claude Project Knowledge. After repository
changes are pushed, use Claude's `Sync` function before continuing.

Do not maintain a separate static copy of `CURRENT_STATE.md` in Claude when
the GitHub project source is available. GitHub remains canonical.

## Core rule
When switching systems:

AI session → update `CURRENT_STATE.md` + weekly log + any case files →
commit/push to GitHub → Sync now in Project.

Then:
- Moving to ChatGPT: tell it to read the latest `CURRENT_STATE.md` from
  `jdmaurer/ai-automation-lab`.
- Moving to Claude: Sync the GitHub project source first, then tell Claude to
  read the latest `CURRENT_STATE.md`.

  Testing Google Drive sync.
  Again.

GitHub is the canonical shared state. `CURRENT_STATE.md` is the baton.
