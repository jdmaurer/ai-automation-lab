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

## Roles
### GitHub
Canonical shared project record.

### ChatGPT Project
Persistent ChatGPT workspace with the core reference materials.

### Claude Project
Persistent Claude workspace with the same core reference materials.

### CURRENT_STATE.md
The baton between systems. Keep it short and current.

### weekN-log.md
The running historical record for that week.

## Core rule
When switching systems:
AI session → update CURRENT_STATE + weekly log → commit/push → next AI reads CURRENT_STATE.
