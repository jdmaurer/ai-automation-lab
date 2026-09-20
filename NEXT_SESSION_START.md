# Start of Session — Next Session

N8N103 is complete, including Sections 1–3 and the 20-question final exam.
N8N102 is also complete. N8N101 remains diagnostic-only; do not chase the
Foundations badge just for the credential.

The next curriculum item is the Master Calendar's **Week 6 — Microsoft access,
Power Automate, Dataverse or SharePoint Lists, and cross-platform translation**.

---

## Before opening Claude

1. In the Claude Project, **Sync the GitHub project source**.
2. Start the chat with:

> Read the latest CURRENT_STATE.md first, then the active case folder under
> cases/rivertown-lead-intake/. Continue from the exact next step. State purpose
> and expected result before instructions, teach one meaningful step at a time,
> and use case-study mode when I am recombining tools I already know.

Because the 2026-09-19 closeout was written directly to GitHub, the local clone
will be behind until it is pulled. Before local repo work:

```powershell
cd "$HOME\ai-automation-lab"
git pull --ff-only
git status
```

Expect a clean working tree after the pull.

## First work item

Begin the Week 6 Microsoft-access gate. The calendar's day labels are reference
only; track completion.

**Purpose:** establish the Microsoft development environment before building
Power Automate/Copilot work, without buying unnecessary licensing.

**Expected result:** a documented decision showing what free environment is
available, what is blocked, what expires when, and what fallback architecture
will be used.

Start with:
1. Review the Power Apps Developer Plan, Power Platform trial rules, and Copilot
   Studio trial limitations.
2. Inventory tenant, identity, admin, license, connector, and data-residency
   dependencies.
3. Attempt a separate development/trial environment using a work or school
   account.
4. Do not use the university production tenant for experiments and do not use
   real data.
5. Create `microsoft-environment-decision.md` with environment obtained,
   blockers, trial/cancellation/expiry dates, and fallback architecture.
6. If blocked, document the blocker. Do not buy enterprise capacity impulsively.

## Build discipline carried forward from N8N103

For each serious build, briefly check:
- clarity
- modularity only when the logic has earned a separate boundary
- readability
- maintainability
- scalability
- production readiness: publishing, monitoring, failure handling, disable, and
  recovery

Documentation should explain **why**, assumptions, constraints, and change
context—not merely restate what a node does.

When debugging, follow evidence:
**failing node → exact error → input → trace earlier data/configuration → rerun**.

If a proposed course fix suddenly requires advanced syntax the course never
taught, first ask whether the intended repair is simpler and structural.

## State to preserve

- N8N102 complete; certificate earned.
- N8N103 complete.
- Rivertown Lead Intake v1 remains unpublished after successful live verification.
- No new Rivertown workflow change was made during N8N103.
- n8n Cloud trial showed 3 days remaining at the end of 9/19; a self-host vs paid
  decision is still open before expiry.
- Rotate the Rivertown Header Auth secret before any real client/production use.
