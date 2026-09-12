# AI_HANDOFF_PROTOCOL

Project: AI Skills Intensive — 12 Week

## Purpose
This repository is the shared source of truth when switching between ChatGPT and Claude.

## Keep it simple
Do not reorganize the repository just to support AI handoffs.

The repository already uses simple root-level files such as:
- `README.md`
- `week1-log.md`
- `week2-log.md`
- workflow JSON exports

Keep that structure.

Add only these handoff files at repository root:
- `CURRENT_STATE.md`
- `AI_HANDOFF_PROTOCOL.md`
- `SESSION_LOG_TEMPLATE.md`

## How Josh learns
State the purpose and expected result before giving any instruction - what he's about to do, what he should see happen, and why it matters.

He learns by doing, not reading. Textbook-style, text-heavy courses do not work for him. Prefer video, interactive exercises, and building in real tools over long reading.

He works from screenshots. Read what's actually on screen rather than assuming.

He pushes back when something doesn't track, and he's often right - take his description at face value rather than substituting a theory.

End each concept with a one-line KEY MESSAGE in bold so it doesn't get buried in a long response.

If he asks for something simpler or slower (e.g. "explain this like I'm in fifth grade"), keep that register for the rest of the session, not just the next reply.

## Start of every session
Read `CURRENT_STATE.md` first.

Then use:
1. the relevant course exercise for exact build instructions,
2. the course reading for concepts,
3. the 12-week Master Calendar for the larger plan,
4. the current and prior `weekN-log.md` files for history when needed.

## Start prompt
"Read CURRENT_STATE.md first. Then use the relevant course exercise as the authoritative build source and the master calendar as the larger strategy. Continue from the exact stopping point. Explain why before giving steps, spell out all values in full, and do not guess repeatedly when documentation is unclear."

## End of every substantial session
Help update:
- `CURRENT_STATE.md`
- the current `weekN-log.md`

The weekly log should capture:
- what I learned
- what I built
- problems encountered
- decisions made and why
- verification/evidence
- exact stopping point
- exact next step

Then walk through:
```powershell
git status
git add .
git commit -m "..."
git push
```
Then click Sync now on the GitHub card in this Claude Project.

## Roles

### GitHub
Canonical shared project record.

### ChatGPT Project
Persistent ChatGPT workspace with the core course and reference materials.

ChatGPT has direct GitHub connector access to `jdmaurer/ai-automation-lab`. At the start of a session, read the live `CURRENT_STATE.md` from GitHub rather than relying on a separately uploaded static copy.

### Claude Project
Persistent Claude workspace with the core course and reference materials.

The GitHub repository `jdmaurer/ai-automation-lab` is added to Claude Project Context/Knowledge. After repository changes are pushed to GitHub, use Claude's `Sync` function before continuing so Claude has the latest repository state.

Do not maintain a separate static copy of `CURRENT_STATE.md` in Claude when the GitHub project source is available. GitHub remains canonical.

### CURRENT_STATE.md
The baton between systems. Keep it short and current.

### weekN-log.md
The running historical record for that week.

## Core rule
When switching systems:

AI session → update `CURRENT_STATE.md` + weekly log → commit/push to GitHub → Sync now in Project.

Then:

- Moving to ChatGPT: tell ChatGPT to read the latest `CURRENT_STATE.md` from `jdmaurer/ai-automation-lab`.
- Moving to Claude: Sync the GitHub project source first, then tell Claude to read the latest `CURRENT_STATE.md`.

GitHub is the canonical shared state. `CURRENT_STATE.md` is the baton between systems.